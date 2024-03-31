const Employee = require("../models/employee")
const { getNewEmployeeCode } = require("../services/helpers")
const bcrypt = require("bcrypt")
const BranchAccess = require("../models/branchAccess")
const PageAccess = require("../models/pageAccess")

async function createEmployee(req,res){
    try {
        const eCode = await getNewEmployeeCode()
        const plainPassword = req.body.password
        const branchAccess = await BranchAccess.create({})
        const pageAccess = await PageAccess.create({})
        const permissions = {
            branchAccess:branchAccess._id,
            pageAccess:pageAccess._id
        }
        bcrypt.hash(plainPassword, 10)
        .then(async function(hash) {
            const emp = await Employee.create({...req.body,eCode,password:hash,permissions})
            delete emp.password
            res.status(201).json({'msg':'success',data:emp})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}

async function updateEmployee(req,res){
    try{
        newEmp = {...req.body}
        delete newEmp?.createdAt
        delete newEmp?.updatedAt
        delete newEmp?._id
        delete newEmp?.__v
        const plainPass = req.body.password
        bcrypt.hash(plainPass, 10)
        .then(async function(hash) {
            const emp = await Employee.findOneAndUpdate({_id:req.query.eid},{...newEmp,password:hash},{new:true})
            delete emp?.password
            res.status(200).json({'msg':'success',data:emp})
        })
    } catch(err){
        res.status(500).json({err})
    }
}

async function deleteEmployee(req,res){
    try {
        const res = await Employee.deleteOne({_id:req.query.eid})
        if(res.deletedCount>0)
            res.status(200).json({'msg':'success'})
        else 
            res.status(403).json({'msg':"employee not deleted"})
    } catch (err) {
        res.status(500).json({err})
    }
}

async function getEmployee(req,res){
    try {
        let employees;
        if(req.query.role=="dlb"){
            employees = await Employee.find({role:"dlb"})
        } if(req.query.role=="emp"){
            employees = await Employee.find({role:"emp"})
        } else {
            employees = await Employee.find({role:{$nin:['adm']}})
        }
        
        const data = await employees.map(e=>{return {...e._doc,password:""}})
        res.status(200).json({'msg':'success',data})
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}

module.exports = {
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee
}
