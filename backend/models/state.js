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
        ref:"User"
    }
},{
    timestamps:true
})

const State = mongoose.model("State",stateSchema)
module.exports = State