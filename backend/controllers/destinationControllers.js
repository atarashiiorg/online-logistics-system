const Destination = require("../models/destination")

async function createDestination(req, res) {
    try {
        const dest = await Destination.create({ ...req.body, createdBy: req.token._id })
        await dest
            .populate({ path: "createdBy", select: 'name' })
            .populate({ path: "lastModifiedBy", select: 'name' })
        res.status(201).json({ 'msg': 'success', data: dest })
    } catch (err) {
        res.status(500).json({ 'err': err })
    }
}

async function getDestination(req, res) {
    try {
        const dests = await Destination.find()
            .populate("zone")
            .populate("state")
            .populate("destBranch")
            .populate({ path: "createdBy", select: 'name' })
            .populate({ path: "lastModifiedBy", select: 'name' })
        res.status(200).json({ 'msg': 'success', data: dests })
    } catch (err) {
        res.status(500).json({ 'err': err })
    }
}

async function updateDestination(req, res) {
    try {
        const dest = { ...req.body }
        delete dest?._id
        delete dest?.__v
        delete dest?.updatedAt
        delete dest?.createdAt
        const newDest = await Destination.findOneAndUpdate({ _id: req.query.did }, { ...dest, lastModifiedBy: req.token._id }, { new: true })
            .populate({ path: "createdBy", select: 'name' })
            .populate({ path: "lastModifiedBy", select: 'name' })
        res.status(200).json({ 'msg': 'success', data: newDest })
    } catch (error) {
        res.status(500).json({ 'err': error })
    }
}

module.exports = {
    createDestination,
    getDestination,
    updateDestination
}