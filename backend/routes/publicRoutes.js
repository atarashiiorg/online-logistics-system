const express = require("express")
const { getTrackingDetails } = require("../controllers/publicControllers")
const publicRoutes = express()
const fs = require("fs")
const path = require("path")
const PageAccess = require("../models/pageAccess")

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

module.exports = publicRoutes