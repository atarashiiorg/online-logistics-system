const mongoose = require('mongoose')
const shipmentSchema = new mongoose.Schema({
    origin: {
        type:mongoose.Types.ObjectId,
        ref:"Destination"
    },
    destination: {
        type:mongoose.Types.ObjectId,
        ref:"Destination"
    },
    mode: String,
    customerType: String,
    isOda: Boolean,
    odaAmount:{
        type:Number,
        default:0
    },
    totalBoxes: Number,
    actualWeight: Number,
    totalDimensionalWeight: Number,
    totalActualWeight: Number,
    totalChargeWeight: Number,
},{
    timestamps:true
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment
