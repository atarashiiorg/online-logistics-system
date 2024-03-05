const Vendor = require("../models/vendor");
const { getNewVendorCode } = require("../services/helpers");

async function createVendor(req,res){
 try {
    const vendorCode = await getNewVendorCode()
    const result = await Vendor.create({...req.body, vendorCode})
    if(result)
        res.status(201).json(result)
    else
        res.status(304).json({'msg':'something went wrong'})
 } catch (err) {
    res.status(500).json({'err':err})
 }   
}

async function getVendors(req,res){
    try {
        const vendors = await Vendor.find()
        if(vendors){
            res.status(200).json(vendors)
        } else {
            res.status(304).json({'msg':'something went wrong'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({err})
    }
}

module.exports = {
    createVendor,
    getVendors
}