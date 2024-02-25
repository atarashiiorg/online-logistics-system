const mongoose = require('mongoose');
const consignorConsigneeSchema = new mongoose.Schema({
    consignor:String,
    consignee:String,
    consigneeAddress:String,
    consigneeContact:String
})

const ConsignorConsignee = mongoose.model("ConsignorConsignee",consignorConsigneeSchema)
module.exports = ConsignorConsignee