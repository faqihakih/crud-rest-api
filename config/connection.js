const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rest_api"
})

conn.connect((error) => {
    error ? console.log(error) :console.log("Database Connect")
})

module.exports = conn;