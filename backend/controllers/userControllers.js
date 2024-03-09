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
            const nuser = { ...user._doc }
            delete nuser.password
            res.status(200).json({ user: nuser, token: token })
        } else {
            res.status(401).json({ 'msg': 'invalid password' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'err': err })
    }
}

async function createBooking(req, res) {
    try {
        const isValid = await isDocketValid(req.body.awbDetails.docketNumber)
        if(!isValid.valid){
            res.status(403).json({'msg':isValid.msg})
            return
        }
        console.log(isValid.branch._id,req.body.branch);
        if(isValid.branch._id!=req.body.branch){
            res.status(403).json({'msg':'this shipper is not issued to this branch try changing branch'})
            return
        }

        const isBooked = await isDocketBooked(req.body.awbDetails.docketNumber)
        if(isBooked.booked){
            res.status(409).json({'msg':isBooked.msg})
            return
        }

        const invoice = await Invoice.create(req.body.billingDetails)
        const shipment = await Shipment.create({
            ...req.body.awbDetails,
            ...req.body.dimWeight,
            ...req.body.volWeight
        })

        const consignorConsignee = await ConsignorConsignee.create(req.body.consignorConsignee)
        console.log(consignorConsignee);

        const booking = await Booking.create({
            ...req.body.awbDetails,
            branch: req.body.branch,
            invoice: invoice._id,
            shipment: shipment._id,
            consignorConsignee: consignorConsignee._id,
            client: req.body.client
        })
        res.status(201).json({'msg':'success'})
    } catch (err) {
        if (err.code == 11000) {
            res.status(409).json({'msg':'this docket number already booked'})
            return
        }
        res.status(500).json({'err':err})
        console.log(err);
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

async function shipperIssueToBranch(req, res) {
    try {
        const branchCode = req.body.issuedTo
        const docketFrom = req.body.docketFrom
        const docketTo = req.body.docketTo
        const issueDate = req.body.issueDate
        const receivedBy = req.body.receivedBy

        const isValid = await isShipperSeriesValid(docketFrom, docketTo)
        if(!isValid.valid){
            res.status(403).json({'msg':isValid.msg})
            return
        }

        const isIssued = await isShipperIssuedAlready(docketFrom,docketTo)
        if(!isIssued.issued){
            res.status(409).json({'msg':isIssued.msg})
            return
        }

        const result = await Branch.updateOne(
            { branchCode },
            {
                $push: {
                    shippers: {
                        docketFrom,
                        docketTo,
                        issueDate,
                        receivedBy
                    }
                }
            }
        )

        if (result.modifiedCount > 0) {
            res.status(200).json({'msg':'success'})
            return
        }
        res.status(304).end()
    } catch (err) {
        console.log(err);
        res.status(500).json({'err':err})
    }
}


module.exports = {
    loginUser,
    createBooking,
    shipperIssueToBranch,
    trackAwb
}