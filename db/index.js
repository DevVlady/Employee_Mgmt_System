const connection = require("./connection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;
    }

    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees(employee) {
        return this.connection.query(
            // SELECT id, first_name, last_name FROM employee TABLE AND SELECT department name from department TABLE AND SELECT salary FROM role TABLE
            // YOUR NEED TO USE LEFT JOINS TO JOIN THREE TABLES
            'SELECT employee.id, employee.first_name, employee.last_name, department.name, role.salary, SUM(role.title) FROM employee LEFT JOIN role ON employee.id = role.id LEFT JOIN department ON department.id = role.id GROUP BY id',
            employee
        );
    }

    // Find all employees except the given employee id
    findAllPossibleManagers(employeeId) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    // Create a new employee
    createEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?",
            employee
        );
    }


    // Update the given employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [roleId, employeeId]
        );
    }

    // Update the given employee's manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }

    // Find all roles, join with departments to display the department name
    findAllRoles() {
        return this.connection.query(
            // id, title, salary FROM role TABLE AND department name FROM department TABLE
            // YOU NEED TO USE LEFT JOIN TO JOIN role and department TABLES
            'SELECT role.id, role.title, role.salary, department.name, SUM(role.salary) FROM role LEFT JOIN department on role.id = department.id GROUP BY id'
        );
    }

    // Create a new role
    createRole(role) {
        return this.connection.query(
            'INSERT INTO role SET ?',
            role
        );
    }


    // Find all departments, join with employees and roles and sum up utilized department budget
    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
        );
    }

    // Create a new department
    createDepartment(department) {
        return this.connection.query(
            'INSERT INTO department SET ?',
            department
        );
    }

    // Find all employees in a given department, join with roles to display role titles
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    // Find all employees by manager, join with departments and roles to display titles and department names
    findAllEmployeesByManager(managerId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }
}

module.exports = new DB(connection);
