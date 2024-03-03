const { 
    loginUser, 
    sendShipperForPrinting, 
    receiveShipperFromPrinting, 
    createBooking,
    createBranch,
    getBranches,
    shipperIssueToBranch,
    createClient,
    getClients,
    trackAwb,
} = require("../controllers/userControllers")
const jwt = require("jsonwebtoken")
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

userRoutes.use("/client", authorize)
userRoutes.route("/client")
.post(createClient)
.get(getClients)

userRoutes.use("/vendor", authorize)
userRoutes.route("/vendor")
.get()
.post()

module.exports = userRoutes