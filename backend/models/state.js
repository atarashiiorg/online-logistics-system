const mongoose = require('mongoose');
const stateSchema = new mongoose.Schema({
    stateCode:String,
    stateName:String,
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
    }
},{
    timestamps:true
})

const State = mongoose.model("State",stateSchema)
module.exports = State