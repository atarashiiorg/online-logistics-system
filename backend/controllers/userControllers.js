const jwt = require("jsonwebtoken")
const Booking = require("../models/booking")
const Branch = require("../models/branch")
const bcrypt = require("bcrypt")
const Employee = require("../models/employee")
const { getUserData } = require("../services/helpers")
const { getUser } = require("../services/dbServices")

async function loginUser(req, res) {
    try {
        const user = await getUser({email:req.body.username})
        console.log("user", user);
        if (!user) {
            res.status(404).json({ msg: "User not found" })
            return
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const token = jwt.sign({
                eCode: user.eCode,
                name:user.name,
                _id: user._id,
                role: user.role,
                isLoggedIn: true,
                eCode: user.eCode
            },
                process.env.JWT_KEY, { expiresIn: '5h' }
            )
            const n_user = await getUserData(user)
            res.cookie('token', token, {
                httpOnly: true,
                // secure:true, //recommended when using in production
                maxAge: 60 * 60 * 1000 * 5
            })
            res.status(200).json({ msg: "success", data: n_user })
        } else {
            res.status(401).json({ 'msg': 'invalid password' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'err': err })
    }
}

async function trackAwb(req, res) {
    try {
        const doc_num = req.query.docket
        const bookings = await Booking.findOne({ docketNumber: doc_num })
            .populate("invoice")
            .populate({
                path: "shipment",
                populate: [{ path: "origin" }, { path: "destination" }]
            })
            .populate("consignorConsignee")
            .populate("branch")
            .populate("client")
            .populate({
                path:"tracking",
                populate:[{path:"details",populate:{path:"actionBy",select:"name eCode"}}]
            })
            // .populate('details.actionBy', 'name eCode')

        if (bookings) {
            res.status(200).json({ used: true, valid: true, bookings, msg: 'success' })
            return
        }
        const docket = await Branch.find({
            shippers: {
                $elemMatch: {
                    $and: [
                        { docketFrom: { $lte: doc_num } },
                        { docketTo: { $gte: doc_num } }
                    ]
                }
            }
        })
        if (docket.length <= 0)
            res.status(200).json({ valid: false, used: false, docket, 'msg': 'docket is not valid' })
        else
            res.status(200).json({ valid: true, used: false, docket, 'msg': 'docket is valid but not yet booked' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'err': err })
    }
}


module.exports = {
    loginUser,
    trackAwb
}