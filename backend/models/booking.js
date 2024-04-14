const mongoose = require('mongoose');
const Branch = require('./branch')
const Client = require('./client')
const Invoice = require('./client')
const Shipment = require('./client')
const ConsignorConsignee = require('./consignorConsignee')
const Tracking = require('./tracking')

const bookingSchema = new mongoose.Schema({
    docketNumber: {
        type: String,
        unique: true
    },
    bookingDate: Date,
    branch:{ type: mongoose.Types.ObjectId, ref: 'Branch' },
    client: { type: mongoose.Types.ObjectId, ref: 'Client' },
    invoice: { type: mongoose.Types.ObjectId, ref: 'Invoice' },
    shipment: { type: mongoose.Types.ObjectId, ref: 'Shipment' },
    consignorConsignee: { type: mongoose.Types.ObjectId, ref: "ConsignorConsignee" },
    tracking: { type: mongoose.Types.ObjectId, ref: "Tracking" }
},{
    timestamps:true
});

bookingSchema.pre('findOneAndDelete', { document: true }, async function (next) {
    const booking = this;
    
    // Create a new session
    const session = await startSession();
    session.startTransaction();
    
    try {
        // Delete referenced documents within the transaction
        await Promise.all([
            Branch.findByIdAndDelete(booking.branch, { session }),
            Client.findByIdAndDelete(booking.client, { session }),
            Invoice.findByIdAndDelete(booking.invoice, { session }),
            Shipment.findByIdAndDelete(booking.shipment, { session }),
            ConsignorConsignee.findByIdAndDelete(booking.consignorConsignee, { session }),
            Tracking.findByIdAndDelete(booking.tracking, { session })
        ]);
        
        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        // If there's an error, abort the transaction and pass it to the next middleware/hook
        await session.abortTransaction();
        session.endSession();
        console.error('Error deleting referenced documents:', error);
        return next(error);
    }

    // If everything is successful, proceed with the deletion of the booking document
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking
