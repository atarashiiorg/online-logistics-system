const mongoose = require('mongoose');

const manifestSchema = new mongoose.Schema({
    manifestNumber: String,
    manifestDate: Date,
    mode: String,
    branch: { type: mongoose.Types.ObjectId, ref: "Branch" },
    destination: String,
    vendor: { type: mongoose.Types.ObjectId, ref: "Vendor" },
    dockets: [
        {
            docketNumber: String,
            date: Date,
            origin: String,
            client: String,
            destination: String,
            consignee: String,
            pieces: Number,
            weight: Number,
            toPay: Number,
            cod: Number
        }
    ]
}, {
    timestamps: true
})

const Manifest = mongoose.model("Manifest", manifestSchema)
module.exports = Manifest