const Zone = require("../models/zone")

async function createZone(req, res) {
    try {
        const zone = await Zone.create({ ...req.body, createdBy: req.token._id })
        await zone
            .populate({ path: "createdBy", select: 'name' })
            .populate({ path: "lastModifiedBy", select: 'name' })
        res.status(201).json({ 'msg': 'success', data: zone })
    } catch (err) {
        res.status(500).json({ 'err': err })
    }
}

async function getZone(req, res) {
    try {
        if (req.query.zoneId) {
            const zone = await Zone.find({})
                .populate({ path: "createdBy", select: 'name' })
                .populate({ path: "lastModifiedBy", select: 'name' })
        }
        const zones = await Zone.find()
        res.status(200).json({ 'msg': 'success', data: zones })
    } catch (err) {
        res.status(500).json({ 'err': err })
    }
}

async function updateZone(req, res) {
    try {
        const newZone = await Zone.findOneAndUpdate({ _id: req.query.zid }, { ...req.body, lastModifiedBy: req.token._id }, { new: true })
            .populate({ path: "createdBy", select: 'name' })
            .populate({ path: "lastModifiedBy", select: 'name' })
        res.status(200).json({ 'msg': 'success', data: newZone })
    } catch (error) {
        res.status(500).json({ 'err': error })
    }
}

module.exports = {
    createZone,
    getZone,
    updateZone
}