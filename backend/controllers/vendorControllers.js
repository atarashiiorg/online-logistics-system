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