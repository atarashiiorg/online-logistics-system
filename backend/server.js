require("dotenv").config()
const express = require("express")
const server = express()
const cors = require("cors")
const db = require("./models/db")

server.use(cors({
    origin:"https://z2nj0ph6-5173.inc1.devtunnels.ms",
}))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use((req,res,next)=>{
    console.log("url->",req.url);
    console.log("method->",req.method);
    console.log("body->",req.body);
    next()
})

const userRoutes = require("./routes/userRoutes")
server.use("/",userRoutes)

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