const Manifest = require("../models/manifest")
const { isDocketValid, isDocketBooked } = require("./shipperControllers")
const { getManifestName, getFormttedDate, readEjs, createPdfFromHtml, getDataForManifestPdf } = require("../services/helpers")
const { getPopulatedManifest, updateTrackingManifest } = require("../services/dbServices")
const { default: mongoose, startSession } = require("mongoose")
const { PassThrough } = require('stream')
const Branch = require("../models/branch")
const Tracking = require("../models/tracking")

async function createManifest(req, res) {
    const transaction = await startSession()
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

        await transaction.startTransaction()//start transaction

        const manifest = await Manifest.create({ ...req.body, manifestNumber, createdBy: req.token._id })
        if (manifest) {
            await updateTrackingManifest(dockets, "docketNumber", {
                action: `Packet manifested from ${fromBranch.branchName.toUpperCase()} to ${toBranch.branchName.toUpperCase()} in Manifest No. ${manifestNumber}`,
                actionDate: new Date(),
                actionBy: req.token._id
            }, { currentManifest: manifest._id }, transaction)
            await updateTrackingManifest(dockets, "docketNumber", {
                action: `Packet Dispatched to ${toBranch.branchName.toUpperCase()}`,
                actionDate: new Date(),
                actionBy: req.token._id
            }, { currentManifest: manifest._id }, transaction)
            for (let i = 0; i < dockets.length; i++) {
                const tracking = await Tracking.findOne({ docketNumber: dockets[i] })
                if (tracking.status == "booked") {
                    tracking.status = "in-transit"
                    await tracking.save({ session: transaction })
                } else {
                    continue
                }
            }
            res.status(201).json({ 'msg': 'success' })

            await transaction.commitTransaction()//commit transaction
        } else {
            res.status(304).json({ 'msg': 'something went wrong' })
        }
    } catch (err) {
        await transaction.abortTransaction()//abort transaction
        console.log(err);
        res.status(500).json({ 'err': err })
    } finally {
        transaction.endSession()//end transaction session    
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
            const pdfBuffer = await createPdfFromHtml('manifest', data)
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
        console.log("Error occured while generating manifest pdf " + new Date().toLocaleDateString() + " ->", error)
        res.status(500).json({ 'err': "Internal error occured while generating pdf" })
        return
    }

    //bid based
    try {
        if (tbid) {
            const manifests = await getPopulatedManifest({ toBCode: new mongoose.Types.ObjectId(tbid) }, false, true)
            let response = []
            for (let i = 0; i < manifests.length; i++) {
                console.log(manifests[i].dockets.length > 0)
                if (manifests[i].dockets.length > 0) {
                    response.push(manifests[i])
                } else continue
            }
            res.status(200).json({ 'msg': 'success', data: response })
            return
        }
    } catch (err) {
        console.log("Error while getting toBCode manifests" + new Date().toLocaleDateString() + "-> ", err)
        res.status(500).json({ 'err': "Internal server error occured" })
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
        console.log("Error occured ->", err)
        res.status(500).json({ 'err': "Internal server error occured" })
        return
    }

    //all
    try {
        const manifests = await getPopulatedManifest({})
        res.status(200).json({ 'msg': 'success', data: manifests })
        return
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'err': "Internal server error occured" })
        return
    }
}

async function checkDockets(dockets) {
    try {
        for (let i = 0; i < dockets.length; i++) {
            if (!(await isDocketValid(dockets[i])).valid) {
                return { passed: false, msg: "This is not a valid docket number or may not be issued to any branch" }
            }
            if (!(await isDocketBooked(dockets[i])).booked) {
                return { passed: false, msg: dockets[i] + " is not been booked yet" }
            }
        }
        return { passed: true, msg: "" }
    } catch (error) {
        return { passed: false, msg: "error while checking dockets" }
    }
}

async function receiveManifest(req, res) {
    const transaction = await startSession()
    try {
        if (req.body == null || req.body.length <= 0) {
            res.status(403).json({ 'msg': 'docket list is not provided to receive' })
            return
        }
        const docketsToRecive = [...req.body]
        const branch = await Branch.findById(req.query.bid)

        await transaction.startTransaction()//start transaction

        for (let i = 0; i < docketsToRecive.length; i++) {
            const manifest = await Manifest.findOneAndUpdate(
                { 'dockets.booking': docketsToRecive[i].docket },
                { $set: { 'dockets.$[elem].isReceived': true, 'dockets.$[elem].rcDate': docketsToRecive[i].rcDate, 'dockets.$[elem].message': docketsToRecive[i].message } },
                {
                    new: true,
                    arrayFilters: [{ 'elem.booking': docketsToRecive[i].docket }],
                    session: transaction
                },
            );
            await updateTrackingManifest([docketsToRecive[i].docket], "_id", {
                action: `Packet Received at ${branch.branchName.toUpperCase()}`,
                actionDate: new Date(),
                actionBy: req.token._id
            }, { currentManifest: manifest._id }, transaction)
        }

        await transaction.commitTransaction()//commit transaction
        res.status(200).json({ 'msg': 'success' })
    } catch (error) {
        await transaction.abortTransaction()//abort transaction
        console.log(error)
        res.status(500).json({ err })
    } finally {
        transaction.endSession()
    }
}

module.exports = {
    createManifest,
    getManifests,
    receiveManifest
}