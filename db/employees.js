//Requiring neccessary variables from JSON
const mysql = require('mysql');
const inquirer = require('inquirer');

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
    runAction();
});

//Function to run action chosen by user
function runAction() {
    inquirer.prompt(
        {
            name: 'action',
            type: 'list',
            choices: [
                'Add Employee',
                'Remove Employee',
                'Update Employee',
                'Update Employees Role',
                'Update Employees Manager',
                'Add Role',
                'Remove Role',
                'View All Roles',
                'View All Employees',
                'View All Emplyees By Department',
                'View All Employees By Manager',
                'Exit'
            ],
            message: 'What would you like to do?'
        }
    )
    .then(function(answer) {
        console.log(answer);
        switch(answer.action) {
            case 'Add Employee':
            buildEmployee();
            break;

            case 'Remove Employee':
            removeEmployee();
            break;

            case 'Update Employee':
            updateEmployee();
            break;

            case 'Update Employees Role':
            updateEmployeesRole();
            break;

            case 'Update Employees Manager':
            updateEmployeesManager();
            break;

            case 'Add Role':
            addRole();
            break;

            case 'Remove Role':
            removeRole();
            break;

            case 'View All Roles':
            viewAllRoles();
            break;

            case 'View All Employees':
            viewAllEmployees();
            break;


        }
    })
};


//Function to Build Employee
function buildEmployee() {
    inquirer.prompt(
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter your first name!'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter your last name!'
        },
        {
            name: 'roleID',
            type: 'input',
            message: 'Enter your current role!'
        },
        {
            name: 'number'
        }
    )
}