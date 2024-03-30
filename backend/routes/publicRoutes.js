const express = require("express")
const { getTrackingDetails } = require("../controllers/publicControllers")
const publicRoutes = express()
const Permission = require("../models/permisssion")

publicRoutes.get("/track",getTrackingDetails)
publicRoutes.route("/api/permission")
.get(async(req,res)=>{
    const p = await Permission.findById('660801efd04c480e6233401b')
    res.json(p)
})
.post(async(req,res)=>{
    try {
        const p = await Permission.create({})
        console.log(p)
        res.status(200).json({'msg':'created'})
    } catch (error) {
        res.status(500).json({err:error.toString()})
    }
})

module.exports = publicRoutes