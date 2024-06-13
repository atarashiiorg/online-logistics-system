const Manifest = require("../models/manifest");
const { isDocketValid, isDocketBooked } = require("./shipperControllers");
const {
  getManifestName,
  getFormttedDate,
  readEjs,
  createPdfFromHtml,
  getDataForManifestPdf,
} = require("../services/helpers");
const {
  getPopulatedManifest,
  updateTrackingManifest,
} = require("../services/dbServices");
const { default: mongoose, startSession } = require("mongoose");
const { PassThrough } = require("stream");
const Branch = require("../models/branch");
const Tracking = require("../models/tracking");
const { Session } = require("inspector");
const { fetchManifestReport } = require("../services/reportService");

async function createManifest(req, res) {
  const transaction = await startSession();
  try {
    if (req.body.toBCode == "") {
      res.status(203).json({ msg: "ToBCode is not provided" });
      return;
    }
    // route
    if (req.body.vendor == "") {
      res.status(203).json({ msg: "vendor is not provided" });
      return;
    }

    //route
    if (req.body.dockets.length <= 0) {
      res.status(203).json({ msg: "docket list is not provided" });
      return;
    }

    const dockets = req.body.dockets.map((d) => d.docketNumber);
    const check_res = await checkDockets(dockets);

    if (!check_res.passed) {
      res.status(404).json({ msg: check_res.msg });
      return;
    }
    const fromBranch = await Branch.findById(req.body.fromBCode);
    const toBranch = await Branch.findById(req.body.toBCode);
    const manifestNumber = getManifestName();

    await transaction.startTransaction(); //start transaction

    const manifest = await Manifest.create({
      ...req.body,
      manifestNumber,
      createdBy: req.token._id,
      manifestDate: new Date(req.body.manifestDate),
    });
    if (manifest) {
      await updateTrackingManifest(
        dockets,
        "docketNumber",
        {
          action: `Packet manifested from ${fromBranch.branchName.toUpperCase()} to ${toBranch.branchName.toUpperCase()} in Manifest No. ${manifestNumber}`,
          actionDate: new Date(),
          actionBy: req.token._id,
        },
        { currentManifest: manifest._id },
        transaction
      );
      await updateTrackingManifest(
        dockets,
        "docketNumber",
        {
          action: `Packet Dispatched to ${toBranch.branchName.toUpperCase()}`,
          actionDate: new Date(),
          actionBy: req.token._id,
        },
        { currentManifest: manifest._id },
        transaction,
        { fromBranch: fromBranch.branchName, toBranch: toBranch.branchName }
      );
      for (let i = 0; i < dockets.length; i++) {
        const tracking = await Tracking.findOne({ docketNumber: dockets[i] });
        if (tracking.status == "booked") {
          tracking.status = "in-transit";
          await tracking.save({ session: transaction });
        } else {
          continue;
        }
      }
      await transaction.commitTransaction(); //commit transaction
      res.status(201).json({ msg: "success" });
    } else {
      res.status(304).json({ msg: "something went wrong" });
    }
  } catch (err) {
    console.log(err);
    await transaction.abortTransaction(); //abort transaction
    if (err.code == "EENVELOPE") {
      res
        .status(403)
        .json({ msg: "Client/Consignor/Consignee Email missing." });
      return;
    }
    res.status(500).json({ err: err.toString() });
  } finally {
    transaction.endSession(); //end transaction session
  }
}

async function getManifests(req, res) {
  //mid based
  const mid = req.query.mid;
  const manifestNumber = req.query.manifestNumber;

  const branch = req.query.bid;
  const fromBranch = req.query.fBCode;
  const fromDate = req.query.fromDate;
  const toDate = req.query.toDate;
  const toBranch = req.query.toBCode;

  try {
    if(branch){
      const manifests = await getPopulatedManifest({toBCode:branch},false,true)
      res.status(200).json({msg:"success",data:manifests})
      return
    }
  } catch (error) {
    res.status(500).json({err:error.toString()})
    return
  }

  try {
    if (mid) {
      const data = await getDataForManifestPdf(mid);
      const pdfBuffer = await createPdfFromHtml("manifest", data);
      const pdfStream = new PassThrough();
      pdfStream.end(pdfBuffer);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.length,
        "Content-Disposition": `attachment; filename="${data.manifestNumber}.pdf"`,
      });
      pdfStream.pipe(res);
      return;
    }
  } catch (error) {
    console.log("Error occured while generating manifest pdf " +new Date().toLocaleDateString() +" ->",error);
    res.status(500).json({ err: "Internal error occured while generating pdf" });
    return;
  }

  try {
    const pipeline = [];
    const matchStage = {};
    if (fromBranch) {
      matchStage.fromBCode = new mongoose.Types.ObjectId(fromBranch);
    }
    if (toBranch) {
      matchStage.toBCode = new mongoose.Types.ObjectId(toBranch);
    }
    if (fromDate && toDate) {
      matchStage.manifestDate = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }
    if(manifestNumber){
      matchStage.manifestNumber = manifestNumber
    }
    pipeline.push({ $match: matchStage });
    pipeline.push({
      $lookup: {
        from: "branches",
        localField: "fromBCode",
        foreignField: "_id",
        as: "fromBCode",
      },
    });
    pipeline.push({ $unwind: "$fromBCode" });
    pipeline.push({
      $lookup: {
        from: "branches",
        localField: "toBCode",
        foreignField: "_id",
        as: "toBCode",
      },
    });
    pipeline.push({ $unwind: "$toBCode" });
    const select = {
      dockets: 1,
      "fromBCode.branchCode": 1,
      "fromBCode.branchName": 1,
      "toBCode.branchCode": 1,
      "toBCode.branchName": 1,
      manifestDate: 1,
      manifestNumber: 1,
      isReceived: 1,
    };
    pipeline.push({ $project: select });
    const manifests = await Manifest.aggregate(pipeline);
    res.status(200).json({ msg: "success", data: manifests });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
    return;
  }
}

async function checkDockets(dockets) {
  try {
    for (let i = 0; i < dockets.length; i++) {
      if (!(await isDocketValid(dockets[i])).valid) {
        return {
          passed: false,
          msg: "This is not a valid docket number or may not be issued to any branch",
        };
      }
      if (!(await isDocketBooked(dockets[i])).booked) {
        return { passed: false, msg: dockets[i] + " is not been booked yet" };
      }
    }
    return { passed: true, msg: "" };
  } catch (error) {
    return { passed: false, msg: "error while checking dockets" };
  }
}

async function receiveManifest(req, res) {
  const transaction = await startSession();
  try {
    if (req.body == null || req.body.length <= 0) {
      res.status(403).json({ msg: "docket list is not provided to receive" });
      return;
    }
    const docketsToRecive = [...req.body];
    const branch = await Branch.findById(req.query.bid);

    await transaction.startTransaction(); //start transaction

    for (let i = 0; i < docketsToRecive.length; i++) {
      const manifest = await Manifest.findOneAndUpdate(
        {
          "dockets.booking": docketsToRecive[i].docket,
          toBCode: req.query.bid,
        },
        {
          $set: {
            "dockets.$[elem].isReceived": true,
            "dockets.$[elem].rcDate": docketsToRecive[i].rcDate,
            "dockets.$[elem].message": docketsToRecive[i].message,
          },
        },
        {
          session: transaction,
          new: true,
          arrayFilters: [
            {
              "elem.booking": docketsToRecive[i].docket,
              "elem.isReceived": false,
            },
          ],
        }
      );

      await updateTrackingManifest(
        [docketsToRecive[i].docket],
        "_id",
        {
          action: `Packet Received at ${branch.branchName.toUpperCase()}`,
          actionDate: new Date(),
          actionBy: req.token._id,
        },
        { currentManifest: manifest._id },
        transaction
      );
    }

    await transaction.commitTransaction(); //commit transaction
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
    await transaction.abortTransaction(); //abort transaction
  } finally {
    transaction.endSession();
  }
}

const getReports = async (req, res) => {
  const reports = await fetchManifestReport(req.query);
  res.status(200).json({ msg: "success", data: reports });
};

module.exports = {
  createManifest,
  getManifests,
  receiveManifest,
  getReports,
};
