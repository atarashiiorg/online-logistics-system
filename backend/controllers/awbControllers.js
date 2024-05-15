const { getPopulatedBooking } = require("../services/dbServices");
const { createPdfFromHtml, readEjs, getFormttedDate, getDataForAwbPdf } = require("../services/helpers");
const { PassThrough } = require("stream");
const mongoose = require("mongoose")
const { isDocketValid } = require("./shipperControllers");
async function getAwb(req, res) {
    try {
        const dockets = req.query?.dockets?.split(",")
        for (let i = 0; dockets.length; i++) {
            const result = await isDocketValid(dockets[i])
            if (!result.isValid || !result.branch._id.equals(new mongoose.Types.ObjectId(req.query.branch))) {
                res.status(403).json({ msg: "Either docket is invalid or not issued to this branch" })
                return
            }
        }
        if (req.query.sticker) {
            const bookings = dockets.map(d=>{
                return {
                    origin: "",
                    destination: "",
                    bookingDate: "",
                    creditAmt: "",
                    piecies: "",
                    consignor: "",
                    consignee: "",
                    chargedWeight: "",
                    invoiceNo: "",
                    invoiceVal: "",
                    docketNumber:d,
                    bookingType: "",
                    comp_mobile: "",
                    comp_gst: "",
                    codAmt:"",
                    withLogo: true
                }
            })

            const pdf = await createPdfFromHtml("docket", { bookings }, 'landscape')
            const pdfStream = new PassThrough()
            pdfStream.end(pdf)
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="awb_multiprint.pdf"`
            })
            pdfStream.pipe(res)
            return
        }
        let bookings = await getDataForAwbPdf({ docketNumber: { $in: dockets }, branch: req.query.branch })
        if (req.query.logo == 'false') {
            bookings = bookings.map(b => { return { ...b, withLogo: false } })
        }
        if (bookings.length <= 0) {
            res.status(403).json({ msg: "No booking found for dockets you provided for this branch" })
            return
        }
        const pdf = await createPdfFromHtml("docket", { bookings }, 'landscape')
        const pdfStream = new PassThrough()
        pdfStream.end(pdf)
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="awb_multiprint.pdf"`
        })
        pdfStream.pipe(res)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

module.exports = {
    getAwb
}