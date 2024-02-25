const { STRING, BOOLEAN, NUMBER } = require("sequelize")
const sequelize = require("./db")

const Shipment = new sequelize.define("Shipment",{
    origin: STRING,
    destination: STRING,
    mode: STRING,
    customerType: STRING,
    isOda: BOOLEAN,
    consignor: STRING,
    consignee: STRING,
    consigneeContact: STRING,
    consigneeAddress: STRING,
    totalBoxes: NUMBER,
    actualWeight: NUMBER,
    totalDimensionalWeight: NUMBER,
    totalActualWeight: NUMBER,
    totalChargeWeight: NUMBER,
},{})

module.exports = Shipment