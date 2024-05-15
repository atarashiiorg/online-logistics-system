const Booking = require("../models/booking");
const Manifest = require("../models/manifest");
const Tracking = require("../models/tracking");
const Employee = require("../models/employee");
const Shipper = require("../models/shipper");
const getTemplate = require("../utils/emailTemplate");
const sendMail = require('./mailSmsServices')

async function getPopulatedManifest(opts, single, filtered) {
  return new Promise(async (resolve, reject) => {
    try {
      let manifests;
      if (single) {
        manifests = await Manifest.findOne(opts || {})
          .populate("fromBCode")
          .populate("toBCode")
          .populate({
            path: "dockets.booking",
            populate: [
              {
                path: "shipment",
                populate: [{ path: "origin" }, { path: "destination" }],
              },
              { path: "invoice" },
              { path: "client" },
              { path: "consignorConsignee" },
            ],
          })
          .populate("vendor");
        resolve(manifests);
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
                    cond: { $eq: ["$$docket.isReceived", false] },
                  },
                },
              },
            },
          ]);
          await Manifest.populate(manifestsWithReceivedDockets, [
            { path: "fromBCode" },
            { path: "toBCode" },
            {
              path: "dockets.booking",
              populate: [
                {
                  path: "shipment",
                  populate: [{ path: "origin" }, { path: "destination" }],
                },
                { path: "invoice" },
                { path: "client" },
                { path: "consignorConsignee" },
              ],
            },
            { path: "vendor" },
          ]);
          resolve(manifestsWithReceivedDockets);
        } else {
          manifests = await Manifest.find(opts || {})
            .populate("fromBCode")
            .populate("toBCode")
            .populate({
              path: "dockets.booking",
              populate: [
                {
                  path: "shipment",
                  populate: [{ path: "origin" }, { path: "destination" }],
                },
                { path: "invoice" },
                { path: "client" },
                { path: "consignorConsignee" },
              ],
            })
            .populate("vendor");
          resolve(manifests);
        }
      }
    } catch (err) {
      reject(err);
    }
  });
}

async function findManifestWithBooking(opts) {
  try {
    const booking = await Booking.findOne(opts || {})
      .populate({
        path: "shipment",
        populate: [{ path: "origin" }, { path: "destination" }],
      })
      .populate("invoice")
      .populate("consignorConsignee")
      .populate({
        path: "tracking",
        populate: { path: "currentManifest" },
      });
    if (!booking) {
      return null;
    } else {
      if (
        booking?.tracking?.currentManifest == "" ||
        booking?.tracking?.currentManifest == null
      ) {
        return { booking, manifest: null };
      }
      const manifest = await Manifest.findOne(
        booking?.tracking?.currentManifest
      ).populate({
        path: "dockets",
        populate: { path: "booking" },
      });
      if (!manifest) return null;
      return { booking, manifest };
    }
  } catch (error) {
    console.error("Error finding manifest:", error);
    throw error;
  }
}

async function updateTrackingManifest(
  dockets,
  key,
  details,
  manifest,
  session,
  mail
) {
  try {
    for (let i = 0; i < dockets.length; i++) {
      let booking;
      if (key == "docketNumber") {
        booking = await Booking.findOne({ docketNumber: dockets[i] })
          .populate("tracking")
          .populate("consignorConsignee", "consignorEmail consigneeEmail")
          .populate("client", "email autoEmails");
      } else {
        booking = await Booking.findOne({ _id: dockets[i] })
          .populate("tracking")
          .populate("consignorConsignee", "consignorEmail consigneeEmail")
          .populate("client", "email autoEmails");
      }
      if (!booking) {
        console.log(`Booking not found for docket number: ${dockets[i]}`);
        continue; // Move to the next iteration if booking is not found
      }

      const res = await Tracking.findOneAndUpdate(
        { _id: booking.tracking._id },
        {
          $push: { details: { ...details } },
          $set: manifest || {},
        },
        { session }
      );
      if (mail) {
        const emailList = [
          booking?.client?.email,
          ...booking?.client?.autoEmails,
          booking?.consignorConsignee?.consignorEmail,
          booking?.consignorConsignee?.consigneeEmail,
        ];
        const templatter = getTemplate("status");
        const html = await templatter(
          booking.docketNumber,
          mail.fromBranch,
          mail.toBranch,
          "in-transit"
        )
        const emailRes = await sendMail(emailList,"Packet status information",html)
        // console.log("email res->",emailRes.info)
      }
    }
  } catch (err) {
    throw err;
  }
}
async function updateTrackingStatus(dockets, key, status, session) {
  try {
    for (let i = 0; i < dockets.length; i++) {
      let booking;
      if (key == "docketNumber") {
        booking = await Booking.findOne({ docketNumber: dockets[i] }).populate(
          "tracking"
        );
      } else {
        booking = await Booking.findOne({ _id: dockets[i] }).populate(
          "tracking"
        );
      }
      if (!booking) {
        console.log(`Booking not found for docket number: ${dockets[i]}`);
        continue; // Move to the next iteration if booking is not found
      }
      const tracking = await Tracking.findOne({ _id : booking.tracking?_id})      

      if(tracking.status=="in-transit"){
        const res = await Tracking.updateOne(
          { _id: booking.tracking._id },
          {
            $set: { status: status },
          },
          { session }
        );
      } else {

      }
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
            populate: [{ path: "origin" }, { path: "destination" }],
          })
          .populate("invoice")
          .populate("consignorConsignee")
          .populate({ path: "tracking", populate: { path: "podImage" } });
        resolve(booking);
      } else {
        console.log(opts);
        const bookings = Booking.find(opts || {})
          .populate({
            path: "shipment",
            populate: [{ path: "origin" }, { path: "destination" }],
          })
          .populate("invoice")
          .populate("consignorConsignee")
          .populate("tracking");
        resolve(bookings);
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function initiateTracking(docket, branchName, date, by) {
  try {
    const track = new Tracking({
      docketNumber: docket,
      details: [
        {
          action: "Docket booked from " + branchName,
          actionDate: date,
          actionBy: by,
        },
      ],
    });
    return track;
  } catch (err) {
    throw err;
  }
}

async function getUser(opts) {
  try {
    const user = await Employee.findOne({ ...opts, isActive: true }).populate({
      path: "permissions",
      populate: [
        {
          path: "branchAccess",
          populate: {
            path: "access",
            populate: {
              path: "branch",
              populate: { path: "zone", select: "zoneName" },
            },
          },
        },
        {
          path: "pageAccess",
        },
      ],
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getValidShipper(docketFrom, docketTo) {
  try {
    const shipper = await Shipper.findOne({
      docketFrom: { $lte: parseInt(docketFrom) },
      docketTo: { $gte: parseInt(docketTo) },
    });
    return shipper;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getPopulatedManifest,
  getPopulatedBooking,
  initiateTracking,
  findManifestWithBooking,
  updateTrackingManifest,
  updateTrackingStatus,
  getUser,
  getValidShipper,
};
