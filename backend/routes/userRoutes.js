const { 
    createManifest, 
    getManifests, 
    receiveManifest 
} = require("../controllers/manifestControllers")
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
    createBooking, 
    getBooking
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
    getRunsheets, 
    createRunsheet
} = require("../controllers/runsheetControllers")
const {
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    updateAccess
} = require("../controllers/employeeControllers")
const {
    getAwb
} = require("../controllers/awbControllers")

const BranchAccess = require("../models/branchAccess")
const Employee = require("../models/employee")
const jwt = require("jsonwebtoken")
const path = require("path")
const { getUserData } = require("../services/helpers")
const userRoutes = require("express")()

const authorize = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({ msg: "Unauthorised access" })
            return
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY)
        // const branchAccess = await BranchAccess.findOne({ eCode: decodedToken.eCode })
        // if (!branchAccess?.access?.includes(req?.query?.branch) && decodedToken.role != "adm") {
        //     res.status(401).json({ msg: 'unauthorised for this opertion' })
        //     return
        // } else if (req.query.role == "suadm") {
        //     next()
        // }
        req.token = { ...decodedToken }
        next()
    } catch (error) {
        console.log("authorize error->", error)
        res.status(401).json({ "msg": 'Session Expired. Log in again.' })
    }
}


userRoutes.get("/checklogin", authorize, async (req, res) => {
    try {
        console.log(req.token)
        if (req.token.isLoggedIn) {
            const user = await Employee.findOne({ _id: req.token._id, isActive: true })
                .populate({
                    path: "permissions",
                    populate: [{
                        path: "branchAccess",
                        populate: {
                            path: "access",
                            populate: {
                                path: "branch"
                            }
                        }
                    },
                    {
                        path: "pageAccess"
                    }]
                })
            const n_user = await getUserData(user)
            res.status(200).json({ msg: "success", data: n_user })
        }
    } catch (error) {
        res.status(500).json({ err: error.toString() })
    }
})

userRoutes.post("/login", loginUser)

userRoutes.get("/logout", (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ msg: "success" })
    } catch (error) {
        res.status(500).json({ err: error.toString() })
    }
})

userRoutes.use("/shipper", authorize)
userRoutes.route("/shipper")
    .get(getShippers)
    .post(sendShipperForPrinting)
    .patch(updateShipper)


userRoutes.route("/issueshippertobranch")
    .all(authorize)
    .post(shipperIssueToBranch)

userRoutes.route("/booking")
    .all(authorize)
    .get(getBooking)
    .post(createBooking)

userRoutes.route("/track")
    .all(authorize)
    .get(trackAwb)

userRoutes.route("/awb")
    .all(authorize)
    .get(getAwb)

userRoutes.route("/branch")
    .all(authorize)
    .post(createBranch)
    .get(getBranches)
    .patch(updateBranch)
    .delete(deleteBranch)

userRoutes.route("/client")
    .all(authorize)
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
    .put(updateAccess)

userRoutes.route("/vendor")
    .all(authorize)
    .get(getVendors)
    .post(createVendor)
    .patch(updateVendor)
    .delete(deleteVendor)

userRoutes.route("/manifest")
    .all(authorize)
    .post(createManifest)
    .get(getManifests)
    .patch(receiveManifest)

userRoutes.route("/runsheet")
    .all(authorize)
    .get(getRunsheets)
    .post(createRunsheet)

userRoutes.route("/state")
    .all(authorize)
    .get(getState)
    .post(createState)
    .patch(updateState)

userRoutes.route("/zone")
    .all(authorize)
    .get(getZone)
    .post(createZone)
    .patch(updateZone)

userRoutes.route("/dest")
    .all(authorize)
    .get(getDestination)
    .post(createDestination)
    .patch(updateDestination)

module.exports = userRoutes