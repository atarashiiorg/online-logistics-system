const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    eCode: String,
    name: String,
    role: {
        type: String,
        default: "emp"
    },
    address: String,
    mobile: String,
    email: String,
    isActive: {
        type: Boolean,
        default: false
    },
    password: String,
    permissions: {
        branchAccess: {
            type: mongoose.Types.ObjectId,
            ref: "BranchAccess"
        },
        pageAccess: {
            type: mongoose.Types.ObjectId,
            ref: "PageAccess"
        }
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Employee'
    },
    lastModifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Employee'
    }
}, {
    timestamps: true
})

const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee