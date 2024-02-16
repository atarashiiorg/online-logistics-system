const mongoose = require('mongoose')
const shipmentSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    mode: String,
    customerType: String,
    isOda: Boolean,
    consignor: String,
    consignee: String,
    consigneeContact: String,
    consigneeAddress: String,
    totalBoxes: Number,
    actualWeight: Number,
    totalDimensionalWeight: Number,
    totalActualWeight: Number,
    totalChargeWeight: Number,
    // Other shipment-related fields
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment
