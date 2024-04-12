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
    getBooking,
    getBookingForDRSStatusUpdate
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
const {
    getUserData
} = require("../services/helpers")
const {
    hasToken,
    isMethodPemitted
} = require("../middlewares/authmwares")
const Employee = require("../models/employee")
const { updatePassword } = require("../controllers/selfControllers")
const userRoutes = require("express")()



userRoutes.get("/checklogin", hasToken, async (req, res) => {
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

userRoutes.use("/shipper", hasToken)
userRoutes.route("/shipper")
    .get(getShippers)
    .post(sendShipperForPrinting)
    .patch(updateShipper)


userRoutes.route("/issueshippertobranch")
    .all(hasToken)
    .post(shipperIssueToBranch)

userRoutes.route("/booking")
    .all(hasToken)
    .get((req,res)=>{
        if(req.query.drsentry){
            getBookingForDRSStatusUpdate(req,res)
        } else {
            getBooking(req,res)
        }
    })
    .post(createBooking)

userRoutes.route("/track")
    .all(hasToken)
    .get(trackAwb)

userRoutes.route("/awb")
    .all(hasToken)
    .get(getAwb)

userRoutes.route("/branch")
    .all(hasToken)
    .post(createBranch)
    .get(getBranches)
    .patch(updateBranch)
    .delete(deleteBranch)

userRoutes.route("/client")
    .all(hasToken)
    .post(createClient)
    .get(getClients)
    .delete(deleteClient)
    .patch(updateClient)

userRoutes.route("/employee")
    .all(hasToken)
    .get(getEmployee)
    .post(createEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee)
    .put(updateAccess)

userRoutes.route("/vendor")
    .all(hasToken)
    .get(getVendors)
    .post(createVendor)
    .patch(updateVendor)
    .delete(deleteVendor)

userRoutes.route("/manifest")
    .all(hasToken)
    .post(createManifest)
    .get(getManifests)
    .patch(receiveManifest)

userRoutes.route("/runsheet")
    .all(hasToken)
    .get(getRunsheets)
    .post(createRunsheet)

userRoutes.route("/state")
    .all(hasToken)
    .get(getState)
    .post(createState)
    .patch(updateState)

userRoutes.route("/zone")
    .all(hasToken)
    .get(getZone)
    .post(createZone)
    .patch(updateZone)

userRoutes.route("/dest")
    .all(hasToken)
    .get(getDestination)
    .post(createDestination)
    .patch(updateDestination)

userRoutes.route("/self")
.all(hasToken)
.patch(updatePassword)

module.exports = userRoutes