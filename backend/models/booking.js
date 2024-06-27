const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    docketNumber: {
        type: String,
        unique: true
    },
    isThirdParty:{
        type:Boolean,
        default:false
    },
    bookingDate: Date,
    branch:{ type: mongoose.Types.ObjectId, ref: 'Branch' },
    client: { type: mongoose.Types.ObjectId, ref: 'Client' },
    invoice: { type: mongoose.Types.ObjectId, ref: 'Invoice' },
    shipment: { type: mongoose.Types.ObjectId, ref: 'Shipment' },
    consignorConsignee: { type: mongoose.Types.ObjectId, ref: "ConsignorConsignee" },
    tracking: { type: mongoose.Types.ObjectId, ref: "Tracking" },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'Employee'
    }
},{
    timestamps:true
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking
