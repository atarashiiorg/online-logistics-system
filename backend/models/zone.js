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
        ref:"Employee"
    },
    lastModifiedBy:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    },
},{
    timestamps:true
})

const Zone = mongoose.model("Zone",zoneSchema)
module.exports = Zone