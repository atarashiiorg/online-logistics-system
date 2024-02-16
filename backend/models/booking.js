const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    docketNumber: String,
    bookingDate: Date,
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
    shipment: { type: Schema.Types.ObjectId, ref: 'Shipment' },
    // Other booking-specific fields
});

module.exports = mongoose.model('Booking', bookingSchema);
