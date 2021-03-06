use employees;

INSERT INTO department
    (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('George', 'Awada', 1, NULL),
    ('Kon', 'Kravchenko', 2, 1),
    ('Vladimir', 'Spector', 3, NULL),
    ('Vladimir', 'Dimitrov', 4, 3),
    ('Dimtar', 'Micevski', 5, NULL),
    ('Maria', 'Dimitrova', 6, 5),
    ('Jana', 'Dimitrova', 7, NULL),
    ('Milena', 'Dimitrova', 8, 7);