const mongoose = require('mongoose')
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: String,
    invoiceValue: {
        type:Number,
        default:0.0
    },
    client:{
        type:mongoose.Types.ObjectId,
        ref:"Client"
    },
    clientName:String,
    billingAt: String,
    ewayBillNumber: String,
    itemContent: String,
    bookingType: String,
    amountToPay: {
        type:Number,
        default:0.0
    },
    odaCharges: {
        type:Number,
        default:0.0
    },
    codType:String,
    codAmount: {
        type:Number,
        default:0.0
    }
},{
    timestamps:true
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice
