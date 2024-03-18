const { createManifest, getManifests } = require("../controllers/manifestControllers")
const { 
    loginUser, 
    trackAwb,
} = require("../controllers/userControllers")
const {
    createBranch, 
    getBranches,
    updateBranch,
    deleteBranch
} = require("../controllers/branchControllers")
const {
    createClient,
    getClients,
    deleteClient,
    updateClient
} = require("../controllers/clientControllers")
const jwt = require("jsonwebtoken")
const { 
    createVendor, 
    getVendors, 
    deleteVendor,
    updateVendor
} = require("../controllers/vendorControllers")
const { 
    receiveShipperFromPrinting, 
    sendShipperForPrinting,
    shipperIssueToBranch
} = require("../controllers/shipperControllers")

const {
    createBooking, getBooking
} = require("../controllers/bookingControllers")
const { 
    createState,
    getState
} = require("../controllers/stateControllers")
const { getZone, createZone } = require("../controllers/zoneControllers")

const userRoutes = require("express")()

const authorize = (req,res,next)=>{
    try {
        next()
    } catch (error) {
        res.status(401).json({"msg":'invalid token or token not found'})
    }
}

userRoutes.post("/login", loginUser)

userRoutes.use("/sendshipper",authorize)
userRoutes.route("/sendshipper")
.get(receiveShipperFromPrinting)
.post(sendShipperForPrinting)

userRoutes.use("/issueshippertobranch", authorize)
userRoutes.route("/issueshippertobranch")
.post(shipperIssueToBranch)

userRoutes.use("/booking",authorize)
userRoutes.route("/booking")
.get(getBooking)
.post(createBooking)

userRoutes.route("/track")
.get(trackAwb)

userRoutes.use("/branch",authorize)
userRoutes.route("/branch")
.post(createBranch)
.get(getBranches)
.patch(updateBranch)
.delete(deleteBranch)

userRoutes.use("/client", authorize)
userRoutes.route("/client")
.post(createClient)
.get(getClients)
.delete(deleteClient)
.patch(updateClient)

userRoutes.use("/vendor", authorize)
userRoutes.route("/vendor")
.get(getVendors)
.post(createVendor)
.patch(updateVendor)
.delete(deleteVendor)

userRoutes.use("/manifest", authorize)
userRoutes.route("/manifest")
.post(createManifest)
.get(getManifests)

userRoutes.use("/state",authorize)
userRoutes.route("/state")
.get(getState)
.post(createState)

userRoutes.use("/zone",authorize)
userRoutes.route("/zone")
.get(getZone)
.post(createZone)

userRoutes.use("/dest",authorize)
userRoutes.route("/dest")
.get()
.post()

module.exports = userRoutes