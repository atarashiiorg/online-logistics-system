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


async function findManifestByDocketNumber(docketNumber) {
    try {
        const booking = await Booking.findOne({ docketNumber })
            .populate({
                path: 'tracking',
                populate: { path: 'currentManifest' }
            })
        if (!booking) {
            return null
        } else {
            const manifest = await Manifest.findById(booking?.tracking?.currentManifest)
            if (!manifest)
                return null
            return manifest;
        }
    } catch (error) {
        console.error("Error finding manifest:", error);
        throw error;
    }
}

async function updateTrackingManifest(dockets, details, manifest) {
    try {
        for (let i = 0; i < dockets.length; i++) {
            const booking = await Booking.findOne({ docketNumber: dockets[i] }).populate('tracking');
            if (!booking) {
                console.log(`Booking not found for docket number: ${dockets[i]}`);
                continue; // Move to the next iteration if booking is not found
            }
            
            const res = await Tracking.updateOne(
                { _id: booking.tracking._id },
                {
                    $push: { details: { ...details } },
                    $set: { currentManifest: manifest }
                }
            );
            console.log(res);
        }
    } catch (err) {
        throw err;
    }
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
                    .populate({
                        path: "shipment",
                        populate: [{ path: "origin" }, { path: "destination" }]
                    })
                    .populate("invoice")
                    .populate("consignorConsignee")
                    .populate("tracking")
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
    initiateTracking,
    findManifestByDocketNumber,
    updateTrackingManifest
}