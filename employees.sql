DROP DATABASE IF EXISTS myEmployees_db;

CREATE DATABASE myEmployees_db;

USE myEmployees_db;

CREATE TABLE employees (
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL
);

CREATE TABLE department (
    department_name VARCHAR(30) NOT NULL,
)



SELECT * FROM employees;
SELECT * FROM department_name;