const Branch = require("../models/branch")
const Runsheet = require("../models/runsheet")
const Tracking = require("../models/tracking")
const { updateTrackingStatus, updateTrackingManifest } = require("../services/dbServices")
const { getRunsheetNumber, getDataForRunsheetPdf, createPdfFromHtml } = require("../services/helpers")
const { PassThrough } = require('stream')
const { startSession } = require('mongoose')

async function getRunsheets(req, res) {
    try {
        if (req.query.rid) {
            const dataForRunsheet = await getDataForRunsheetPdf(req.query.rid)
            const pdfBuffer = await createPdfFromHtml('runsheet', dataForRunsheet)
            const pdfStream = new PassThrough();
            pdfStream.end(pdfBuffer);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="runsheet_${dataForRunsheet.runsheetNumber}.pdf"`,
                'Connection':'Keep-Alive'
            });
            pdfStream.pipe(res);
            return
        } else {
            let runsheets;
            if (req.query.bid && req.query.eid && req.token.role != "adm" && req.token.role != "emp") {
                runsheets = await Runsheet.find({ branch: req.query.bid, employee: req.query.eid })
                    .populate("employee")
            } else if (req.query.bid && req.token.role == "emp") {
                runsheets = await Runsheet.find({ branch: req.query.bid })
                    .populate("employee")
            } else {
                runsheets = await Runsheet.find({ branch: req.query.bid })
                    .populate("employee")
            }
            res.status(200).json({ 'msg': 'success', data: runsheets })
        }
    } catch (error) {
        console.log("Error while fetching runsheets :",error)
        res.status(500).json({ err: "Internal server error occured" })
    }
}

async function createRunsheet(req, res) {
    const transaction = await startSession()
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

        const branch = await Branch.findById(req.body.branch)
        const runsheetNumber = await getRunsheetNumber()
        // return

        await transaction.startTransaction()//start transaction
        const runsheet = await Runsheet.create(
            [{ ...runSheet, runsheetNumber, createdBy: req.token._id }],
            {session:transaction}
        )
        if (runsheet) {
            await updateTrackingManifest(processedDockets, "docketNumber", {
                action: "Runsheet Prepared at " + branch.branchName.toUpperCase(),
                actionDate: req.body.date,
                actionBy: req.token._id
            }, null, transaction)
            await updateTrackingManifest(processedDockets, "docketNumber", {
                action: "Packet is out for delivery from " + branch.branchName.toUpperCase(),
                actionDate: req.body.date,
                actionBy: req.token._id
            }, null, transaction)
            await updateTrackingStatus(processedDockets, "docketNumber", "out for delivery", transaction)
        }

        await transaction.commitTransaction()//commit transaction

        res.status(201).json({ 'msg': 'success', data: runsheet })

    } catch (err) {
        await transaction.abortTransaction()//abort transaction
        console.log("Error while creating runsheet:", err)
        res.status(500).json({ err: "Internal server error occured" })
    } finally {
        transaction.endSession()//end transaction session
    }
}
module.exports = {
    getRunsheets,
    createRunsheet
}