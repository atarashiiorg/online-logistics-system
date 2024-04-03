const Manifest = require("../models/manifest")
const { isDocketValid, isDocketBooked } = require("./shipperControllers")
const { getManifestName, getFormttedDate, readEjs, createPdfFromHtml, getDataForManifestPdf } = require("../services/helpers")
const { getPopulatedManifest, updateTrackingManifest } = require("../services/dbServices")
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
        if (manifest) {
            await updateTrackingManifest(dockets,"docketNumber", {
                action: `Packet manifested from ${fromBranch.branchName.toUpperCase()} to ${toBranch.branchName.toUpperCase()} in Manifest No. ${manifestNumber}`,
                actionDate: new Date(),
            },{ currentManifest: manifest._id})
            await updateTrackingManifest(dockets,"docketNumber", {
                action: `Packet Dispatched to ${toBranch.branchName.toUpperCase()}`,
                actionDate: new Date(),
            }, {currentManifest:manifest._id})
            for(let i=0;i<dockets.length;i++){
                const tracking = await Tracking.findOne({docketNumber:dockets[i]})
                if(tracking.status=="booked"){
                    tracking.status = "in-transit"
                    await tracking.save()
                } else {
                    continue
                }
            }
            res.status(201).json({ 'msg': 'success' })
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
            const data = await getDataForManifestPdf(mid)
            const pdfBuffer = await createPdfFromHtml('manifest',data)
            const pdfStream = new PassThrough()
            pdfStream.end(pdfBuffer)
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${data.manifestNumber}.pdf"`
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
            let response = []
            for(let i=0;i<manifests.length;i++){
                console.log(manifests[i].dockets.length>0)
                if (manifests[i].dockets.length > 0) {
                    response.push(manifests[i])
                } else continue
            }
            res.status(200).json({ 'msg': 'success', data: response })
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
        console.log("RECEIVING AWB NUMBER")
        const branch = await Branch.findById(req.query.bid)
        for(let i=0;i<docketsToRecive.length;i++){
            const manifest = await Manifest.findOneAndUpdate(
                { 'dockets.booking': docketsToRecive[i].docket },
                { $set: { 'dockets.$[elem].isReceived': true, 'dockets.$[elem].rcDate':docketsToRecive[i].rcDate,'dockets.$[elem].message':docketsToRecive[i].message} },
                { new: true, arrayFilters: [{ 'elem.booking': docketsToRecive[i].docket }] }
            );
            console.log("RECEIVED->",manifest);
            await updateTrackingManifest([docketsToRecive[i].docket],"_id", {
                action: `Packet Received at ${branch.branchName.toUpperCase()}`,
                actionDate: new Date(),
            },{currentManifest:manifest._id})
        }
        res.status(200).json({ 'msg': 'success' })
    } catch (error) {
        console.log(error);
        res.status(500).json({err})
    }
}

module.exports = {
    createManifest,
    getManifests,
    receiveManifest
}