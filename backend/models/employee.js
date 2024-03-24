const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    eCode:String,
    name:String,
    role:{
        type:String,
        default:"emp"
    },
    address:String,
    mobile:String,
    email:String,
    isActive:{
        type:Boolean,
        default:false
    },
    password:String
},{
    timestamps:true
})

const Employee = mongoose.model("Employee",employeeSchema)
module.exports = Employee