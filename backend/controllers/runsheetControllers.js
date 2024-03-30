const Branch = require("../models/branch")
const Runsheet = require("../models/runsheet")
const Tracking = require("../models/tracking")
const { updateTrackingStatus, updateTrackingManifest } = require("../services/dbServices")
const { getRunsheetNumber, getDataForRunsheetPdf, readEjs, createPdfFromHtml } = require("../services/helpers")
const fs = require('fs')
const { PassThrough } = require('stream')


async function getRunsheets(req, res) {
    try {
        if (req.query.rid) {
            const data = await getDataForRunsheetPdf(req.query.rid)
            const pdfBuffer = await createPdfFromHtml('runsheet',data)
            const pdfStream = new PassThrough();
            pdfStream.end(pdfBuffer);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="runsheet_${dataForRunsheet.runsheetNumber}.pdf"`
            });
            pdfStream.pipe(res);
            return
        } else {
            const runsheets = await Runsheet.find().populate("employee")
            res.status(200).json({ 'msg': 'success', data: runsheets })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })
    }
}

async function createRunsheet(req, res) {
    try {
        const runSheet = { ...req.body }
        if (runSheet.vendorType == 'self') {
            delete runSheet.vendor
        }
        const dockets = [...runSheet.dockets.map(d => { return { docketNumber: d.docketNumber, booking: d.booking } })]
        let processedDockets = []
        for (let i = 0; i < dockets.length; i++) {
            const tracking = await Tracking.findOne({ docketNumber: dockets[i].docketNumber })
            if (tracking.status == 'booked' || tracking.status == 'in-transit') {
                processedDockets.push(dockets[i])
            } else {
                continue
            }
        }

        runSheet.dockets = [...processedDockets]
        processedDockets = [...processedDockets.map(pd => pd.docketNumber)]
        console.log(runSheet)
        const branch = await Branch.findById(req.body.branch)
        const runsheetNumber = await getRunsheetNumber()
        // return
        const runsheet = await Runsheet.create({ ...runSheet, runsheetNumber })
        if (runsheet) {
            await updateTrackingManifest(processedDockets, "docketNumber", {
                action: "Runsheet Prepared at " + branch.branchName,
                actionDate: req.body.date
            })
            await updateTrackingManifest(processedDockets, "docketNumber", {
                action: "Packet is out for delivery from " + branch.branchName,
                actionDate: req.body.date
            })
            await updateTrackingStatus(processedDockets, "docketNumber", "out for delivery")
        }
        res.status(201).json({ 'msg': 'success', data: runsheet })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}
module.exports = {
    getRunsheets,
    createRunsheet
}