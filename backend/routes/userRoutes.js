const { createManifest, getManifests } = require("../controllers/manifestControllers")
const path = require("path")
const { 
    loginUser, 
    createBooking,
    shipperIssueToBranch,
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
    sendShipperForPrinting 
} = require("../controllers/shipperControllers")

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

userRoutes.get("/run",(req,res)=>{
    res.sendFile(path.resolve("views/runsheet.html"))
})
module.exports = userRoutes