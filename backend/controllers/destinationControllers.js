const Destination = require("../models/destination")

async function createDestination(req, res) {
    try {
        const destination = await Destination.create(req.body)
        res.status(201).json({'msg':'success',data:destination})
    } catch (err) {
        res.status(500).json({'err':err})
    }
}

async function getDestination(req, res) {
    try {
        const dests = await Destination.find()
        res.status(200).json({'msg':'success',data:dests})
    } catch (err) {
        res.status(500).json({'err':err})
    }
}

module.exports = {
    createDestination,
    getDestination
}