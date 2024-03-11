const Branch = require("../models/branch")
const Client = require("../models/client")
const Vendor = require("../models/vendor")
const ejs = require("ejs")
const path = require("path")
const pdf = require('html-pdf')

const getNewBranchCode = async () => {
    const branch = await Branch.findOne({}).sort({ 'createdAt': -1 })
    if (branch) {
        const bCode = branch.branchCode.substring(1, branch.branchCode.length)
        return `B${Number(bCode) + 1}`
    } else {
        return "B1001"
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

const getManifestName = () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()
    const now = Date.now()
    const name = "Manifest_" + year + "_" + month + "_" + date + "_" + now
    return name
}

function generateManifestPdf(data, filename) {
    return new Promise(async(resolve, reject) => {
        try {
            const html = await readEjs(data)
            const pdf = await createPdfFromHtml(filename,html)
            resolve(pdf)
        } catch (error) {
            reject(error)
        }
    })
    // try {
    //     ejs.renderFile(path.resolve('views/manifest.ejs'), data, function (err, html) {
    //         if (err) {
    //             throw err;
    //         }
    //         var options = {
    //             format: "Letter",
    //         }
    //         pdf.create(html, options).toFile('files/' + filename + '.pdf', function (err, name) {
    //             if (err) {
    //                 throw err
    //             } else {
    //                 cb(null, 'files/'+filename+'.pdf')
    //             }
    //         });
    //     });
    // } catch (error) {
    //     cb(error,null)
    // }
}

function readEjs(data){
    return new Promise((resolve, reject) => {
        try {
            ejs.renderFile("views/manifest.ejs",data,(err,html)=>{
                err?reject(err):resolve(html)
            })
        } catch (error) {
            reject(err)
        }
    })
}

function createPdfFromHtml(filename, html){
    return new Promise((resolve, reject) => {
        try {
            var options = {
                format: "Letter",
            }
            pdf.create(html,options).toFile("files/"+filename+".pdf",(err,name)=>{
                err?reject(err):resolve("files/"+filename+".pdf")
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getNewBranchCode,
    getNewClientCode,
    getNewVendorCode,
    getManifestName,
    generateManifestPdf
}