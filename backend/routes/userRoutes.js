const { createManifest, getManifests } = require("../controllers/manifestControllers")
const path = require("path")
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
    getShippers, 
    sendShipperForPrinting,
    shipperIssueToBranch,
    updateShipper
} = require("../controllers/shipperControllers")

const {
    createBooking, getBooking
} = require("../controllers/bookingControllers")
const { 
    createState,
    getState,
    updateState
} = require("../controllers/stateControllers")
const { 
    getZone, 
    createZone, 
    updateZone 
} = require("../controllers/zoneControllers")
const { 
    getDestination, 
    createDestination, 
    updateDestination 
} = require("../controllers/destinationControllers")
const {
    getRunsheets
} = require("../controllers/drsControllers")
const { 
    getEmployee, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require("../controllers/employeeControllers")

const userRoutes = require("express")()

const authorize = (req,res,next)=>{
    try {
        next()
    } catch (error) {
        res.status(401).json({"msg":'invalid token or token not found'})
    }
}

userRoutes.post("/login", loginUser)

userRoutes.use("/shipper",authorize)
userRoutes.route("/shipper")
.get(getShippers)
.post(sendShipperForPrinting)
.patch(updateShipper)

userRoutes.use("/issueshippertobranch", authorize)
userRoutes.route("/issueshippertobranch")
.post(shipperIssueToBranch)

userRoutes.use("/booking",authorize)
userRoutes.route("/booking")
.get(getBooking)
.post(createBooking)

userRoutes.route("/track")
.all(authorize)
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

userRoutes.route("/employee")
.all(authorize)
.get(getEmployee)
.post(createEmployee)
.patch(updateEmployee)
.delete(deleteEmployee)

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

userRoutes.route("/runsheet")
.all(authorize)
.get(getRunsheets)

userRoutes.get("/run",(req,res)=>{
    res.sendFile(path.resolve("views/runsheet.html"))
})

userRoutes.use("/state",authorize)
userRoutes.route("/state")
.get(getState)
.post(createState)
.patch(updateState)

userRoutes.use("/zone",authorize)
userRoutes.route("/zone")
.get(getZone)
.post(createZone)
.patch(updateZone)

userRoutes.use("/dest",authorize)
userRoutes.route("/dest")
.get(getDestination)
.post(createDestination)
.patch(updateDestination)

module.exports = userRoutes