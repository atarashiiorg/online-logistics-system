const {
    isDocketBooked,
    isDocketValid,
} = require("./shipperControllers");
const Invoice = require("../models/invoice");
const Shipment = require("../models/shipment");
const ConsignorConsignee = require("../models/consignorConsignee");
const Booking = require("../models/booking");
const { initiateTracking, findManifestWithBooking } = require("../services/dbServices");
const Manifest = require("../models/manifest");
const { default: mongoose } = require("mongoose");
// const = require('mongoose').mongo.ObjectID

async function createBooking(req, res) {
    try {
        const isValid = await isDocketValid(req.body.awbDetails.docketNumber)

        if (!isValid.valid) {
            res.status(403).json({ 'msg': isValid.msg })
            return
        }

        if (isValid.branch._id != req.body.branch) {
            res.status(403).json({ 'msg': 'this shipper is not issued to this branch try changing branch' })
            return
        }

        const isBooked = await isDocketBooked(req.body.awbDetails.docketNumber)
        if (isBooked.booked) {
            res.status(409).json({ 'msg': isBooked.msg })
            return
        }

        const invoice = new Invoice(req.body.billingDetails)
        const shipment = new Shipment({
            ...req.body.awbDetails,
            ...req.body.dimWeight,
            ...req.body.volWeight
        })

        const consignorConsignee = new ConsignorConsignee(req.body.consignorConsignee)

        const tracking = await initiateTracking(req.body.awbDetails.docketNumber, isValid.branch.branchName, req.body.awbDetails.bookingDate, "")
        const booking = new Booking({
            ...req.body.awbDetails,
            branch: req.body.branch,
            invoice: invoice._id,
            shipment: shipment._id,
            consignorConsignee: consignorConsignee._id,
            client: req.body.client,
            tracking: tracking._id
        })

        await invoice.save()
        await shipment.save()
        await consignorConsignee.save()
        await tracking.save()
        await booking.save()

        res.status(201).json({ 'msg': 'success' })
    } catch (err) {
        console.log(err)
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
            res.status(200).json({ 'msg': 'success', data: bookings })
        } else {

            const isValid = await isDocketValid(req.query.docket)
            if(!isValid.valid){
                res.status(403).json({"msg":isValid.msg})
                return
            }

            const data = await findManifestWithBooking({docketNumber:req.query.docket})
            // console.log(data)
            if(!data){
                res.status(403).json({msg:'Docket not booked yet'})
                return
            }
            console.log(data.manifest)
            if(!data?.manifest){
                console.log("manifest nhi mila")
                if(!data?.booking?.branch.equals(req.query.branch)){
                    res.status(403).json({msg:"Docket not booked by this branch"})
                    return
                }
                if(data?.booking?.tracking?.status=="in-transit"||data?.booking?.tracking?.status=="booked"){
                    //continue
                    console.log("intransit / booked")
                } else {
                    res.status(403).json({'msg':'can not create manifest or runsheet. current status of packet is '+data?.booking?.tracking?.status})
                    return
                }
            } else {
                if(new mongoose.Types.ObjectId(data.manifest.toBCode).equals(req.query.branch)){
                    const docket = data.manifest.dockets.filter(d=>d.booking?.docketNumber==req.query.docket)[0]
                    console.log("manifest-found->",docket)
                    if(!docket.isReceived){
                        res.status(403).json({'msg':'docket manifested to current branch but not received yet'})
                        return
                    }
                    if(data?.booking?.tracking?.status=="in-transit"||data?.booking?.tracking?.status=="booked"){
                        //continue
                        console.log("intransit / booked")
                    } else {
                        res.status(403).json({'msg':'can not create manifest or runsheet. current status of packet is '+data?.booking?.tracking?.status})
                        return
                    }

                } else {
                    res.status(403).json({msg:'docket not manifested to current branch'})
                    return
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
                itemContent: data.booking?.invoice?.itemContent
            }
            res.status(200).json({ 'msg': "success", data: obj })
            // return
            // let booking
            // let msg
            // if (manifest.found) {
            //     if (manifest.data.toBCode == req.query.branch) {
            //         const docket = manifest.data.dockets.filter(d=>d.booking?.docketNumber==req.query.docket)[0]
            //         if(!docket.isReceived){
            //             res.status(403).json({'msg':'docket manifested to current branch but not received yet'})
            //             return
            //         }
            //         booking = await getPopulatedBooking({ docketNumber: req.query.docket }, true)
            //         msg = "Docket manifested to current branch"
            //     } else {
            //         booking=null
            //         msg="Docket not manifested to this branch"
            //     }
            // } else {
            //     if(manifest.status=="out for delivery"){
            //         res.status(403).json({msg:"Docket is already out for delivery"})
            //         return
            //     }
            //     booking = await getPopulatedBooking({ branch: req.query.branch, docketNumber: req.query.docket }, true)
            //     if(!booking){
            //         msg = "Docket not booked by current branch"
            //     } else {
            //         msg = "Docket booked by current branch"
            //     }
            // }

            // if (!booking) {
            //     res.status(403).json({ 'msg': msg })
            //     return
            // }

            // if(booking.tracking.status=="in-transit"||booking.tracking.status=="booked"){
            //     //continue
            // } else {
            //     res.status(403).json({'msg':'can not create manifest or runsheet. current status of packet is '+booking.tracking.status})
            //     return
            // }           
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