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

module.exports = {
    createZone,
    getZone
}