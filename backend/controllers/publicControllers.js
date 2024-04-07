const Booking = require("../models/booking");
const Runsheet = require("../models/runsheet")
const { getPopulatedBooking } = require("../services/dbServices");

async function getTrackingDetails(req,res){
    try{
        const docket = req.query.docket
        const details = await getPopulatedBooking({docketNumber:docket},true)
        const emp = await getEmployeeDetailsForRunsheet(details._id)
        res.status(200).json({'msg':'success',data:{...details._doc, emp}})
    } catch(err){
        console.log(err)
        res.status(500).json({'err':err})
    }
}

async function getEmployeeDetailsForRunsheet(bookingId) {
    try {
        const runsheet = await Runsheet.findOne({ 'dockets.booking': bookingId })
            .populate({
                path: 'employee',
                model: "Employee",
                select: 'name mobile' // Only select 'name' and 'mobile' fields
            })
            .exec();

        if (runsheet && runsheet.employee) {
            // Extract only the employee details
            const { name, mobile } = runsheet.employee;
            return { name, mobile };
        } else {
            return null; // No runsheet found or no employee details
        }
    } catch (error) {
        console.error("Error fetching runsheet:", error);
        throw error;
    }
}


module.exports = {
    getTrackingDetails
}