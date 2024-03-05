const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    password:String,
    mobile:{
        type:String,
        default:""
    },
    email:{
        type:String,
        unique:true
    },
    name:String,
    branchCode:{
        type:mongoose.Types.ObjectId,
        ref:"Branch"
    },
    role:{
        type:String,
        default:"employee"
    }
},{
    timestamps:true
})

const User = mongoose.model("user",userSchema)
module.exports = User