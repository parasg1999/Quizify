const mysql = require('mysql');

const dbConfig = mysql.createConnection({
    host: "localhost",
    user: "newacc",
    password: "newacc"
});

dbConfig.connect(err => {
    if (err) {
        console.log("Error connecting to Db");
        return;
    }
    console.log("SQL Connection established");
});

module.exports = dbConfig;