const { 
    loginUser, 
    sendShipperForPrinting, 
    receiveShipperFromPrinting, 
    createBooking,
    createBranch,
    getBranches,
    shipperIssueToBranch,
    createClient,
} = require("../controllers/userControllers")
const userRoutes = require("express")()

userRoutes.post("/login", loginUser)

userRoutes.route("/sendshipper")
.get(receiveShipperFromPrinting)
.post(sendShipperForPrinting)

userRoutes.route("/issueshippertobranch")
.post(shipperIssueToBranch)

userRoutes.route("/bookingentry")
.post(createBooking)

userRoutes.route("/track") 

userRoutes.route("/branch")
.post(createBranch)
.get(getBranches)

userRoutes.route("/client")
.post(createClient)

module.exports = userRoutes