const mongoose = require('mongoose');

const manifestSchema = new mongoose.Schema({
    manifestNumber: String,
    manifestDate: Date,
    mode: String,
    destination: { type: mongoose.Types.ObjectId, ref: "Destination" },
    fromBCode: { type: mongoose.Types.ObjectId, ref: "Branch" },
    toBCode: { type: mongoose.Types.ObjectId, ref: "Branch" },
    vendor: { type: mongoose.Types.ObjectId, ref: "Vendor" },
    dockets: [
        {
            booking:{
                type:mongoose.Types.ObjectId,
                ref:"Booking"
            }
        }
    ],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    isReceived:{
        type:Boolean,
        default:false
    },
    isPrinted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

const Manifest = mongoose.model("Manifest", manifestSchema)
module.exports = Manifest