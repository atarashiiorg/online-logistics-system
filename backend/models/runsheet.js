const mongoose = require('mongoose');

const runsheetSchema = new mongoose.Schema({
    runsheetNumber:{
        type:Number,
        unique:true
    },
    mobile:String,
    employee:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    },
    date:Date,
    vendorType:String,
    vendor:{
        type:mongoose.Types.ObjectId,
        ref:"Vendor"
    },
    driver:String,
    area:String,
    booking:{
        type:mongoose.Types.ObjectId,
        ref:"Booking"
    }
},{
    timestamps:true
})

const Runsheet = mongoose.model("Runsheet",runsheetSchema)

module.exports = Runsheet