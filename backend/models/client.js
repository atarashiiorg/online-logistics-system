const mongoose = require('mongoose')
const clientSchema = new Schema({
    clientName: String,
    // Other client-specific fields
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client
