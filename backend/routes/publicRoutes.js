const express = require("express")
const { getTrackingDetails } = require("../controllers/publicControllers")
const publicRoutes = express()

publicRoutes.get("/track",getTrackingDetails)

module.exports = publicRoutes