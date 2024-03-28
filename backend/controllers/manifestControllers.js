const Manifest = require("../models/manifest")
const Booking = require("../models/booking")
const { isDocketValid, isDocketBooked } = require("./shipperControllers")
const pdf = require("html-pdf")
const ejs = require("ejs")
const fs = require('fs')
const path = require("path")
const { getManifestName, generateManifestPdf, getFormttedDate, readEjs, createPdfFromHtml } = require("../services/helpers")
const { getPopulatedManifest, updateTrackingManifest, findManifestByDocketNumber } = require("../services/dbServices")
const { default: mongoose } = require("mongoose")
const { PassThrough } = require('stream')
const Branch = require("../models/branch")
const Tracking = require("../models/tracking")

async function createManifest(req, res) {
    try {

        if (req.body.toBCode == "") {
            res.status(203).json({ 'msg': 'ToBCode is not provided' })
            return
        }
        // route
        if (req.body.vendor == "") {
            res.status(203).json({ 'msg': 'vendor is not provided' })
            return
        }

        //route
        if (req.body.dockets.length <= 0) {
            res.status(203).json({ 'msg': 'docket list is not provided' })
            return
        }

        const dockets = req.body.dockets.map(d => d.docketNumber)
        const check_res = await checkDockets(dockets)

        if (!check_res.passed) {
            res.status(404).json({ msg: check_res.msg })
            return
        }
        const fromBranch = await Branch.findById(req.body.fromBCode)
        const toBranch = await Branch.findById(req.body.toBCode)
        const manifestNumber = getManifestName()
        const manifest = await Manifest.create({ ...req.body, manifestNumber })
        // if(trackingIds)
        if (manifest) {
            await updateTrackingManifest(dockets,"docketNumber", {
                action: `Packet manifested from ${fromBranch.branchName.toUpperCase()} to ${toBranch.branchName.toUpperCase()} in Manifest No. ${manifestNumber}`,
                actionDate: new Date(),
            }, manifest._id)
            await updateTrackingManifest(dockets,"docketNumber", {
                action: `Packet Dispatched to ${toBranch.branchName.toUpperCase()}`,
                actionDate: new Date(),
            }, manifest._id)
            for(let i=0;i<dockets.length;i++){
                const manifest = await Booking.findOne({docketNumber:dockets[i]})
                const tracking = await Tracking.findById(manifest.tracking)
                if(tracking.status=="booked"){
                    tracking.status = "in-transit"
                    await tracking.save()
                } else {
                    continue
                }
            }
            res.status(201).json({ 'data': manifest, 'msg': 'success' })
        } else {
            res.status(304).json({ 'msg': 'something went wrong' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'err': err })
    }
}

async function getManifests(req, res) {
    //mid based
    const tbid = req.query.bid
    const mid = req.query.mid
    const fbid = req.query.fbid
    try {
        if (mid) {
            const manifest = await getPopulatedManifest({ _id: mid }, true)

            let totalpieces = 0
            let totalWeight = 0
            let totalToPay = 0
            let totalCod = 0
            manifest.dockets.map(docket => {
                totalToPay += +docket.booking.invoice.amountToPay
                totalCod += +docket.booking.invoice.codAmount
                totalWeight += +docket.booking.shipment.totalChargeWeight
                totalpieces += +docket.booking.shipment.totalBoxes
                return
            })
            const dockets = manifest.dockets.map(d => {
                return {
                    docketNumber: d?.booking?.docketNumber,
                    date: getFormttedDate(d?.booking?.bookingDate),
                    origin: d?.booking?.shipment?.origin?.destName,
                    client: d?.booking?.invoice?.clientName,
                    destination: d?.booking?.shipment?.destination?.destName,
                    consignee: d?.booking?.consignorConsignee?.consignee,
                    pieces: d?.booking?.shipment?.totalBoxes || 0,
                    weight: d?.booking?.shipment?.totalChargeWeight || 0.0,
                    toPay: d?.booking?.invoice?.amountToPay || 0.0,
                    cod: d?.booking?.invoice?.codAmount || 0.0
                }
            })

            const dataObj = {
                printedAt: new Date().toDateString(),
                data: dockets,
                totalpieces,
                totalWeight,
                totalToPay,
                totalCod,
                mode: manifest.mode,
                branch: manifest?.fromBCode?.branchName,
                destination: manifest?.toBCode?.branchName,
                vendor: manifest?.vendor?.ownerName || "N/A",
                totalDockets: manifest?.dockets?.length,
                manifestDate: new Date(manifest?.manifestDate).toDateString(),
                manifestNumber: manifest?.manifestNumber
            }

            const html = await readEjs("manifest", dataObj)
            const pdfBuffer = await createPdfFromHtml(html)
            const pdfStream = new PassThrough()
            pdfStream.end(pdfBuffer)
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${manifest.manifestNumber}.pdf"`
            });
            pdfStream.pipe(res)
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'err': error })
        return
    }

    //bid based
    try {
        if (tbid) {
            const manifests = await getPopulatedManifest({ toBCode: new mongoose.Types.ObjectId(tbid) }, false, true)
            const response = manifests.map(m => {
                if (m.dockets.length > 0) {
                    return m
                } else return null
            })
            console.log(response);
            res.status(200).json({ 'msg': 'success', data: manifests })
            return
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'err': err })
        return
    }
    //
    try {
        if (fbid) {
            const manifests = await getPopulatedManifest({ fromBCode: new mongoose.Types.ObjectId(fbid) }, false, false)
            res.status(200).json({ 'msg': 'success', data: manifests })
            return
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'err': err })
        return
    }

    //all
    try {
        const manifests = await getPopulatedManifest({})
        res.status(200).json({ 'msg': 'success', data: manifests })
        return
    } catch (err) {
        res.status(500).json({ 'err': err })
        return
    }
}

async function checkDockets(dockets) {
    try {
        for (let i = 0; i < dockets.length; i++) {
            if (!(await isDocketValid(dockets[i])).valid) {
                console.log("1");
                return { passed: false, msg: "This is not a valid docket number or may not be issued to any branch" }
            }
            if (!(await isDocketBooked(dockets[i])).booked) {
                console.log("2");
                return { passed: false, msg: dockets[i] + " is not been booked yet" }
            }
        }
        return { passed: true, msg: "" }
    } catch (error) {
        return { passed: false, msg: "error while checking dockets" }
    }
}

async function receiveManifest(req, res) {
    try {
        if (req.body == null || req.body.length <= 0) {
            res.status(403).json({ 'msg': 'docket list is not provided to receive' })
            return
        }
        const docketsToRecive = [...req.body]
        // console.log(docketsToRecive)
        // res.end()
        // return
        const branch = await Branch.findById(req.query.bid)
        const result = await docketsToRecive.map(async(d) => {
            const manifest = await Manifest.findOneAndUpdate(
                { 'dockets.booking': d.docket },
                { $set: { 'dockets.$[elem].isReceived': true, 'dockets.$[elem].rcDate':d.rcDate,'dockets.$[elem].message':d.message} },
                { new: true, arrayFilters: [{ 'elem.booking': d.docket }] }
            );
            console.log(manifest);
            await updateTrackingManifest([d.docket],"_id", {
                action: `Packet Received at ${branch.branchName.toUpperCase()}`,
                actionDate: new Date(),
            },manifest._id)
        })
        res.status(200).json({ 'msg': 'success' })
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

module.exports = {
    createManifest,
    getManifests,
    receiveManifest
}