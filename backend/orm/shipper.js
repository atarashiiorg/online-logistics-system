const { DataTypes, DATE, STRING } = require('sequelize')
const {sequelize} = require('./db')

const Shipper = sequelize.define("Shipper",{
        branchCode:{
          type:STRING,
          allowNull:false
        },
        date:DATE,
        docketFrom:{
          type:STRING,
          allowNull:false
        },
        docketTo:{
          type:STRING,
          allowNull:false
        },
        sendBy:STRING,
        remarks:STRING
},{})
sequelize.sync()
module.exports = Shipper