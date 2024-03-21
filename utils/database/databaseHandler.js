const sql = require('mssql');
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

const pool = new sql.ConnectionPool(config);

function connectDB() {
    try {
        pool.connect(err => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("Connected to database!");
        });
    } catch (e) {
        console.error(e);
    };
};

function closeDB() {
    try {
        pool.close();
        console.log("Database connection closed.");
    } catch (e) {
        console.error(e);
    };
}

module.exports = { connectDB, closeDB, pool };