const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql');

const { db } = require('../config');

const connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.name
});

connection.connect((err) => {
    if (err) {
        console.log("Error ", err)
    } else {
        console.log("Conectado a la base de datos")
    }
})

module.exports = connection;