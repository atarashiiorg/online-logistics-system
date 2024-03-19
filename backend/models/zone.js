const mongoose = require("mongoose")

const zoneSchema = new mongoose.Schema({
    zoneCode:String,
    zoneName:String,
    isActive:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Zone = mongoose.model("Zone",zoneSchema)
module.exports = Zone