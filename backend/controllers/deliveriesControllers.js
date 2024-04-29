const Runsheet = require('../models/runsheet')
const Tracking = require('../models/tracking')
const POD = require('../models/pod')
const imageCompressor = require('../utils/imageCompressor')
const { uploadImageToBucket } = require("../services/s3BucketServices")

async function getDeliveries(req, res) {
    try {
        const runsheets = await Runsheet.find({ employee: req.token._id })
        res.status(200).json({ msg: "success", data: [] })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.toString() })
    }
}

async function markDelivered(req, res) {
    try {
        const docketNumber = req.query.docket
        const tracking = await Tracking.findOne({ docketNumber })
        if (tracking.status == req.body.status && tracking.status != "delivered") {
            res.status(403).json({ msg: "status is already " + req.body.status })
            return
        }
        if (tracking.status == "delivered" && req.token.role != "adm") {
            res.status(403).json({ msg: "status is already delivered" })
            return
        }
        let pod = null
        if (req.body.status == "delivered" && req.file) {
            const imageBuffer = req.file.buffer
            const compressedImageBuffer = await imageCompressor(imageBuffer)
            const result = await uploadImageToBucket({ filename: "POD-" + docketNumber + "-" + Date.now() + ".jpg", buffer: compressedImageBuffer })
            pod = await POD.create(result)
        }
        tracking.status = req.body.status
        tracking.receiverType = req.body.rcType || ""
        tracking.receiver = req.body.rcName || ""
        tracking.statusRemarks = req.body.statusRemarks || ""
        tracking.podRemarks = req.body.podRemarks || ""
        pod ? tracking.podImage = pod?._id : ""
        tracking.receivingDate = req.body.status == "delivered" ? (req.body.receivingDate ? req.body.receivingDate : new Date()) : ""
        tracking.podReceivingDate = req.body.status == "delivered" ? (req.body.podReceivingDate ? req.body.podReceivingDate : new Date()) : ""
        tracking.details.push({
            action: `Packet status changed to ${req.body.status}`,
            actionDate: new Date(),
            actionBy: req.token._id
        })
        await tracking.save()
        console.log(tracking.details)
        res.status(200).json({ msg: 'success' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.toString() })
    }
}

module.exports = {
    getDeliveries,
    markDelivered
}