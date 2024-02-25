const Branch = require("../models/branch")
const Client = require("../models/client")

const getNewBranchCode = async()=>{
    const branch = await Branch.findOne({}).sort({'createdAt':-1})
    if(branch){
        const bCode = branch.branchCode.substring(1,branch.branchCode.length)
        return `B${Number(bCode)+1}`
    } else {
        return "B1001"
    }
}

const getNewClientCode = async()=>{
    const client = await Client.findOne({}).sort({'createdAt':-1})
    if(client){
        const cCode = client.clientCode.substring(1,client.clientCode.length)
        return `C${Number(cCode)+1}`
    } else {
        return "C1001"
    }
}

module.exports = {
    getNewBranchCode,
    getNewClientCode
}