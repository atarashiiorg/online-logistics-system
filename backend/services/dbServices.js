const Booking = require("../models/booking");
const Manifest = require("../models/manifest");
const Tracking = require("../models/tracking");

async function getPopulatedManifest(opts, single) {
    return new Promise(async (resolve, reject) => {
        try {
            let manifests
            if (single) {
                manifests = await Manifest.findOne(opts || {})
                    .populate("fromBCode")
                    .populate("toBCode")
                    .populate({
                        path: "dockets.booking",
                        populate: [
                            {
                                path: "shipment",
                                populate: [{ path: "origin" }, { path: "destination" }]
                            },
                            { path: "invoice" },
                            { path: "client" },
                            { path: "consignorConsignee" }
                        ]
                    })
                    .populate("vendor")
                resolve(manifests)
            } else {
                manifests = await Manifest.find(opts || {})
                    .populate("fromBCode")
                    .populate("toBCode")
                    .populate({
                        path: "dockets.booking",
                        populate: [
                            {
                                path: "shipment",
                                populate: [{ path: "origin" }, { path: "destination" }]
                            },
                            { path: "invoice" },
                            { path: "client" },
                            { path: "consignorConsignee" }
                        ]
                    })
                    .populate("vendor")
                resolve(manifests)
            }
        } catch (err) {
            reject(err)
        }
    })
}

async function getPopulatedBooking(opts, single) {
    return new Promise((resolve, reject) => {
        try {
            if (single) {
                const booking = Booking.findOne(opts || {})
                    .populate({
                        path: "shipment",
                        populate: [{ path: "origin" }, { path: "destination" }]
                    })
                    .populate("invoice")
                    .populate("consignorConsignee")
                    .populate("tracking")
                resolve(booking)
            } else {
                const bookings = Booking.find(opts || {})
                resolve(bookings)
            }
        } catch (error) {
            reject(error)
        }
    })
}

async function initiateTracking(docket, branchName, date, by) {
    try {
        const track = new Tracking({
            docketNumber: docket,
            details: [
                {
                    action: 'Docket booked from ' + branchName,
                    actionDate: date,
                }
            ]
        })
        return track
    } catch (err) {
        throw err
    }
}

module.exports = {
    getPopulatedManifest,
    getPopulatedBooking,
    initiateTracking
}