const { default: mongoose } = require("mongoose");
const Destination = require("../models/destination");
const Shipment = require("../models/shipment");

async function createDestination(req, res) {
  try {
    const dest = await Destination.create({
      ...req.body,
      createdBy: req.token._id,
    });
    const newDest = await Destination.findById(dest._id)
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "lastModifiedBy", select: "name" })
      .populate({ path: "state", select: "stateName" })
      .populate({ path: "zone", select: "zoneName" })
      .populate({ path: "destBranch", select: "branchName" });
    res.status(201).json({ msg: "success", data: newDest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
}

async function getDestination(req, res) {
  try {
    const dests = await Destination.find()
      .populate("zone")
      .populate("state")
      .populate("destBranch")
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "lastModifiedBy", select: "name" });
    res.status(200).json({ msg: "success", data: dests });
  } catch (err) {
    res.status(500).json({ err: err });
  }
}

async function updateDestination(req, res) {
  try {
    const dest = { ...req.body };
    delete dest?._id;
    delete dest?.__v;
    delete dest?.updatedAt;
    delete dest?.createdAt;
    const newDest = await Destination.findOneAndUpdate(
      { _id: req.query.did },
      { ...dest, lastModifiedBy: req.token._id },
      { new: true }
    )
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "lastModifiedBy", select: "name" })
      .populate({ path: "state", select: "stateName" })
      .populate({ path: "zone", select: "zoneName" })
      .populate({ path: "destBranch", select: "branchName" });
    res.status(200).json({ msg: "success", data: newDest });
  } catch (error) {
    res.status(500).json({ err: error });
  }
}

async function deleteDestination(req, res) {
  try {
    const destId = new mongoose.Types.ObjectId(req.query.destId);
    const isUsed = await Shipment.findOne({
      $or: [{ origin: destId }, { destination: destId }],
    });
    if (isUsed) {
      res
        .status(409)
        .json({ msg: "cannot delete as booking exists with this" });
      return;
    } else {
      const result = await Destination.deleteOne({ _id: destId });
      if (result.deletedCount > 0)
        res.status(200).json({ msg: "Success", data: result });
      else res.status(304).json({ msg: "Failed to Delete" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}
module.exports = {
  createDestination,
  getDestination,
  updateDestination,
  deleteDestination,
};
