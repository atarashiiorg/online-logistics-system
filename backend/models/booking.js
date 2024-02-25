const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    docketNumber: {
        type: String,
        unique: true
    },
    bookingDate: Date,
    client: { type: mongoose.Types.ObjectId, ref: 'Client' },
    invoice: { type: mongoose.Types.ObjectId, ref: 'Invoice' },
    shipment: { type: mongoose.Types.ObjectId, ref: 'Shipment' },
    consignorConsignee: { type: mongoose.Types.ObjectId, ref: "ConsignorConsignee" }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking
