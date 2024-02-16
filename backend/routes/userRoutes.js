const { 
    loginUser,
} = require("../controllers/userControllers")
const userRoutes = require("express")()

userRoutes.post("/login", loginUser)

module.exports = userRoutes