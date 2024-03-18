const {
    isDocketBooked,
    isDocketValid,
} = require("./shipperControllers");
const Invoice = require("../models/invoice");
const Shipment = require("../models/shipment");
const ConsignorConsignee = require("../models/consignorConsignee");
const Booking = require("../models/booking");

async function createBooking(req, res) {
    try {
        const isValid = await isDocketValid(req.body.awbDetails.docketNumber)
        if (!isValid.valid) {
            res.status(403).json({ 'msg': isValid.msg })
            return
        }
        console.log(isValid.branch._id, req.body.branch);
        if (isValid.branch._id != req.body.branch) {
            res.status(403).json({ 'msg': 'this shipper is not issued to this branch try changing branch' })
            return
        }

        const isBooked = await isDocketBooked(req.body.awbDetails.docketNumber)
        if (isBooked.booked) {
            res.status(409).json({ 'msg': isBooked.msg })
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
        res.status(201).json({ 'msg': 'success' })
    } catch (err) {
        if (err.code == 11000) {
            res.status(409).json({ 'msg': 'this docket number already booked' })
            return
        }
        res.status(500).json({ 'err': err })
        console.log(err);
    }
}

async function getBooking(req, res) {
    try {
        if (!req.query.docket) {
            const bookings = await Booking.find()
                .populate("shipment")
                .populate("consignorConsignee")
            res.status(200).json({'msg':'success',data:bookings})
        } else {
            const booking = await Booking.findOne({ docketNumber: req.query.docket })
                .populate("shipment")
                .populate("invoice")
                .populate("consignorConsignee")
            const obj = {
                _id: booking?._id,
                docketNumber: booking?.docketNumber,
                date: booking?.bookingDate,
                origin: booking?.shipment?.origin?.destName,
                client: booking?.invoice?.clientName,
                destination: booking?.shipment?.destination?.destName,
                consignee: booking?.consignorConsignee?.consignee,
                pieces: booking?.shipment?.totalBoxes,
                weight: booking?.shipment?.totalActualWeight,
                toPay: booking?.invoice?.amountToPay,
                cod: booking?.invoice?.codAmount
            }
            res.status(200).json({'msg':'success',data:obj})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ 'err': error })
    }
}

module.exports = {
    createBooking,
    getBooking
}