const Booking = require("../models/booking");
const Manifest = require("../models/manifest");
const Tracking = require("../models/tracking");

async function getPopulatedManifest(opts, single, filtered) {
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
                if (filtered) {
                    const manifestsWithReceivedDockets = await Manifest.aggregate([
                        { $match: opts || {} },
                        {
                            $project: {
                                manifestNumber: 1,
                                manifestDate: 1,
                                mode: 1,
                                destination: 1,
                                fromBCode: 1,
                                toBCode: 1,
                                vendor: 1,
                                createdBy: 1,
                                isReceived: 1,
                                isPrinted: 1,
                                dockets: {
                                    $filter: {
                                        input: "$dockets",
                                        as: "docket",
                                        cond: { $eq: ["$$docket.isReceived", false] }
                                    }
                                }
                            }
                        }
                    ])
                    await Manifest.populate(manifestsWithReceivedDockets, [
                        { path: "fromBCode" },
                        { path: "toBCode" },
                        {
                            path: "dockets.booking",
                            populate: [
                                { path: "shipment", populate: [{ path: "origin" }, { path: "destination" }] },
                                { path: "invoice" },
                                { path: "client" },
                                { path: "consignorConsignee" }
                            ]
                        },
                        { path: "vendor" }
                    ]);
                    resolve(manifestsWithReceivedDockets)
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
            }
        } catch (err) {
            reject(err)
        }
    })
}


async function findManifestWithBooking(opts) {
    try {
        const booking = await Booking.findOne(opts || {})
        .populate({
            path: "shipment",
            populate: [{ path: "origin" }, { path: "destination" }]
        })
        .populate("invoice")
        .populate("consignorConsignee")
        .populate({
            path: 'tracking',
            populate: { path: 'currentManifest' }
        })
        if (!booking) {
            return null
        } else {
            console.log(booking)
            if(booking?.tracking?.currentManifest=="" || booking?.tracking?.currentManifest==null){
                return {booking,manifest:null}
            }
            const manifest = await Manifest.findOne(booking?.tracking?.currentManifest).populate({
                path: 'dockets',
                populate: { path: 'booking' }
            })
            if (!manifest)
                return null
            return {booking,manifest};
        }
    } catch (error) {
        console.error("Error finding manifest:", error);
        throw error;
    }
}

async function updateTrackingManifest(dockets, key,details, manifest) {
    try {
        for (let i = 0; i < dockets.length; i++) {
            let booking
            if(key=="docketNumber"){
                booking = await Booking.findOne({docketNumber:dockets[i] }).populate('tracking');
            } else {
                booking = await Booking.findOne({_id:dockets[i] }).populate('tracking');
            }
            if (!booking) {
                console.log(`Booking not found for docket number: ${dockets[i]}`);
                continue; // Move to the next iteration if booking is not found
            }

            console.log("Current Manifest->",manifest)
            const res = await Tracking.updateOne(
                { _id: booking.tracking._id },
                {
                    $push: { details: { ...details } },
                    $set: manifest || {}
                }
            );
            console.log(res);
        }
    } catch (err) {
        throw err;
    }
}
async function updateTrackingStatus(dockets, key, status) {
    try {
        for (let i = 0; i < dockets.length; i++) {
            let booking
            if(key=="docketNumber"){
                booking = await Booking.findOne({docketNumber:dockets[i] }).populate('tracking');
            } else {
                booking = await Booking.findOne({_id:dockets[i] }).populate('tracking');
            }
            if (!booking) {
                console.log(`Booking not found for docket number: ${dockets[i]}`);
                continue; // Move to the next iteration if booking is not found
            }

            const res = await Tracking.updateOne(
                { _id: booking.tracking._id },
                {
                    $set: { status: status }
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
                console.log(opts)
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
    findManifestWithBooking,
    updateTrackingManifest,
    updateTrackingStatus
}