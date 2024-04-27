const Runsheet = require('../models/runsheet')
const Tracking = require('../models/tracking')

async function getDeliveries(req,res){
    try {
        const runsheets = await Runsheet.find({employee:req.token._id})
        res.status(200).json({msg:"success",data:[]})
    } catch (err) {
        console.log(err)
        res.status(500).json({err:err.toString()})
    }
}

async function markDelivered(req,res){
    try {
        
    } catch (err) {
        
    }
}

module.exports = {
    getDeliveries,
    markDelivered
}