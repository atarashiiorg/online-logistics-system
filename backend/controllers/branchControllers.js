const Booking = require("../models/booking");
const Branch = require("../models/branch");
const BranchAccess = require("../models/branchAccess");
const Client = require("../models/client");
const Destination = require("../models/destination");
const { getNewBranchCode } = require("../services/helpers");

async function createBranch(req, res) {
  try {
    const branchCode = await getNewBranchCode();
    const branch = { ...req.body };
    if (req.body.isHub) {
      delete branch?.hubBranch;
      delete branch?._hubBranch;
    }
    const result = await Branch.create({
      ...branch,
      branchCode,
      createdBy: req.token._id,
    });
    const createdBranch = await Branch.findOne({ _id: result._id })
      .populate("zone")
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "lastModifiedBy", select: "name" });
    res.status(201).json({ msg: "success", data: createdBranch });
  } catch (err) {
    res.status(500).json({ err: err });
  }
}

async function getBranches(req, res) {
  try {
    const branches = await Branch.find().populate("hubBranch").populate("zone");
    res.status(200).json({ msg: "success", data: branches });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function updateBranch(req, res) {
  try {
    let data = { ...req.body };
    delete data.id;
    delete data.hubBranch;
    delete data.shippers;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;
    const result = await Branch.findOneAndUpdate(
      { _id: req.query.bid },
      { ...data, lastModifiedBy: req.token._id },
      { new: true }
    )
      .populate("zone")
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "lastModifiedBy", select: "name" });
    res.status(200).json({ msg: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
}

async function deleteBranch(req, res) {
  try {
    if (req.token.role != "adm") {
      res.status(401).json({ msg: "unauthorized access" });
      return;
    }
    const booking = await Booking.findOne({ branch: req.query.bid });
    if (booking) {
      res.status(403).json({ msg: "Can not delete, booking exists" });
      return;
    }
    const branchAccess = await BranchAccess.findOne({
      "access.branch": req.query.bid,
    });
    if (branchAccess) {
      res.status(403).json({ msg: "Can not delete, Branch Permission exists" });
      return;
    }
    const client = await Client.findOne({ branchName: req.query.bid });
    if (client) {
      res.status(403).json({ msg: "Can not delete, Client exists" });
      return;
    }
    const dest = await Destination.findOne({ destBranch: req.query.bid });
    if (dest) {
      res.status(403).json({ msg: "Can not delete, destination exists" });
      return;
    }
    const branch = await Branch.findOne({_id:req.query.bid})
    if(branch.shippers.length<=0){
        res.status(403).json({ msg: "Can not delete, shippers issued to this branch" });
        return;
    }
    const result = await Branch.deleteOne({ _id: req.query.bid });
    if (result.deletedCount > 0) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(403).json({ msg: "not deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
}

module.exports = {
  createBranch,
  getBranches,
  updateBranch,
  deleteBranch,
};
