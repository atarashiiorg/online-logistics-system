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
    remarks:String
})

const Shipper = mongoose.model("Shipper", shipperSchema)
module.exports = Shipper