const Employee = require("../models/employee")
const { getNewEmployeeCode } = require("../services/helpers")
const bcrypt = require("bcrypt")
const BranchAccess = require("../models/branchAccess")
const PageAccess = require("../models/pageAccess")

async function createEmployee(req, res) {
    try {
        const eCode = await getNewEmployeeCode()
        const plainPassword = req.body.password
        const branchAccess = await BranchAccess.create({ eCode })
        const pageAccess = await PageAccess.create({ eCode })
        const permissions = {
            branchAccess: branchAccess._id,
            pageAccess: pageAccess._id
        }
        bcrypt.hash(plainPassword, 10)
            .then(async function (hash) {
                const emp = await Employee.create({ ...req.body, eCode, password: hash, permissions, createdBy: req.token._id })
                delete emp.password
                res.status(201).json({ 'msg': 'success', data: emp })
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

async function updateEmployee(req, res) {
    try {
        newEmp = { ...req.body }
        delete newEmp?.createdAt
        delete newEmp?.updatedAt
        delete newEmp?._id
        delete newEmp?.__v
        const plainPass = req.body.password
        bcrypt.hash(plainPass, 10)
            .then(async function (hash) {
                const emp = await Employee.findOneAndUpdate({ _id: req.query.eid }, { ...newEmp, password: hash, lastModifiedBy: req.token._id }, { new: true })
                delete emp?.password
                res.status(200).json({ 'msg': 'success', data: emp })
            })
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function deleteEmployee(req, res) {
    try {
        const res = await Employee.deleteOne({ _id: req.query.eid })
        if (res.deletedCount > 0)
            res.status(200).json({ 'msg': 'success' })
        else
            res.status(403).json({ 'msg': "employee not deleted" })
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function getEmployee(req, res) {
    try {
        let employees;
        if (req.query.role == "dlb") {
            employees = await Employee.find({ role: "dlb" })
        }

        if (req.query.role == "emp") {
            employees = await Employee.find({ role: "emp" })
        }

        if (!req.query.role) {
            employees = await Employee.find({ role: { $nin: ['adm'] } })
                .populate({ path: "createdBy", select: 'name' })
                .populate({ path: "lastModifiedBy", select: 'name' })
        }

        if (req.query.eid && req.query.full == 'true') {
            employees = await Employee.find({ _id: req.query.eid })
                .populate({
                    path: 'permissions',
                    populate: [{ path: 'branchAccess' }, { path: 'pageAccess' }]
                })
            console.log("ye wala chla hai")
        }

        // if(req.query.all){
        //     employees = await Employee.find({role:{$nin:['adm']}})
        // }

        const data = await employees.map(e => { return { ...e._doc, password: "" } })
        res.status(200).json({ 'msg': 'success', data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

async function updateAccess(req, res) {
    try {
        const newPageAccess = await PageAccess.findOneAndUpdate({ _id: req.query.paxsid }, { access: req.body.pageAccess }, { new: true })
        const newBranchAccess = await BranchAccess.findOneAndUpdate({ _id: req.query.baxsid }, { access: req.body.branchAccess }, { new: true })
        console.log(newPageAccess)
        console.log(newBranchAccess)
        res.status(200).json({ msg: 'success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })
    }
}

module.exports = {
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee,
    updateAccess
}
