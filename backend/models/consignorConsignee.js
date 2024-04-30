const mongoose = require('mongoose');
const consignorConsigneeSchema = new mongoose.Schema({
    consignor:String,
    consignorContact:String,
    consignorAddress:String,
    consignee:String,
    consigneeAddress:String,
    consigneeContact:String
},{
    timestamps:true
})

const ConsignorConsignee = mongoose.model("ConsignorConsignee",consignorConsigneeSchema)
module.exports = ConsignorConsignee