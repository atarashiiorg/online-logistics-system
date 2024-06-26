const Zone = require("../models/zone")

async function createZone(req,res){
    try {
        const zone = await Zone.create(req.body)
        res.status(201).json({'msg':'success',data:zone})
    } catch(err) {
        res.status(500).json({'err':err})
    }
}

async function getZone(req,res){
    try{
        if(req.query.zoneId){
            const zone = await Zone.find({})
        }
        const zones = await Zone.find()
        res.status(200).json({'msg':'success',data:zones})
    } catch(err) {
        res.status(500).json({'err':err})
    }
}

async function updateZone(req,res){
    try {
        const newZone = await Zone.findOneAndUpdate({_id:req.query.zid},{...req.body},{new:true})
        res.status(200).json({'msg':'success',data:newZone})
    } catch (error) {
        res.status(500).json({'err':error})
    }
}

module.exports = {
    createZone,
    getZone,
    updateZone
}