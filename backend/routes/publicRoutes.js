const express = require("express")
const { getTrackingDetails } = require("../controllers/publicControllers")
const publicRoutes = express()
const fs = require("fs")
const path = require("path")
const PageAccess = require("../models/pageAccess")
const Tracking = require("../models/tracking")

publicRoutes.get("/track",getTrackingDetails)

publicRoutes.get("/testimonials",(req,res)=>{
    try {
        const testimonials = fs.readFileSync(path.resolve("files/testimonials.json"),"utf-8")
        const data = JSON.parse(testimonials)
        res.status(200).json({msg:"success",data})
    } catch (error) {
        res.status(500).json({err:error.toString()})
    }
})

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

publicRoutes.get("/pod",async(req,res)=>{
    const tracking = await Tracking.findOne({docketNumber:req.query.docket}).populate("podImage")
    res.status(200).json(tracking)
})

module.exports = publicRoutes