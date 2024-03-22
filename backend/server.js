require("dotenv").config()
const express = require("express")
const server = express()
const cors = require("cors")
const db = require("./models/db")

server.use(cors({
    origin:["http://localhost:5173","https://z2nj0ph6-5173.inc1.devtunnels.ms","https://q31k0k2w-5173.inc1.devtunnels.ms"],
    exposedHeaders:['Content-Disposition']
}))
server.set('view engine','ejs')
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use((req,res,next)=>{
    console.log("url->",req.url);
    console.log("method->",req.method);
    console.log("body->",req.body);
    next()
})

const userRoutes = require("./routes/userRoutes")
const publicRoutes = require("./routes/publicRoutes")
server.use("/api",userRoutes)
server.use("/",publicRoutes)

db.init()
.then((err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log("connected to database");
    server.listen(8000,(err)=>{
        if(err){
            console.log(err);
        }
        console.log("server started successfully !");
    })
})