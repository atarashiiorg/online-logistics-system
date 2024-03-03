const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    vendorCode:{
        type:String,
        unique:true
    },
    vehicleNumber:String,
    vehicleType:String,
    chasisNumber:String,
    engineNumber:String,
    rcNumber:String,
    vehiclePermit:String,
    insuranceValidity:String,
    fitnessValidity:String,
    insuranceCompanyName:String,
    ownerName:String,
    panNo:String,
    ownerPanName:String,
    isActive:{
        type:Boolean,
        default:false
    }
})

const Vendor = mongoose.model("Vendor",vendorSchema)
module.exports = Vendor