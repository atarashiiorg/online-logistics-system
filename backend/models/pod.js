const mongoose = require('mongoose');
const podSchema = mongoose.Schema({
    ETag: String,
    ServerSideEncryption: String,
    Location: String,
    key: String,
    Key: String,
    Bucket: String
},{
    timestamps:true
})

const POD = mongoose.model("POD",podSchema)
module.exports=POD
