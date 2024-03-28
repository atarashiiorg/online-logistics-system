const Branch = require("../models/branch")
const Client = require("../models/client")
const Vendor = require("../models/vendor")
const ejs = require("ejs")
const path = require("path")
const pdf = require('html-pdf')
const Runsheet = require("../models/runsheet")
const Employee = require("../models/employee")
const convertHTMLToPDF = require("pdf-puppeteer")

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
        try {
            ejs.renderFile(`views/${template}.ejs`, data, (err, html) => {
                err ? reject(err) : resolve(html)
            })
        } catch (error) {
            reject(err)
        }
    })
}

function createPdfFromHtml(html){
    return new Promise((resolve, reject) => {
        convertHTMLToPDF(html, (pdf) => {
            resolve(pdf)
        }, { format: 'A4' }, {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    })
}

function getFormttedDate(date) {
    const inputDate = new Date(date);
    const day = inputDate.getDate();
    const month = inputDate.toLocaleString('default', { month: 'short' });
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
}

async function getDataForRunsheetPdf(runsheetObj) {
    try {
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
        let totalPcs = 0
        let totalWeight = 0
        let totalCash = 0
        let totalToPay = 0
        let totalCod = 0
        const dockets = runsheetObj.dockets.map(d => {
            totalPcs = parseInt(totalPcs)+parseInt(d?.booking?.shipment?.totalBoxes||0)
            totalWeight = (parseFloat(totalWeight)+parseFloat(d?.booking?.shipment?.totalChargeWeight||0)).toFixed(2)
            totalCash = (parseFloat(totalCash)+parseFloat(d?.booking?.invoice?.codAmount||0)).toFixed(2)
            totalCod = (parseFloat(totalCod)+parseFloat(d?.booking?.invoice?.codAmount || 0)).toFixed(2)
            totalToPay = (parseFloat(totalToPay)+parseFloat(d?.booking?.invoice?.amountToPay || 0)).toFixed(2)
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
        runsheet = {...runsheet,dockets, totalToPay, totalCash,totalCod, totalPcs, totalWeight}
       return runsheet
    } catch (err) {
        throw err
    }
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
    readEjs
}