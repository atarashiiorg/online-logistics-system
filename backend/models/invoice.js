const mongoose = require('mongoose')
const invoiceSchema = new Schema({
    invoiceNumber: String,
    invoiceValue: Number,
    billingAt: String,
    ewayBillNumber: String,
    itemContent: String,
    bookingType: String,
    amountToPay: Number,
    odaCharges: Number,
    codAmount: Number,
    // Other invoice-related fields
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice
