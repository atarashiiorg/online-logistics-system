const Manifest = require("../models/manifest");

const fetchManifestReport = async (query) => {
  const matchStage = {};
  const pipeline = [];
  if (query.dateFrom && query.dateTo) {
    matchStage.manifestDate = {
      $gte: new Date(query.dateFrom),
      $lte: new Date(query.dateTo),
    };
  }
  if (query.manifestNumber) {
    matchStage.manifestNumber = query.manifestNumber;
  }
  if (query.fromBranch) {
    matchStage.fromBranch = query.fromBranch;
  }
  if (query.toBranch) {
    matchStage.toBranch = query.toBranch;
  }
  if (query.mode) {
    matchStage.mode = query.mode;
  }
  // matchStage.manifestNumber='Manifest_2024_5_3_1714726005025'
  pipeline.push({ $match: matchStage });
  pipeline.push({
    $lookup: {
      from: "vendors",
      localField: "vendor",
      foreignField: "_id",
      as: "vendor",
    },
  });
  pipeline.push({ $unwind: "$vendor" });
  pipeline.push({
    $lookup: {
      from: "bookings",
      foreignField: "_id",
      localField: "dockets.booking",
      as: "docket",
    },
  });
  pipeline.push({ $unwind: "$docket" });
  pipeline.push({
    $lookup: {
      from: "shipments",
      foreignField: "_id",
      localField: "docket.shipment",
      as: "docket.shipment",
    },
  });
  pipeline.push({ $unwind: "$docket.shipment" });

  pipeline.push({
    $lookup: {
      from: "destinations",
      foreignField: "_id",
      localField: "docket.shipment.destination",
      as: "docket.shipment.destination",
    },
  });
  pipeline.push({ $unwind: "$docket.shipment.destination" });
//   pipeline.push({
//     $lookup: {
//       from: "destinations",
//       foreignField: "_id",
//       localField: "docket.shipment.origin",
//       as: "docket.shipment",
//     },
//   });
//   pipeline.push({ $unwind: "$docket.shipment.origin" });

  const select = {
    manifestDate: 1,
    manifestNumber: 1,
    "docket.docketNumber": 1,
    "docket.shipment":1,
    toPayAmount: 1,
    cash: 1,
    cod: 1,
    boxes: 1,
    actualWeight: 1,
    chargedWeight: 1,
    clientName: 1,
    consignor: 1,
    consignee: 1,
    // "docket.shipment.origin.destName": 1,
    // "docket.shipment.destination.destName": 1,
    "vendor.ownerName": 1,
    mode: 1,
    pktStatus: 1,
    deliveryDate: 1,
  };

  pipeline.push({ $project: select });

  try {
    const manifest = await Manifest.aggregate(pipeline);
    return manifest
  } catch (error) {
    console.log(error)
    return null
  }
};

module.exports = {
  fetchManifestReport,
};
