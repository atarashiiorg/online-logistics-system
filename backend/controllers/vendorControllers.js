const Vendor = require("../models/vendor");
const { getNewVendorCode } = require("../services/helpers");

async function createVendor(req,res){
 try {
    const vendorCode = await getNewVendorCode()
    const result = await Vendor.create({...req.body, vendorCode})
    console.log(result);
    if(result)
        res.status(201).json({'msg':'success',data:result})
    else
        res.status(304).json({'msg':'something went wrong'})
 } catch (err) {
    console.log(err);
    res.status(500).json({'err':err})
 }   
}

async function getVendors(req,res){
    try {
        const vendors = await Vendor.find()
        if(vendors){
            res.status(200).json({'msg':'success',data:vendors})
        } else {
            res.status(304).json({'msg':'something went wrong'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({err})
    }
}

async function deleteVendor(req,res){
    try {
        const result = await Vendor.deleteOne({_id:req.query.vid})
        if(result.deletedCount>0){
            res.status(200).json({'msg':'success'})
        } else {
            res.status(403).json({'msg':'failed to delete'})
        }
    } catch (error) {
        res.status(500).json({'err':error})
    }
}

async function updateVendor(req,res){
    try {
        let data = {...req.body}
        delete data?._id
        delete data?.__v
        delete data?.createdAt
        delete data?.updatedAt
        const result = await Vendor.findOneAndUpdate({_id:req.query.vid},{...data},{new:true})
        res.status(200).json({'msg':'success',data:result})
    } catch (err){
        res.status(500).json({'err':err})
    }
}
module.exports = {
    createVendor,
    getVendors,
    deleteVendor,
    updateVendor
}