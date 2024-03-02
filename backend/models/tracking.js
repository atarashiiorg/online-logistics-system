const mongoose = require('mongoose');
const trackingSchema = new mongoose.Schema({
    status:String,
    
})

const Tracking = mongoose.model("tracking",trackingSchema)
module.exports = Tracking