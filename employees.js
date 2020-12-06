//Requiring neccessary variables from JSON
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
// require("console.table");

init();

// Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    runAction();
}


//Function to run action chosen by user
async function runAction() {
    const { choice } = await prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Update Employee',
                    value: 'UPDATE_EMPLOYEE'
                },
                {
                    name: 'Update Employees Role',
                    value: 'UPDATE_EMPLOYEES_ROLE'
                },
                {
                    name: 'Update Employees Manager',
                    value: 'UPDATE_EMPLOYEES_MANAGER'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ALL_ROLES'
                },
                {
                    name: 'View All Employees',
                    values: 'VIEW_ALL_EMPLOYEES'
                },
                {
                    name: 'View All Emplyees By Department',
                    value: 'VIEW_ALL_EMP_BY_DEPT'
                },
                {
                    name: 'View All Employees By Manager',
                    value: 'VIEW_ALL_EMP_BY_MGR'
                },
                {
                    name: 'Exit',
                    value: 'EXIT'
                }
            ]
        }
    ]);
    switch (choice) {
        case 'VIEW_ALL_EMPLOYEES':
            return viewAllEmployees();

        case 'ADD_EMPLOYEE':
            return buildEmployee();
        case 'REMOVE_EMPLOYEE':
            return removeEmployee();
        case 'UPDATE_EMPLOYEE':
            return updateEmployee();
        case 'UPDATE_EMPLOYEES_ROLE':
            return updateEmployeesRole();
        case 'UPDATE_EMPLOYEES_MANAGER':
            return updateEmployeesManager();
        case 'ADD_ROLE':
            return addRole();
        case 'REMOVE_ROLE':
            return removeRole();
        case 'VIEW_ALL_ROLES':
            return viewAllRoles();
        case 'VIEW_ALL_EMP_BY_DEPT':
            return viewEmployeesByDept();
        case 'VIEW_ALL_EMP_BY_MGR':
            return viewEmployeesByManager();
        // default:
        //     return exit();
    }
}

async function viewAllEmployees() {
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.table(employees);

    runAction();
}


//Function to Build Employee
// function buildEmployee() {
//     inquirer.prompt(
//         {
//             name: 'firstName',
//             type: 'input',
//             message: 'Enter your first name!'
//         },
//         {
//             name: 'lastName',
//             type: 'input',
//             message: 'Enter your last name!'
//         },
//         {
//             name: 'roleID',
//             type: 'input',
//             message: 'Enter your current role!'
//         },
//         {
//             name: 'number'
//         }
//     )
// }