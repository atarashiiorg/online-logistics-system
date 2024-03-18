const mongoose = require("mongoose")

const destinationSchema = new mongoose.Schema({
    country: String,
    destCode: String,
    state: {
        type: mongoose.Types.ObjectId,
        ref: "State"
    },
    destName: String,
    zone: { type: mongoose.Types.ObjectId, ref: "Zone" },
    destBranch: { type: mongoose.Types.ObjectId, ref: "Branch" },
    isActive: { type: Boolean, default: fasle },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Destination = mongoose.model("Destination", destinationSchema)
module.exports = Destination