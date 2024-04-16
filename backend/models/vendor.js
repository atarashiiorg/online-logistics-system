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
    panNumber:String,
    ownerPanName:String,
    isActive:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    },
    lastModifiedBy:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    }
},{
    timestamps:true
})

const Vendor = mongoose.model("Vendor",vendorSchema)
module.exports = Vendor