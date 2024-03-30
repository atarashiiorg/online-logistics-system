const { createManifest, getManifests, receiveManifest } = require("../controllers/manifestControllers")
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
    getRunsheets, createRunsheet
} = require("../controllers/runsheetControllers")
const {
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeControllers")
const { getAwb } = require("../controllers/awbControllers")
const { getDataForManifestPdf, getDataForRunsheetPdf, getDataForAwbPdf } = require("../services/helpers")
const userRoutes = require("express")()

const authorize = (req, res, next) => {
    try {
        const token = req.cookies.token
        // if(!token){
        //     res.status(401).json({msg:"Unauthorised access"})
        //     return
        // }
        // const decodedToken = jwt.verify(token,process.env.JWT_KEY)
        // console.log(decodedToken)
        next()
    } catch (error) {
        console.log("authorize error->",error)
        res.status(401).json({ "msg": 'invalid token or token not found' })
    }
}

userRoutes.get("/pdf",async(req,res)=>{
    console.log(req.query)
    let data;
    if(req.query.template=="manifest"){
        data = await getDataForManifestPdf(req.query.mid)
    } else if(req.query.template=="runsheet"){
        data = await getDataForRunsheetPdf(req.query.rid)
    } else if(req.query.template=="docket"){
        data = await getDataForAwbPdf({docketNumber:{$in:req.query.doc.split(",")}})
        // data = data[0]
        // console.log(da/ta)
    }
    res.render(req.query.template,{bookings:data})
    return
})

userRoutes.post("/login", loginUser)

userRoutes.use("/shipper", authorize)
userRoutes.route("/shipper")
    .get(getShippers)
    .post(sendShipperForPrinting)
    .patch(updateShipper)

userRoutes.use("/issueshippertobranch", authorize)
userRoutes.route("/issueshippertobranch")
    .post(shipperIssueToBranch)

userRoutes.use("/booking", authorize)
userRoutes.route("/booking")
    .get(getBooking)
    .post(createBooking)

userRoutes.route("/track")
    .all(authorize)
    .get(trackAwb)

userRoutes.route("/awb")
.all(authorize)
.get(getAwb)

userRoutes.use("/branch", authorize)
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
    .patch(receiveManifest)

userRoutes.route("/runsheet")
    .all(authorize)
    .get(getRunsheets)
    .post(createRunsheet)

userRoutes.get("/run", async (req, res) => {
    
})

userRoutes.use("/state", authorize)
userRoutes.route("/state")
    .get(getState)
    .post(createState)
    .patch(updateState)

userRoutes.use("/zone", authorize)
userRoutes.route("/zone")
    .get(getZone)
    .post(createZone)
    .patch(updateZone)

userRoutes.use("/dest", authorize)
userRoutes.route("/dest")
    .get(getDestination)
    .post(createDestination)
    .patch(updateDestination)

module.exports = userRoutes