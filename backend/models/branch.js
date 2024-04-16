const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchCode: {
        type: String,
        unique: true
    },
    emailId: String,
    branchName: String,
    place: String,
    contactPerson: String,
    phone: String,
    faxNo: String,
    address: String,
    city: String,
    pincode: String,
    zone: {
        type:mongoose.Types.ObjectId,
        ref:'Zone'
    },
    isHub: {
        type: Boolean,
        default: false
    },
    hubBranch: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    },
    allowedBooking: {
        road: {
            type: Boolean,
            default: false
        },
        train: {
            type: Boolean,
            default: false
        },
        air: {
            type: Boolean,
            default: false
        }
    },
    allowedDispatch: {
        road: {
            type: Boolean,
            default: false
        },
        train: {
            type: Boolean,
            default: false
        },
        air: {
            type: Boolean,
            default: false
        }
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'Employee'
    },
    lastModifiedBy:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    },
    shippers: [
        {
            docketFrom: Number,
            docketTo: Number,
            issueDate: Date,
            receivedBy: String
        }
    ]
}, {
    timestamps: true
})

const Branch = mongoose.model("Branch", branchSchema)
module.exports = Branch