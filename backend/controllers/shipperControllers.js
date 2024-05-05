const Booking = require("../models/booking");
const Branch = require("../models/branch");
const Shipper = require("../models/shipper");
const { getValidShipper } = require("../services/dbServices");

async function isDocketValid(docket) {
    try {
        const res_doc = await Branch.findOne({
            shippers: {
                $elemMatch: {
                    $and: [
                        { docketFrom: { $lte: docket } },
                        { docketTo: { $gte: docket } }
                    ]
                }
            }
        })
        if (res_doc) {
            return { valid: true, msg: docket + " is issued to " + res_doc.branchName + " branch", 'branch': res_doc }
        } else {
            return { valid: false, msg: docket + " is not valid or not issued to any branch" }
        }
    } catch (error) {
        return { valid: false, msg: 'error occured while checking valid' }
    }
}

async function isDocketBooked(docket) {
    try {
        const res_doc = await Booking.findOne({ docketNumber: docket })
        if (res_doc) {
            return { booked: true, 'msg': 'docket ' + docket + ' is booked' }
        } else {
            return { booked: false, 'msg': 'docket ' + docket + ' is not booked yet' }
        }
    } catch (error) {
        return { booked: false, 'msg': 'error occured while checking booked' }
    }
}

async function sendShipperForPrinting(req, res) {
    try {
        const docketFrom = req.body.docketFrom
        const docketTo = req.body.docketTo
        const shipper = await Shipper.findOne({
            $or:[
                {
                    docketFrom: {$lte: parseInt(docketFrom)},
                    docketTo: { $gte: parseInt(docketTo)}
                },
                {
                    docketFrom: {$lte: parseInt(docketTo)},
                    docketTo: { $gte: parseInt(docketFrom)}
                }
            ]
        })
        console.log(shipper)
        if (shipper) {
            res.status(409).json({ 'msg': 'this shipper series is already used' })
            return
        }
        const result = await Shipper.create({ ...req.body, branchCode: req.body.branch, createdBy: req.token._id })
        if (result)
            res.status(200).json({ 'msg': 'shipper created successfully' })
        else
            res.status(304).json({ 'msg': 'not modified' })
    } catch (error) {
        console.log("Error occured while sending shipper for printing:",error)
        res.status(500).json({ 'err': error.toString() })
    }
}

async function getShippers(req, res) {
    try {
        let shippers
        if (req.query.received) {
            shippers = await Shipper.find({ isReceived: true }).populate("branch")
        } else if(req.query.issued){
            const branches = await Branch.find({ 'shippers.0': { $exists: true } })
            const shippersWithBranchInfo = branches.reduce((acc, branch) => {
                branch.shippers.forEach(shipper => {
                    acc.push({
                        branchName: branch.branchName,
                        branchCode: branch.branchCode,
                        ...shipper._doc
                    });
                });
                return acc;
            }, []);
            res.status(200).json({msg:'success',data:shippersWithBranchInfo})
            return
        } if(req.query.used){
            const bookings = await Booking.find().populate("branch",'branchName branchCode').populate("createdBy",'name')
            res.status(200).json({msg:'success',data:bookings})
            return
        } else {
            shippers = await Shipper.find({ isReceived: false }).populate("branch")
        }
        let response = []
        await shippers.forEach(s => {
            const branchCode = s.branch.branchCode
            const branchName = s.branch.branchName
            let obj = { ...s._doc }
            delete obj.branch
            obj = { branchCode, branchName, ...obj }
            response.push(obj)
        })
        res.status(200).json({ 'data': response, 'msg': 'success' })
    } catch (err) {
        res.status(500).json({ 'err': err })
    }
}

async function shipperIssueToBranch(req, res) {
    try {
        const branchCode = req.body.issuedTo
        const docketFrom = req.body.docketFrom
        const docketTo = req.body.docketTo
        const issueDate = req.body.issueDate
        const receivedBy = req.body.receivedBy

        const isValid = await isShipperSeriesValid(docketFrom, docketTo)
        console.log("isValid", isValid)
        if (!isValid.valid) {
            res.status(403).json({ 'msg': isValid.msg })
            return
        }

        const isReceived = await isShipperReceived(docketFrom, docketTo)
        console.log("isReceived", isReceived)
        if (!isReceived.received) {
            res.status(403).json({ msg: isReceived.msg })
            return
        }

        const isIssued = await isShipperIssuedAlready(docketFrom, docketTo)
        console.log("isIssued", isIssued)

        if (isIssued.issued) {
            res.status(409).json({ 'msg': isIssued.msg })
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
            res.status(201).json({ 'msg': 'success' })
            return
        }
        res.status(304).end()
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'err': err.toString() })
    }
}


async function isShipperSeriesValid(docketFrom, docketTo) {
    try {
        const shipper = await getValidShipper(docketFrom, docketTo)
        if (shipper) {
            return { valid: true, 'msg': 'shipper is valid' }
        } else {
            return { valid: false, 'msg': 'shipper is not valid' }
        }
    } catch (error) {
        return { valid: false, 'msg': 'error occured while checking shipper valid' }
    }
}

async function isShipperReceived(docketFrom, docketTo) {
    try {
        const shipper = await getValidShipper(docketFrom, docketTo)
        if (shipper?.isReceived) {
            return { received: true, 'msg': 'shipper is Received' }
        } else {
            return { received: false, 'msg': 'shipper is not Received' }
        }
    } catch (error) {
        return { valid: false, 'msg': 'error occured while checking shipper receiving' }
    }
}


async function isShipperIssuedAlready(docketFrom, docketTo) {
    try {
        const branch = await Branch.findOne({
            shippers: {
                $elemMatch: {
                    $or:[
                        {
                            docketFrom: {$lte: parseInt(docketFrom)},
                            docketTo: { $gte: parseInt(docketTo)}
                        },
                        {
                            docketFrom: {$lte: parseInt(docketTo)},
                            docketTo: { $gte: parseInt(docketFrom)}
                        }
                    ]
                }
            }
        })
        if (branch) {
            return { issued: true, 'msg': 'shipper is series already issued', 'branch': branch }
        } else {
            return { issued: false, 'msg': 'shipper series is not issued yet' }
        }
    } catch (error) {
        return { issued: false, 'msg': 'error occured while checking shipper issued' }
    }
}

async function updateShipper(req, res) {
    try {
        const result = await Shipper.updateOne({ _id: req.query.sid }, { isReceived: true })
        if (result.modifiedCount > 0)
            res.status(200).json({ 'msg': "success" })
        else
            res.status(403).json({ 'msg': "can not receive shipper" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}


async function deleteShipper(req, res) {
    try {
        const result = await Shipper.deleteOne({ _id: req.query.sid, isReceived: false })
        if (result.deletedCount > 0) {
            res.status(200).json({ msg: "success" })
        } else {
            res.status(409).json({ msg: "Can not be deleted." })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.toString() })
    }
}

module.exports = {
    isDocketValid,
    isDocketBooked,
    sendShipperForPrinting,
    getShippers,
    isShipperSeriesValid,
    isShipperIssuedAlready,
    shipperIssueToBranch,
    updateShipper,
    deleteShipper
}