const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    clientCode: String,
    tinNo: String,
    clientName: String,
    introDate: Date,
    branchName: {
        type: mongoose.Types.ObjectId,
        ref: "Branch"
    },
    group: String,
    contactPerson: String,
    billPrefix: String,
    Address: String,
    place: String,
    city: String,
    pinCode: String,
    state: String,
    email: String,
    autoEmails: {
        type: Array
    },
    phone: String,
    faxNo: String,
    emailTo: String,
    emailCC: String,
    gstNo: {
        type: String,
        default: "0"
    },
    panNo: {
        type: String,
        default: "0"
    },

    isGroup: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isShipperValid: {
        type: Boolean,
        default: false
    },
    isThirdPartyBilling: {
        type: Boolean,
        default: false
    },
    airMinWeight: Number,
    trainMinWeight: Number,
    roadMinWeight: Number,
    minFovCharge: Number,
    fovPercentage: Number,
    fuelOn: String,
    taxNotApplicable: {
        type: Boolean,
        default: false
    },
    remarks: String,
    fovDetails: [
        {
            fovUpto: String,
            charge: {
                type: Number,
                default: 0
            }
        }
    ],
    fuelDetails: [
        {
            mode: String,
            bookingType: String,
            Service: String,
            charge: {
                type: Number,
                default: 0
            }
        }
    ],
    clientChargeDetails: [
        {
            chargeType: String,
            mode: String,
            fromWeight: Number,
            toWeight: Number,
            docketCharge: {
                type: Number,
                default: 0
            }
        }
    ],
    modeTypeDetails: [
        {
            modeType: String,
            serviceType: String,
            minWeight: Number
        }
    ],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "Employee"
    },
    lastModifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Employee"
    }
}, {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client
