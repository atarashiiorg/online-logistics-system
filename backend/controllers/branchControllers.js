const Branch = require("../models/branch");
const { getNewBranchCode } = require("../services/helpers");

async function createBranch(req, res) {
    try {
        const branchCode = await getNewBranchCode()
        const result = await Branch.create({ branchCode, ...req.body })
        console.log(result);
        res.status(200).end()
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function getBranches(req, res) {
    try {
        const branches = await Branch.find()
        res.status(200).json(branches)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports = {
    createBranch,
    getBranches
}