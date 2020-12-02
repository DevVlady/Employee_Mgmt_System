const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_DB'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connection as id ' + connection.threadId);

    connection.query(
        'select * from employees',
        function(err, answer) {
            if (err) throw err;
            console.log(answer);
            connection.end();
        }
    )
})