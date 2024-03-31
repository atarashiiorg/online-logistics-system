const Booking = require("../models/booking");
const { getPopulatedBooking } = require("../services/dbServices");

async function getTrackingDetails(req,res){
    try{
        const docket = req.query.docket
        const details = await getPopulatedBooking({docketNumber:docket},true)
        console.log(details)
        res.status(200).json({'msg':'success',data:details})
    } catch(err){
        res.status(500).json({'err':err})
    }
}

module.exports = {
    getTrackingDetails
}