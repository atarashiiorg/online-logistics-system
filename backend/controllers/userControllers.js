const User = require("../models/user")
const jwt = require("jsonwebtoken")
const Shipper = require("../models/shipper")
const Shipment = require("../models/shipment")
const Invoice = require("../models/invoice")
const Booking = require("../models/booking")
const ConsignorConsignee = require("../models/consignorConsignee")
const Branch = require("../models/branch")
const { isDocketValid, isDocketBooked, isShipperSeriesValid, isShipperIssuedAlready } = require("./shipperControllers")

async function loginUser(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username })
        console.log("user", user);
        if (!user) {
            res.status(404).end()
            return
        }
        if (user.password == req.body.password) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
            const n_user = { ...user._doc }
            delete nuser.password
            res.status(200).json({ user: n_user, token: token })
        } else {
            res.status(401).json({ 'msg': 'invalid password' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'err': err })
    }
}


async function trackAwb(req, res) {
    try {
        const doc_num = req.query.docket
        const bookings = await Booking.findOne({ docketNumber: doc_num })
            .populate("invoice")
            .populate("shipment")
            .populate("consignorConsignee")
            .populate("branch")
            .populate("client")
        if (bookings) {
            res.status(200).json({ used: true, valid: true, bookings, msg:'success' })
            return
        }
        const docket = await Branch.find({
            shippers: {
                $elemMatch: {
                    $and: [
                        { docketFrom: { $lte: doc_num } },
                        { docketTo: { $gte: doc_num } }
                    ]
                }
            }
        })
        if (docket.length <= 0)
            res.status(200).json({ valid: false, used: false, docket, 'msg':'docket is not valid' })
        else
            res.status(200).json({ valid: true, used: false, docket, 'msg':'docket is valid but not yet booked' })
    } catch (err) {
        console.log(err);
        res.status(500).json({'err':err})
    }
}


module.exports = {
    loginUser,
    trackAwb
}