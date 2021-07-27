// Required modules
const mysql2 = require("mysql2");
const util = require("util");

// Connection
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;