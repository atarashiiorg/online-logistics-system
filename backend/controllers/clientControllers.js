const Client = require("../models/client");
const { getNewClientCode } = require("../services/helpers");

async function createClient(req,res){
    try {
        const clientCode = await getNewClientCode()
        const result = await Client.create({clientCode,...req.body.client})
        console.log(result);
        res.status(200).end()
    } catch (err){
        console.log(err);
        res.status(500).end()
    }
}

async function getClients(req,res){
    try {
        const result = await Client.find()
        const response = result.map(r=>{
            return {...r._doc,docketCharge:r?.clientChargeDetails[0]?.docketCharge||0}
        })
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).end()
    }
}

module.exports = {
    createClient,
    getClients
}