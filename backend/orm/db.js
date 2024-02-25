const sql = require('mysql2')
const db = sql.createConnection({
    host:"localhost",
    user:"root",
    database:"cargo_test"
})

const { Sequelize } = require("sequelize")
const sequelize = new Sequelize("cargo_test", "root", "", {
  host: "localhost",
  dialect: "mariadb"
})
module.exports = {sequelize,db}