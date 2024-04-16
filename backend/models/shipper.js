const mongoose = require('mongoose')
const shipperSchema = new mongoose.Schema({
    branch:{
        type:mongoose.Types.ObjectId,
        ref:"Branch"
    },
    date:String,
    docketFrom:Number,
    docketTo:Number,
    sendBy:String,
    isReceived:{
        type:Boolean,
        default:false
    },
    remarks:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    }
},{
    timestamps:true
})

const Shipper = mongoose.model("Shipper", shipperSchema)
module.exports = Shipper