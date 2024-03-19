const Booking = require("../models/booking");
const Branch = require("../models/branch");
const Shipper = require("../models/shipper")

async function isDocketValid(docket){
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
        if(res_doc){
            return {valid:true,msg:docket + " is issued to "+res_doc.branchName+" branch",'branch':res_doc}
        } else {
            return {valid:false, msg:docket + " is not valid or not issued to any branch"}
        }
    } catch (error) {
        console.log("isDocketValid",error)
        return {valid:false, msg:'error occured while checking valid'}
    }
}

async function isDocketBooked(docket){
    try {
        const res_doc = await Booking.findOne({docketNumber:docket})
        if(res_doc){
            return {booked:true,'msg':'docket '+docket+' is booked'}
        } else {
            return {booked:false,'msg':'docket '+docket+' is not booked yet'}
        }
    } catch (error) {
        console.log("isDocketBooked",error)
        return {booked:false,'msg':'error occured while checking booked'}
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
            res.status(409).json({'msg':'this shipper series is already used'})
            return
        }
        const result = await Shipper.create({ ...req.body, branchCode: req.body.branch })
        if (result)
            res.status(200).json({'msg':'shipper created successfully'})
        else
            res.status(304).json({'msg':'not modified'})
    } catch (error) {
        console.log(error);
        res.status(500).json({'err':error})
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
        res.status(200).json({'data':response,'msg':'success'})
    } catch (err) {
        console.log(err);
        res.status(500).json({'err':err})
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
        if(!isValid.valid){
            res.status(403).json({'msg':isValid.msg})
            return
        }

        const isIssued = await isShipperIssuedAlready(docketFrom,docketTo)
        if(!isIssued.issued){
            res.status(409).json({'msg':isIssued.msg})
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
            res.status(200).json({'msg':'success'})
            return
        }
        res.status(304).end()
    } catch (err) {
        console.log(err);
        res.status(500).json({'err':err})
    }
}


async function isShipperSeriesValid(docketFrom, docketTo){
    try {
        const shipper = await Shipper.findOne({docketFrom,docketTo})
        if(shipper){
            return {valid:true,'msg':'shipper is valid'}
        } else {
            return {valid:false, 'msg':'shipper is not valid'}
        }
    } catch (error) {
        return {valid:false,'msg':'error occured while checking shipper valid'}
    }
}


async function isShipperIssuedAlready(docketFrom, docketTo){
    try {
        const branch = await Branch.findOne({
            shippers: {
                $elemMatch: {
                    $or: [
                        { docketFrom: { $lte: docketFrom } },
                        { docketTo: { $gte: docketTo } }
                    ]
                }
            }
        })
        if(branch){
            return {issued:true,'msg':'shipper is series already issued', 'branch':branch}
        } else {
            return {issued:false,'msg':'shipper series is not issued yet'}
        }
    } catch (error) {
            return {issued:false, 'msg':'error occured while checking shipper issued'}        
    }
}

module.exports = {
    isDocketValid,
    isDocketBooked,
    sendShipperForPrinting,
    receiveShipperFromPrinting,
    isShipperSeriesValid,
    isShipperIssuedAlready,
    shipperIssueToBranch
}