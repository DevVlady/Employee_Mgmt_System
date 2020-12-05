const util = require("util");
const mysql = require("mysql");

//Required connection parameters
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'myEmployees_DB'
});

//Build connection
connection.connect(function(err) {
    if (err) throw err;
    console.log('connection as id ' + connection.threadId);
});

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;