const State = require("../models/state")

async function createState(req,res){
    try{
        const state = await State.create(req.body)
        if(state){
            res.status(201).json({'msg':'success', data:state})
        } else {
            res.status(403).json({'msg':'state is not created'})
        }
    } catch(err){
        res.status(500).json({'err':err})
    }
}

async function getState(req,res){
    try{    
        const states = await State.find()
        res.status(200).json({'msg':'success',data:states})
    } catch(err){
        res.status(500).json({'err':err})
    }
}

async function updateState(req,res){
    try {
        const newState = await State.findOneAndUpdate({_id:req.query.sid},{...req.body},{new:true})
        res.status(200).json({'msg':'success',data:newState})
    } catch (error) {
        res.status(500).json({'err':error})
    }
}

module.exports = {
    createState,
    getState,
    updateState
}