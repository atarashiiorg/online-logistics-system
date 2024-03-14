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
        res.status(500).json({'err':err})
    }
}

async function deleteClient(req,res){
    try{
        const result = await Client.deleteOne({_id:req.query.cid})
        if(result.deletedCount>0){
            res.status(200).json({'msg':'success'})
        } else {
            res.status(403).json({'msg':'not deleted'})
        }
    } catch(err){
        res.status(500).json({'err':err})
    }
}

async function updateClient(req,res){
    try {
        let data = {...req.body}
        delete data._id
        delete data.__v
        delete data.createdAt
        delete data.updatedAt
        const client = await Client.findOneAndUpdate({_id:req.query.cid},{...data},{new:true})
        res.status(200).json({'msg':'update success',client})
    } catch (error) {
        res.status(500).json({'err':error})
    }   
}

module.exports = {
    createClient,
    getClients,
    deleteClient,
    updateClient
}