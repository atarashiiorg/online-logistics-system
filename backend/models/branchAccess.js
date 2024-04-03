const mongoose = require("mongoose")
const branchAccessSchema = new mongoose.Schema({
    eCode: String,
    access: [
        {
            branch: {
                type: mongoose.Types.ObjectId,
                ref: "Branch"
            }
        }
    ]
})

const BranchAccess = mongoose.model("BranchAccess", branchAccessSchema)
module.exports = BranchAccess