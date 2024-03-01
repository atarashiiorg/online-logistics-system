const User = require("../models/user")
const jwt = require("jsonwebtoken")
const Shipper = require("../models/shipper")
const Shipment = require("../models/shipment")
const Invoice = require("../models/invoice")
const Booking = require("../models/booking")
const ConsignorConsignee = require("../models/consignorConsignee")
const Branch = require("../models/branch")
const { getNewBranchCode, getNewClientCode } = require("../services/helpers")
const Client = require("../models/client")

async function loginUser(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username })
        console.log("user", user);
        if (!user) {
            res.status(404).end()
            return
        }
        if (user.password == req.body.password) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
            const nuser = { ...user._doc }
            delete nuser.password
            res.status(200).json({ user: nuser, token: token })
        } else {
            res.status(401).end()
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function sendShipperForPrinting(req, res) {
    try {
        const shippers = await Shipper.find({
            $or: [
                { docketFrom: { $gte: req.body.docketFrom } },
                { docketTo: { $gte: req.body.docketTo } }
            ]
        })
        if (shippers.length > 0) {
            res.status(409).end()
            return
        }
        const result = await Shipper.create({ ...req.body, branchCode: req.body.branch })
        if (result)
            res.status(200).end()
        else
            res.status(304).end()
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

async function receiveShipperFromPrinting(req, res) {
    try {
        const shippers = await Shipper.find({}).populate("branch")
        let response = []
        await shippers.forEach(s => {
            const branchCode = s.branch.branchCode
            const branchName = s.branch.branchName
            let obj = { ...s._doc }
            delete obj.branch
            obj = { branchCode, branchName, ...obj }
            response.push(obj)
        })
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function createBooking(req, res) {
    try {
        const docket = await Booking.findOne({ docketNumber: req.body.awbDetails.docketNumber })
        if (docket) {
            res.status(409).end()
            return
        }
        
        const invoice = await Invoice.create(req.body.billingDetails)
        const shipment = await Shipment.create({
            ...req.body.awbDetails,
            ...req.body.dimWeight,
            ...req.body.volWeight
        })
        const consignorConsignee = await ConsignorConsignee(req.body.consignorConsignee)
        console.log(consignorConsignee);
        const booking = await Booking.create({
            ...req.body.awbDetails,
            branch:req.body.branch,
            invoice: invoice._id,
            shipment: shipment._id,
            consignorConsignee: consignorConsignee._id
        })
        res.status(200).end()
    } catch (err) {
        if (err.code == 11000) {
            res.status(409).end()
            return
        }
        res.status(500).send(err)
        console.log(err);
    }
}

async function trackAwb(req, res) {
    try {
        const doc_num = req.query.docket
        const bookings = await Booking.findOne({docketNumber:doc_num})
        .populate("invoice")
        .populate("shipment")
        .populate("consignorConsignee")
        .populate("branch")
        if(bookings){
            res.status(200).json({used:true,bookings})
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
        console.log(docket)
        res.status(200).json({used:false,docket})
    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}

async function createBranch(req, res) {
    try {
        const branchCode = await getNewBranchCode()
        const result = await Branch.create({ branchCode, ...req.body })
        console.log(result);
        res.status(200).end()
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function getBranches(req, res) {
    try {
        const branches = await Branch.find()
        res.status(200).json(branches)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function shipperIssueToBranch(req, res) {
    try {
        const branchCode = req.body.issuedTo
        const docketFrom = req.body.docketFrom
        const docketTo = req.body.docketTo
        const issueDate = req.body.issueDate
        const receivedBy = req.body.receivedBy

        const branch = await Branch.find({
            shippers: {
                $elemMatch: {
                    $or: [
                        { docketFrom: { $lte: docketFrom } },
                        { docketTo: { $gte: docketTo } }
                    ]
                }
            }
        })

        if(branch.length>0){
            res.status(409).end()
            return
        }

        const result = await Branch.updateOne(
            { branchCode },
            {
                $push: {
                    shippers: {
                        docketFrom,
                        docketTo,
                        issueDate,
                        receivedBy
                    }
                }
            }
        )
        
        if (result.modifiedCount > 0) {
            res.status(200).end()
            return
        }
        res.status(304).end()
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function createClient(req,res){
    try {
        const clientCode = await getNewClientCode()
        const result = await Client.create({clientCode,...req.body.client})
        console.log(result);
        res.status(200).end()
    } catch (err){
        console.log(err);
        res.status(500).end()
    }
}

async function getClients(req,res){
    try {
        const result = await Client.find()
        const response = result.map(r=>{
            return {...r._doc,docketCharge:r?.clientChargeDetails[0]?.docketCharge||0}
        })
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).end()
    }
}

module.exports = {
    loginUser,
    sendShipperForPrinting,
    receiveShipperFromPrinting,
    createBooking,
    createBranch,
    getBranches,
    shipperIssueToBranch,
    createClient,
    getClients,
    trackAwb
}