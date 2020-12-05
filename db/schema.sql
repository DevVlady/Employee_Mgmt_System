DROP DATABASE IF EXISTS myEmployees_DB;

CREATE DATABASE myEmployees_DB;

USE myEmployees_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 4) NULL,
    department_id INT NULL,
    PRIMARY KEY (id),
    -- MAKE AN CONSTRAINT 'ON DELETEN CASCADE' (WITHOUT QUOTES) ON THIS FOREIGN KEY
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    -- MAKE role_id AS FOREIGN KEY REFERENCING role TABLE AND MAKE CONSTRAINT ON DELETE CASCADE ON THIS FOREIGN KEY
    FOREIGN KEY (role_id) REFERENCES employee_role (id)
    -- MAKE manager_id AS FOREIGN KEY REFERENCING employee TABLE ITSELF AND MAKE CONSTRAINT ON DELETE SET NULL ON THIS FOREIGN KEY
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);

-- SELECT * FROM employees;
-- SELECT * FROM employee_role;
-- SELECT * FROM department;