const mongoose = require('mongoose');

const runsheetSchema = new mongoose.Schema({
    runsheetNumber: {
        type: Number,
        unique: true
    },
    branch:{
        type:mongoose.Types.ObjectId,
        ref:"Branch"
    },
    date: Date,
    mobile: String,
    employee: {
        type: mongoose.Types.ObjectId,
        ref: "Employee"
    },
    date: Date,
    vendorType: String,
    vendor: {
        type: mongoose.Types.ObjectId,
        ref: "Vendor"
    },
    vehicleNumber: String,
    driver: String,
    area: String,
    dockets: [
        {
            booking: {
                type: mongoose.Types.ObjectId,
                ref: "Booking"
            }
        }],
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    }
}, {
    timestamps: true
})

const Runsheet = mongoose.model("Runsheet", runsheetSchema)

module.exports = Runsheet