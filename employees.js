const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Management System" }).render();

    console.log(logoText);

    loadMainPrompts();
}

async function loadMainPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                // Bonus
                {
                    name: "Update Employees Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                //  Bonus
                // {
                //   name: "Remove Role",
                //   value: "REMOVE_ROLE"
                // },

                // Bonus
                // {
                //   name: "Remove Employee",
                //   value: "REMOVE_EMPLOYEE"
                // },
                //  Bonus
                // {
                //   name: "Remove Department",
                //   value: "REMOVE_DEPARTMENT"
                // },
                // Bonus
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]);

    // Call the appropriate function depending on what the user chose
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return viewEmployeesByManager();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeesManager();
        default:
            return quit();
    }
}

async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, department_name }) => ({
        // CREATE TWO PROPERTIES name AND value FOR THIS OBJECT. THE PROPERTY name SHOULD CONTAIN THE NAME OF THE DEPARTMENT.
        // THE PROPERTY value SHOULD CONTAIN id.
        // THIS OBJECT FOR EACH MANAGER WILL RETURN TO MAP() TO CONSTRUCT AN ARRAY TO BE RETURNED AND BE STORED TO managerChoices.
        name: department_name,
        value: id
    }));

    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: departmentChoices
        }
    ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function viewEmployeesByManager() {
    const managers = await db.findAllPossibleManagers();

    const managerChoices = managers.map(({ id, manager_id }) => ({
        // CREATE TWO PROPERTIES name AND value FOR THIS OBJECT. THE PROPERTY name SHOULD CONTAIN THE NAME OF THE DEPARTMENT.
        // THE PROPERTY value SHOULD CONTAIN id.
        // THIS OBJECT FOR EACH MANAGER WILL RETURN TO MAP() TO CONSTRUCT AN ARRAY TO BE RETURNED AND BE STORED TO managerChoices.
        name: manager_id,
        value: id
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which manager would you like to see employees for?",
            choices: managerChoices
        }
    ]);

    const employees = await db.findAllEmployeesByManager(managerId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}


async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        // CREATE TWO PROPERTIES name AMD value FOR THIS OBJECT. THE PROPERTY name SHOULD CONTAIN THE CONCATENATION OF THE FIRST HAME AND THE LAST NAME.
        // THE PROPERTY value SHOULD CONTAIN id.
        // THIS OBJECT FOR EACH MANAGER WILL RETURN TO MAP() TO CONSTRUCT AN ARRAY TO BE RETURNED AND BE STORED TO managerChoices.
        name: first_name + ' ' + last_name,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);

    await db.updateEmployeeRole(employeeId, roleId);

    console.log("Updated employee's role");

    loadMainPrompts();
}

// async function updateEmployeesManager() {
//     const employees = await db.findAllEmployees();

//     const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
//         // CREATE TWO PROPERTIES name AMD value FOR THIS OBJECT. THE PROPERTY name SHOULD CONTAIN THE CONCATENATION OF THE FIRST HAME AND THE LAST NAME.
//         // THE PROPERTY value SHOULD CONTAIN id.
//         // THIS OBJECT FOR EACH MANAGER WILL RETURN TO MAP() TO CONSTRUCT AN ARRAY TO BE RETURNED AND BE STORED TO managerChoices.
//         name: first_name + ' ' + last_name,
//         value: id
//     }));

//     const { employeeId } = await prompt([
//         {
//             type: "list",
//             name: "employeeId",
//             message: "Which employee's role do you want to update?",
//             choices: employeeChoices
//         }
//     ]);

//     const roles = await db.findAllRoles();

//     const roleChoices = roles.map(({ id, title }) => ({
//         name: title,
//         value: id
//     }));

//     const { roleId } = await prompt([
//         {
//             type: "list",
//             name: "roleId",
//             message: "Which role do you want to assign the selected employee?",
//             choices: roleChoices
//         }
//     ]);

//     await db.updateEmployeeRole(employeeId, roleId);

//     console.log("Updated employee's role");

//     loadMainPrompts();
// }

async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.table(roles);

    loadMainPrompts();
}

async function addRole() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, department_name }) => ({
        name: department_name,
        value: id
    }));

    const role = await prompt([
        {
            name: "title",
            message: "What is the name of the role?"
        },
        {
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
        }
    ]);

    await db.createRole(role);

    console.log(`Added ${role.title} to the database`);

    loadMainPrompts();
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();

    console.log("\n");
    console.table(departments);

    loadMainPrompts();
}

async function addDepartment() {
    const department = await prompt([
        {
            name: "department_name",
            message: "What is the name of the department?"
        }
    ]);

    await db.createDepartment(department);

    console.log(`Added ${department.department_name} to the database`);

    loadMainPrompts();
}

async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        // CREATE TWO PROPERTIES name AMD value FOR THIS OBJECT. THE PROPERTY name SHOULD CONTAIN THE CONCATENATION OF THE FIRST HAME AND THE LAST NAME.
        // THE PROPERTY value SHOULD CONTAIN id.
        // THIS OBJECT FOR EACH MANAGER WILL RETURN TO MAP() TO CONSTRUCT AN ARRAY TO BE RETURNED AND BE STORED TO managerChoices.
        name: first_name + ' ' + last_name,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
    );

    loadMainPrompts();
}

function quit() {
    console.log("Thank you for using the Employee Management System. Goodbye!");
    process.exit();
}
