const { isDocketBooked, isDocketValid } = require("./shipperControllers");
const {
  initiateTracking,
  findManifestWithBooking,
  getPopulatedBooking,
} = require("../services/dbServices");
const Branch = require("../models/branch");
const Client = require("../models/client");
const Invoice = require("../models/invoice");
const Shipment = require("../models/shipment");
const ConsignorConsignee = require("../models/consignorConsignee");
const Booking = require("../models/booking");
const Tracking = require("../models/tracking");
const Runsheet = require("../models/runsheet");
const { default: mongoose, startSession } = require("mongoose");
const sendMail = require("../services/mailSmsServices");
const getTemplate = require("../utils/emailTemplate");
const { getBookingReportFormat } = require("../services/helpers");

async function createBooking(req, res) {
  const transaction = await startSession();
  try {
    const isValid = await isDocketValid(req.body.awbDetails.docketNumber);

    if (!isValid.valid) {
      res.status(403).json({ msg: isValid.msg });
      return;
    }

    if (isValid.branch._id != req.body.branch) {
      res.status(403).json({
        msg: "this shipper is not issued to this branch try changing branch",
      });
      return;
    }

    const isBooked = await isDocketBooked(req.body.awbDetails.docketNumber);
    if (isBooked.booked) {
      res.status(409).json({ msg: isBooked.msg });
      return;
    }

    const invoice = new Invoice(req.body.billingDetails);
    const shipment = new Shipment({
      ...req.body.awbDetails,
      ...req.body.dimWeight,
      ...req.body.volWeight,
    });

    const consignorConsignee = new ConsignorConsignee(
      req.body.consignorConsignee
    );

    const tracking = await initiateTracking(
      req.body.awbDetails.docketNumber,
      isValid.branch.branchName,
      req.body.awbDetails.bookingDate,
      req.token._id
    );
    const booking = new Booking({
      ...req.body.awbDetails,
      branch: req.body.branch,
      invoice: invoice._id,
      shipment: shipment._id,
      consignorConsignee: consignorConsignee._id,
      client: req.body.client,
      tracking: tracking._id,
      createdBy: req.token._id,
    });

    await transaction.startTransaction(); //starting transaction

    await invoice.save({ session: transaction });
    await shipment.save({ session: transaction });
    await consignorConsignee.save({ session: transaction });
    await tracking.save({ session: transaction });
    await booking.save({ session: transaction });

    const client = await Client.findOne({ _id: req.body.client });
    const emailList = [
      ...client.autoEmails,
      client.email,
      consignorConsignee.consigneeEmail,
      consignorConsignee.consignorEmail,
    ];
    const mailSubject = `Parcel Booking Confirmation: Docket Number - ${req.body.awbDetails.docketNumber}`;
    const templatter = getTemplate("booking");
    const html = await templatter(req.body.awbDetails.docketNumber);
    const result = await sendMail(emailList, mailSubject, html);
    await transaction.commitTransaction(); //commiting transaction
    res.status(201).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    await transaction.abortTransaction(); //aborting transaction
    if (err.code == "EENVELOPE") {
      res
        .status(403)
        .json({ msg: "Client/Consignor/Consignee Email not provided." });
      return;
    }
    if (err.code == 11000) {
      res.status(409).json({ msg: "this docket number already booked" });
      return;
    }
    res.status(500).json({ err: err });
    console.log(err);
  } finally {
    transaction.endSession(); //ending transaction session
  }
}

async function getBooking(req, res) {
  //this function is used to get data for manifest
  try {
    if (!req.query.docket) {
      const bookings = await Booking.find()
        .populate("shipment")
        .populate("consignorConsignee");
      res.status(200).json({ msg: "success", data: bookings });
    } else {
      const isValid = await isDocketValid(req.query.docket);
      if (!isValid.valid) {
        res.status(403).json({ msg: isValid.msg });
        return;
      }

      const data = await findManifestWithBooking({
        docketNumber: req.query.docket,
      });
      // console.log(data)
      if (!data) {
        res.status(403).json({ msg: "Docket not booked yet" });
        return;
      }
      // console.log(data.manifest);
      if (!data?.manifest) {
        if (!data?.booking?.branch.equals(req.query.branch)) {
          res.status(403).json({ msg: "Docket not booked by this branch" });
          return;
        }
        console.log("if not manifest", data?.booking?.tracking?.status);
        if (
          data?.booking?.tracking?.status == "in-transit" ||
          data?.booking?.tracking?.status == "booked" ||
          data?.booking?.tracking?.status == "misrouted" ||
          data?.booking?.tracking?.status == "return to origin" ||
          data?.booking?.tracking?.status == "undelivered"
        ) {
          //continue
          console.log(
            "intransit / booked / misrouted / return to origin / undelivered"
          );
        } else {
          res.status(403).json({
            msg:
              "can not create manifest or runsheet. current status of packet is " +
              data?.booking?.tracking?.status,
          });
          return;
        }
      } else {
        if (
          new mongoose.Types.ObjectId(data.manifest.toBCode).equals(
            req.query.branch
          )
        ) {
          const docket = data.manifest.dockets.filter(
            (d) => d.booking?.docketNumber == req.query.docket
          )[0];
          console.log("manifest-found->");
          if (!docket.isReceived) {
            res.status(403).json({
              msg: "docket manifested to current branch but not received yet",
            });
            return;
          }
          if (
            data?.booking?.tracking?.status == "in-transit" ||
            data?.booking?.tracking?.status == "booked" ||
            data?.booking?.tracking?.status == "misrouted" ||
            data?.booking?.tracking?.status == "return to origin" ||
            data?.booking?.tracking?.status == "undelivered"
          ) {
            //continue
            console.log(
              "intransit / booked / misrouted / return to origin / undelivered"
            );
          } else {
            res.status(403).json({
              msg:
                "can not create manifest or runsheet. current status of packet is " +
                data?.booking?.tracking?.status,
            });
            return;
          }
        } else {
          res
            .status(403)
            .json({ msg: "docket not manifested to current branch" });
          return;
        }
      }
      const obj = {
        _id: data.booking?._id,
        docketNumber: data.booking?.docketNumber,
        date: data.booking?.bookingDate,
        origin: data.booking?.shipment?.origin?.destName,
        client: data.booking?.invoice?.clientName,
        destination: data.booking?.shipment?.destination?.destName,
        consignee: data.booking?.consignorConsignee?.consignee,
        consignor: data.booking?.consignorConsignee?.consignor,
        pieces: data.booking?.shipment?.totalBoxes,
        weight: data.booking?.shipment?.totalChargeWeight,
        toPay: data.booking?.invoice?.amountToPay,
        cod: data.booking?.invoice?.codAmount,
        itemContent: data.booking?.invoice?.itemContent,
      };
      res.status(200).json({ msg: "success", data: obj });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
}

async function getBookingForDRSStatusUpdate(req, res) {
  try {
    const docket = req.query.docket;
    const valid = await isDocketValid(docket);
    console.log(valid);
    if (!valid.valid) {
      res.status(403).json({ msg: "Invalid Docket Number" });
      return;
    }
    const isBooked = await isDocketBooked(docket);
    if (!isBooked.booked) {
      res.status(403).json({ msg: "Docket is not booked yet" });
      return;
    }
    const booking = await getPopulatedBooking({ docketNumber: docket }, true);
    await booking.populate("branch");
    const runsheet = await Runsheet.findOne({
      "dockets.booking": booking._id,
    }).exec();
    const data = {
      docketNumber: booking.docketNumber || "",
      bookingBranch:
        booking.branch.branchName + ` [${booking.branch.branchCode}]` || "",
      bookingDate: booking.bookingDate || "",
      consignor: booking.consignorConsignee.consignor || "",
      consignee: booking.consignorConsignee.consignee || "",
      origin: booking.shipment.origin.destName || "",
      destination: booking.shipment.destination.destName || "",
      clientName: booking.invoice.clientName || "",
      content: booking.invoice.itemContent || "",
      podImage: booking.tracking?.podImage?.Location || "",
      mode: booking.shipment.mode || "",
      invoiceValue: booking.invoice.invoiceValue || "",
      pcs: booking.shipment.totalBoxes || "",
      weight: booking.shipment.totalChargeWeight || "",
      bookingType: booking.invoice.bookingType || "",
      runsheetNumber: runsheet?.runsheetNumber || "",
      status: booking.tracking.status || "",
      statusRemarks: booking.tracking.statusRemarks || "",
      rcType: booking.tracking.receiverType || "",
      rcName: booking.tracking.receiver || "",
      rcDate: booking.tracking.receivingDate || "",
      podReceivingDate: booking.tracking.podReceivingDate || "",
      podRemarks: booking.tracking.podRemarks || "",
    };
    console.log(data);
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal error" });
  }
}

async function getBookingReport(req, res) {
  const {
    dateFrom,
    dateTo,
    branch,
    client,
    org,
    dest,
    mode,
    content,
    billingType,
  } = req.query;

  const matchStage = {};

  if (dateFrom && dateTo) {
    matchStage.bookingDate = {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    };
  }

  if (branch) {
    matchStage.branch = new mongoose.Types.ObjectId(branch);
  }
  if (client) {
    matchStage.client = new mongoose.Types.ObjectId(client);
  }

  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branch",
      },
    },
    { $unwind: "$branch" },
    {
      $lookup: {
        from: "consignorconsignees",
        localField: "consignorConsignee",
        foreignField: "_id",
        as: "consignorConsignee",
      },
    },
    { $unwind: "$consignorConsignee" },
    {
      $lookup: {
        from: "trackings",
        localField: "tracking",
        foreignField: "_id",
        as: "tracking",
      },
    },
    { $unwind: "$tracking" },
    {
      $lookup: {
        from: "shipments",
        localField: "shipment",
        foreignField: "_id",
        as: "shipment",
      },
    },
    { $unwind: "$shipment" },
    {
      $lookup: {
        from: "destinations",
        localField: "shipment.origin",
        foreignField: "_id",
        as: "shipment.origin",
      },
    },
    { $unwind: "$shipment.origin" },
    {
      $lookup: {
        from: "destinations", // Assuming 'locations' is the collection for origins and destinations
        localField: "shipment.destination",
        foreignField: "_id",
        as: "shipment.destination",
      },
    },
    { $unwind: "$shipment.destination" },
    {
      $lookup: {
        from: "branches",
        localField: "shipment.destination.destBranch",
        foreignField: "_id",
        as: "shipment.destinationBranch",
      },
    },
    { $unwind: "$shipment.destinationBranch" },
    {
      $lookup: {
        from: "invoices",
        localField: "invoice",
        foreignField: "_id",
        as: "invoice",
      },
    },
    { $unwind: "$invoice" },
    // {
    //   $lookup: {
    //     from: "pods",
    //     localField: "tracking.podImage",
    //     foreignField: "_id",
    //     as: "tracking.podImage",
    //   },
    // },
    // { $unwind: "$tracking.podImage" },
  ];

  if (org || dest || mode) {
    const matchShipmentStage = {};
    if (org) {
      matchShipmentStage["shipment.origin._id"] = new mongoose.Types.ObjectId(
        org
      );
    }
    if (dest) {
      matchShipmentStage["shipment.destination._id"] =
        new mongoose.Types.ObjectId(dest);
    }
    if (mode) {
      matchShipmentStage["shipment.mode"] = mode;
    }
    pipeline.push({ $match: matchShipmentStage });
  }

  if (content || billingType) {
    const matchInvoiceStage = {};
    if (content) {
      matchInvoiceStage["invoice.itemContent"] = content;
    }
    if (billingType) {
      matchInvoiceStage["invoice.bookingType"] = billingType;
    }
    pipeline.push({ $match: matchInvoiceStage });
  }
  pipeline.push({
    $project: {
      _id: 1,
      docketNumber: 1,
      bookingDate: 1,
      "branch.branchName": 1,
      "invoice.invoiceNumber": 1,
      "invoice.invoiceValue": 1,
      "invoice.clientName": 1,
      "consignorConsignee.consignor": 1,
      "consignorConsignee.consignee": 1,
      "shipment.origin.destName": 1,
      "shipment.destination.destName": 1,
      "shipment.destinationBranch.branchName": 1,
      "shipment.totalBoxes": 1,
      "shipment.totalActualWeight": 1,
      "shipment.totalChargeWeight": 1,
      "tracking.status": 1,
      "invoice.bookingType": 1,
      "invoice.amountToPay": 1,
      "invoice.codType": 1,
      "invoice.codAmount": 1,
      "invoice.odaCharges": 1,
      "tracking.statusRemarks": 1,
      "tracking.receiver": 1,
      "tracking.receiverType": 1,
      "tracking.receivingDate": 1,
      "tracking.podImage.Location": 1,
    },
  });
  try {
    const reports = await Booking.aggregate(pipeline);
    const bookingReports = await getBookingReportFormat(reports);
    res.status(200).json({ msg: "success", data: bookingReports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteBooking(req, res) {
  const docketNumber = req.query.docket;

  try {
    const booking = await Booking.findOne({ docketNumber });
    if (!booking) {
      return res
        .status(404)
        .json({ msg: "Booking with this docket not found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete referenced documents within the transaction
      await Promise.all([
        Branch.findByIdAndDelete(booking.branch).session(session),
        Client.findByIdAndDelete(booking.client).session(session),
        Invoice.findByIdAndDelete(booking.invoice).session(session),
        Shipment.findByIdAndDelete(booking.shipment).session(session),
        ConsignorConsignee.findByIdAndDelete(
          booking.consignorConsignee
        ).session(session),
        Tracking.findByIdAndDelete(booking.tracking).session(session),
      ]);

      // Commit the transaction if everything is successful
      await session.commitTransaction();
      session.endSession();

      // Delete the booking document
      const result = await booking.deleteOne();
      if (result.deletedCount > 0) {
        res.status(200).json({ msg: "success" });
      } else {
        res.status(409).json({ msg: "Can not delete booking" });
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error deleting referenced documents:", error);
      res.status(500).json({ err: error.toString() });
    }
  } catch (error) {
    res.status(500).json({ err: error.toString() });
  }
}

async function getBookingForUpdate(req, res) {
  try {
    const booking = await Booking.findOne({
      docketNumber: req.query.docketNumber,
    })
    .populate("shipment")
    .populate("invoice")
    .populate("consignorConsignee")
    if (!booking) {
      res.status(404).json({ msg: "Booking Not Found" });
      return;
    }
   res.status(200).json({msg:"Success",data:booking})
  } catch (error) {
    res.status(500).json({err:error.toString()})
  }
}
module.exports = {
  createBooking,
  getBooking,
  getBookingReport,
  getBookingForDRSStatusUpdate,
  deleteBooking,
  getBookingForUpdate
};
