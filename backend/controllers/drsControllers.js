const Runsheet = require("../models/runsheet")
const { getRunsheetNumber, getDataForRunsheetPdf, readEjs, createPdfFromHtml } = require("../services/helpers")
const fs = require('fs')
const { PassThrough } = require('stream')


async function getRunsheets(req, res) {
    try {
        if (req.query.rid) {
            const runsheet = await Runsheet.findOne({ _id: req.query.rid })
                .populate("employee")
                .populate({
                    path: "dockets.booking",
                    populate: [
                        {
                            path: "shipment",
                            populate: [{ path: "origin" }, { path: "destination" }]
                        },
                        { path: "invoice" },
                        { path: "client" },
                        { path: "consignorConsignee" }
                    ]
                })

            const dataForRunsheet = await getDataForRunsheetPdf(runsheet)
            const html = await readEjs("runsheet", dataForRunsheet)
            const pdfBuffer = await createPdfFromHtml(html)
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
        const runsheetNumber = await getRunsheetNumber()
        const runsheet = await Runsheet.create({ ...runSheet, runsheetNumber })
        res.status(200).json({ 'msg': 'success', data: runsheet })
    } catch (err) {
        console.log(err)
        res.status(200).json({ err })
    }
}
module.exports = {
    getRunsheets,
    createRunsheet
}