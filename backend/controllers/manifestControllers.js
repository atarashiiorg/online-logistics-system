const Manifest = require("../models/manifest")
const Booking = require("../models/booking")
const { isDocketValid, isDocketBooked } = require("./shipperControllers")
const pdf = require("html-pdf")
const ejs = require("ejs")
const fs = require('fs')
const path = require("path")
const { getManifestName, generateManifestPdf } = require("../services/helpers")

async function createManifest(req, res) {
    try {
        if (req.body.vendor == "") {
            res.status(203).json({ 'msg': 'vendor is not provided' })
            return
        }

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
        const manifest = await Manifest.create({...req.body, manifestNumber})
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
    try {
        if (req.query.mid) {
            const manifest = await Manifest.findById({ _id: req.query.mid }).populate("fromBCode").populate("toBCode")
            let totalpieces = 0
            let totalWeight = 0
            let totalToPay = 0
            let totalCod = 0
            manifest.dockets.map(m => {
                totalToPay += +m.toPay
                totalCod += +m.cod
                totalWeight += +m.weight
                totalpieces += +m.pieces
                return
            })
            const dataObj = {
                printedAt: new Date().toDateString(),
                data: manifest.dockets,
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
                manifestNumber:manifest?.manifestNumber
            }

            console.log(dataObj)

            const file = await generateManifestPdf(dataObj,manifest.manifestNumber) 
            res.set("content-disposition",{"filename":manifest.manifestNumber+".pdf"})
            res.download(file,()=>{
                console.log("downloaded");
            })
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'err': error })
        return
    }

    try {
        const manifests = await Manifest.find({})
                                .populate("fromBCode")
                                .populate("toBCode")
        res.status(200).json({ 'msg': 'success', manifests })
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'err': err })
    }
}

async function checkDockets(dockets) {
    try {
        for (let i = 0; i < dockets.length; i++) {
            console.log(await isDocketValid(dockets[i]));
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