const ejs = require('ejs')
const path = require("path")
const readEjs = async(template,data)=>{
    return new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname,"..",`emailTemplates/${template}.ejs`),{...data},(err,data)=>{
            err?reject(err):resolve(data)
        })
    })
}

async function getBookingTemplate(docketNumber){
    const template = await readEjs("bookingMail",{docketNumber,status:"Booked"})    
    return template
}

async function getStatusTemplate(docketNumber, fromBranch, toBranch, status){
    const template = await readEjs("statusMail",{docketNumber,fromBranch,toBranch,status})
    return template
}

async function getDeliveredTemplate(docketNumber,deliveryDate){
    const template = await readEjs("deliveredMail",{docketNumber,deliveryDate})
    return template
}

function getTemplate(template){
    switch(template){
        case "booking": return getBookingTemplate;
        case "status": return getStatusTemplate;
        case "delivered":return getDeliveredTemplate;
        default: null
    }
}

module.exports = getTemplate