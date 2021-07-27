-- Use database --
USE employees_db;

-- Data to insert into the department table --
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Legal"),
       ("Finance");

-- Data to insert into the role table --
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 40000, 1),
       ("Sales Lead", 50000, 1),  
       ("Software Engineer", 90000, 2),
       ("Lead Engineer", 125000, 2),
       ("Lawyer", 85000, 3),
       ("Legal Team Lead", 100000, 3),
       ("Accountant", 75000, 4),
       ("Account Manager", 100000, 4);

-- Data to insert into the employee table --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Sammy", "Watkins", 2, 1),
       ("Alexander", "Hamilton", 3, NULL),
       ("Rick", "Sanchez", 4, 2),
       ("Peter", "Griffin", 5, NULL),
       ("Lenny", "Kravitz", 6, 3),
       ("Elton", "John", 7, NULL),
       ("Elon", "Musk", 8, 4);
