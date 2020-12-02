DROP DATABASE IF EXISTS myEmployees_DB;

CREATE DATABASE myEmployees_DB;

USE myEmployees_DB;

CREATE TABLE employees (
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (first_name)
);

CREATE TABLE department (
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_name)
);

CREATE TABLE employee_role (
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 4) NULL,
    department_id INT NULL,
    PRIMARY KEY (title)
);

SELECT * FROM employees;
SELECT * FROM department_name;
SELECT * FROM employee_role;