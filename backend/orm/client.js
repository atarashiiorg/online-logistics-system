const { STRING, BOOLEAN } = require('sequelize');
const {sequelize} = require('./db');
const Client = new sequelize.define("Client",{
    clientCode:STRING,
    tinNo:STRING,
    clientName:STRING,
    email:STRING,
    introDate:STRING,
    branchName:STRING,
    group:STRING,
    contactPerson:STRING,
    billPrefix:STRING,
    address:STRING,
    city:STRING,
    pinCode:STRING,
    place:STRING,
    state:STRING,
    airMinWeight:STRING,
    trainMinWeight:STRING,
    roadMinWeight:STRING,
    remarks:STRING,
    minFovCharge:STRING,
    fovPercent:STRING,
    gstNo:STRING,
    emailCC:STRING,
    phone:STRING,
    faxNo:STRING,
    fuelOn:STRING,
    emailTo:STRING,
    
    isActive:BOOLEAN,

})