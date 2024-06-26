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
    currentManifest:{
        type:mongoose.Types.ObjectId,
        ref:"Manifest"
    },
    status:{
        type:String,
        default:"booked"//'delivered'//'misroute'//'out for delivery'//'return to origin'//'undelivered'//'booked'
    },
    statusRemarks:{
        type:String,
        default:""
    },
    receiver:{
        type:String,
        default:""
    },
    receiverType:{
        type:String,
        default:""
    },//'sign'//'stamp'//'sign & stamp'
    receivingDate:{
        type:Date,
        default:null
    },
    podReceivingDate:{
        type:Date,
        default:null
    },
    podRemarks:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const Tracking = mongoose.model("Tracking",trackingSchema)
module.exports = Tracking