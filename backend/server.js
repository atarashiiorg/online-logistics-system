require("dotenv").config()
const express = require("express")
const server = express()
const cors = require("cors")
const db = require("./models/db")
const cookieParser = require("cookie-parser")
const { consoleReq, limitReq } = require("./middlewares/mwares")

server.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:3000", "https://z2nj0ph6-5173.inc1.devtunnels.ms", "https://q31k0k2w-5173.inc1.devtunnels.ms"],
    exposedHeaders: ['Content-Disposition'],
    credentials: true
}))

server.set('view engine', 'ejs')
server.use(express.json({limit:'1mb'}))
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
// server.use()
server.use(limitReq)
server.use(consoleReq)
server.use(express.static("public/"))

const userRoutes = require("./routes/userRoutes")
const publicRoutes = require("./routes/publicRoutes")
server.use("/api", userRoutes)
server.use("/", publicRoutes)
server.use("/*", (req, res) => {
    res.status(403).json({ msg: 'forbidden' })
})

db.init()
    .then((err) => {
        if (err) {
            console.log(err);
            return
        }
        console.log("connected to database");
        server.listen(8000, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("server started successfully !");
        })
    })