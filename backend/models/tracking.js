const mongoose = require('mongoose');
const trackingSchema = new mongoose.Schema({
    status:String,
    vendor:{ type: mongoose.Types.ObjectId, ref:"Vendor"},
    deliveryBoy:{type:String}
})

const Tracking = mongoose.model("Tracking",trackingSchema)
module.exports = Tracking