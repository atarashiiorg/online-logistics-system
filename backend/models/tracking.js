const mongoose = require('mongoose');
const trackingSchema = new mongoose.Schema({
    docketNumber:{
        type:String,
        unique:true
    },
    details:[
        {
            action:String,
            actionDate:Date,
            actionBy:{
                type:mongoose.Types.ObjectId,
                ref:"Employee"
            }
        }
    ],
    status:{
        type:String,
        default:"in-trasit"//'delivered'//'misroute'//'out for delivery'//'return to origin'//'undelivered'
    },
    receiver:String,
    receiverType:String,//'sign'//'stamp'//'sign & stamp'
    receivingDate:Date,
    podReceivingDate:Date,
    podRemarks:String
},{
    timestamps:true
})

const Tracking = mongoose.model("Tracking",trackingSchema)
module.exports = Tracking