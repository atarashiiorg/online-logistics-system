const Manifest = require("../models/manifest")
const Booking = require("../models/booking")
const { isDocketValid, isDocketBooked } = require("./shipperControllers")
const pdf = require("html-pdf")
const ejs = require("ejs")
const fs = require('fs')
const path = require("path")
const { getManifestName, generateManifestPdf } = require("../services/helpers")
const { getPopulatedManifest } = require("../services/dbServices")

async function createManifest(req, res) {
    try {
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

        const manifestNumber = getManifestName()
        const manifest = await Manifest.create({ ...req.body, manifestNumber })
        if (manifest) {
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
    const bid = req.query.bid
    const mid = req.query.mid
    try {
        if (mid) {
            const manifest = await getPopulatedManifest({ _id: mid },true)
           
            let totalpieces = 0
            let totalWeight = 0
            let totalToPay = 0
            let totalCod = 0
            manifest.dockets.map(docket => {
                totalToPay += +docket.booking.invoice.amountToPay
                totalCod += +docket.booking.invoice.codAmount
                totalWeight += +docket.booking.shipment.totalActualWeight
                totalpieces += +docket.booking.shipment.totalBoxes
                return
            })
            const dockets = manifest.dockets.map(d => {
                return {
                    docketNumber: d?.booking?.docketNumber,
                    date: new Date(d?.booking?.bookingDate).toDateString(),
                    origin: d?.booking?.shipment?.origin?.destName,
                    client: d?.booking?.invoice?.clientName,
                    destination: d?.booking?.shipment?.destination?.destName,
                    consignee: d?.booking?.consignorConsignee?.consignee,
                    pieces: d?.booking?.shipment?.totalBoxes || 0,
                    weight: d?.booking?.shipment?.totalActualWeight || 0.0,
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

            const file = await generateManifestPdf(dataObj, manifest.manifestNumber)
            res.download(file, manifest.manifestNumber + ".pdf", () => {
                fs.unlink("files/" + manifest.manifestNumber + ".pdf", (err) => {
                    console.log("downloaded");
                })
            })
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'err': error })
        return
    }

    //bid based
    try {
        if(bid){   
            const manifests = await getPopulatedManifest({toBCode:bid})
            res.status(200).json({ 'msg': 'success', data: manifests })
            return
        } 
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'err': err })
        return
    }

    //all
    try{
        const manifests = await getPopulatedManifest()
        res.status(200).json({'msg':'success',data:manifests})
        return
    } catch(err) {
        res.status(500).json({'err':err})
        return
    }
}

async function checkDockets(dockets) {
    try {
        for (let i = 0; i < dockets.length; i++) {
            if (!(await isDocketValid(dockets[i])).valid) {
                console.log("1");
                return { passed: false, msg: dockets[i] + " is not a valid docket number or may not be issued to any branch" }
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

module.exports = {
    createManifest,
    getManifests
}