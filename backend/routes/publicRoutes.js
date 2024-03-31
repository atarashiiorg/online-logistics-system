const express = require("express")
const { getTrackingDetails } = require("../controllers/publicControllers")
const publicRoutes = express()
const PageAccess = require("../models/pageAccess")

publicRoutes.get("/track",getTrackingDetails)
publicRoutes.route("/api/permission")
.get(async(req,res)=>{
    const p = await PageAccess.find()
    res.json(p[0])
})
.post(async(req,res)=>{
    try {
        const p = await PageAccess.create({})
        console.log(p)
        res.status(200).json({'msg':'created'})
    } catch (error) {
        res.status(500).json({err:error.toString()})
    }
})

module.exports = publicRoutes