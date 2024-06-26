const Branch = require("../models/branch")
const Client = require("../models/client")
const Vendor = require("../models/vendor")
const ejs = require("ejs")
const path = require("path")
const Runsheet = require("../models/runsheet")
const Employee = require("../models/employee")
const puppeteer = require('pdf-puppeteer')
const {Worker}=require('worker_threads')
const { getPopulatedBooking, getPopulatedManifest } = require("./dbServices")

const getNewBranchCode = async () => {
    const branch = await Branch.findOne({}).sort({ 'createdAt': -1 })
    if (branch) {
        const bCode = branch.branchCode.substring(1, branch.branchCode.length)
        return `B${Number(bCode) + 1}`
    } else {
        return "B1001"
    }
}

const getNewEmployeeCode = async () => {
    const emp = await Employee.findOne({}).sort({ 'createdAt': -1 })
    if (emp) {
        const eCode = emp.eCode.substring(1, emp.eCode.length)
        return `E${Number(eCode) + 1}`
    } else {
        return "E1001"
    }
}

const getNewClientCode = async () => {
    const client = await Client.findOne({}).sort({ 'createdAt': -1 })
    if (client) {
        const cCode = client.clientCode.substring(1, client.clientCode.length)
        return `C${Number(cCode) + 1}`
    } else {
        return "C1001"
    }
}

const getNewVendorCode = async () => {
    const vendor = await Vendor.findOne({}).sort({ 'createdAt': -1 })
    console.log(vendor);
    if (vendor) {
        const cCode = vendor.vendorCode.substring(1, vendor.vendorCode.length)
        return `V${Number(cCode) + 1}`
    } else {
        return "V1001"
    }
}

const getRunsheetNumber = async () => {
    try {
        const drs = await Runsheet.findOne().sort({ 'createdAt': -1 })
        if (drs) {
            return drs.runsheetNumber + 1
        } else {
            const y = new Date().getFullYear()
            const d = new Date().getDate()
            return parseInt(`${y}${d}001`)
        }
    } catch (err) {
        return err
    }
}

const getManifestName = () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()
    const now = Date.now()
    const name = "Manifest_" + year + "_" + month + "_" + date + "_" + now
    return name
}

function readEjs(template, data) {
    return new Promise((resolve, reject) => {
        const worker=new Worker(__dirname+'/readEjsWorker.js')
        worker.postMessage({template,data});
        worker.on('message',(html)=>{
            resolve(html);
        })
        worker.on('error',(err)=>{
            reject(err);
        })

        // try {
        //     console.log(data)
        //     ejs.renderFile(`views/${template}.ejs`, data, (err, html) => {
        //         err ? reject(err) : resolve(html)
        //     })
        // } catch (error) {
        //     reject(err)
        // }
    })
}

function createPdf(html, opts) {
    return new Promise((resolve, reject) => {
        const worker=new Worker(__dirname+'/createPdfWorker.js')
        worker.postMessage({html,opts});
        worker.on('message',(pdf)=>{
            resolve(pdf);
        })
        worker.on('error',(err)=>{
            reject(err);
        })
        // puppeteer(html, (pdf) => {
        //     resolve(pdf)
        // }, opts, {
        //     args: [
        //         '--no-sandbox',
        //         '--disable-setuid-sandbox',
        //     ],
        //     headless:'new'
        // });
    })
}

async function createPdfFromHtml(template, data, orientation = 'portrait') {
    const pdfOptions = {
        format: 'A4',
        landscape: orientation.toLowerCase() === 'landscape'
    };
    const html = await readEjs(template,{...data})
    const pdf = await createPdf(html,pdfOptions)
    return pdf
}

function getFormttedDate(date) {
    const inputDate = new Date(date);
    const day = inputDate.getDate();
    const month = inputDate.toLocaleString('default', { month: 'short' });
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
}

async function getDataForRunsheetPdf(rid) {
    try {

        const runsheetObj = await Runsheet.findOne({ _id: rid })
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
            .populate("vendor")


        let runsheet = {
            deliveryBoy: runsheetObj?.employee?.name,
            mobile: runsheetObj?.mobile,
            runsheetDate: getFormttedDate(runsheetObj?.date),
            loginBranch: "",
            area: runsheetObj?.area,
            driver: runsheetObj?.driver,
            vehicleNo: runsheetObj.vendorType == "self" ? runsheetObj.vehicleNumber : runsheetObj.vendor.vehicleNumber,
            runsheetNumber: runsheetObj?.runsheetNumber,
        }
        console.log(runsheetObj)
        let totalPcs = 0
        let totalWeight = 0
        let totalCash = 0
        let totalToPay = 0
        let totalCod = 0
        const dockets = runsheetObj.dockets.map(d => {
            totalPcs = parseInt(totalPcs) + parseInt(d?.booking?.shipment?.totalBoxes || 0)
            totalWeight = (parseFloat(totalWeight) + parseFloat(d?.booking?.shipment?.totalChargeWeight || 0)).toFixed(2)
            totalCash = (parseFloat(totalCash) + parseFloat(d?.booking?.invoice?.codAmount || 0)).toFixed(2)
            totalCod = (parseFloat(totalCod) + parseFloat(d?.booking?.invoice?.codAmount || 0)).toFixed(2)
            totalToPay = (parseFloat(totalToPay) + parseFloat(d?.booking?.invoice?.amountToPay || 0)).toFixed(2)
            return {
                docketNumber: d?.booking?.docketNumber || "",
                consignor: d?.booking?.consignorConsignee?.consignor || "",
                origin: d?.booking?.shipment?.origin?.destName || "",
                consignee: d?.booking?.consignorConsignee?.consignee || "",
                destination: d?.booking?.shipment?.destination?.destName || "",
                pcs: d?.booking?.shipment?.totalBoxes || 0,
                weight: d?.booking?.shipment?.totalChargeWeight || 0,
                cash: 0,
                topay: d?.booking?.invoice?.amountToPay || 0,
                cod: d?.booking?.invoice?.codAmount || 0
            }
        })
        runsheet = { ...runsheet, dockets, totalToPay, totalCash, totalCod, totalPcs, totalWeight }
        console.log(runsheet)
        return runsheet
    } catch (err) {
        throw err
    }
}

async function getDataForManifestPdf(mid) {
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

    return dataObj
}

async function getDataForAwbPdf(opts) {
    let booking = await getPopulatedBooking(opts||{})
    booking = booking.map(b => {
        const obj = {
            origin: b?.shipment?.origin?.destName || "",
            destination: b?.shipment?.destination?.destName || "",
            bookingDate: getFormttedDate(b?.bookingDate) || "",
            creditAmt: "",
            piecies: b?.shipment?.totalBoxes,
            consignor: b?.consignorConsignee?.consignor || "",
            Consignee: b?.consignorConsignee?.consignee || "",
            chargedWeight: b?.shipment?.totalChargeWeight || "",
            invoiceNo: b?.invoice?.invoiceNumber || "",
            invoiceVal: b?.invoice?.invoiceValue || "",
            docketNumber: b?.docketNumber,
            bookingType: b?.invoice?.bookingType,
            comp_mobile: "",
            comp_gst: "",
            withLogo: true
        }
        return obj
    })
    return booking
}
module.exports = {
    getNewBranchCode,
    getNewClientCode,
    getNewVendorCode,
    getManifestName,
    createPdfFromHtml,
    getRunsheetNumber,
    getNewEmployeeCode,
    getFormttedDate,
    getDataForRunsheetPdf,
    getDataForManifestPdf,
    getDataForAwbPdf,
    readEjs
}