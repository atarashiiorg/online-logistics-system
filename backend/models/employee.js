const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    eCode:String,
    name:String,
    role:{
        type:String,
        default:"emp"//emp/adm/dlb/hm/bm
    },
    address:String,
    phone:String,
    email:String
},{
    timestamps:true
})

const Employee = mongoose.model("Employee",employeeSchema)