-- Create database --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Use database --
USE employees_db;

-- Create department table --
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- Create role table --
CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL UNSIGNED,
    department_id INT UNSIGNED,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

-- Create employee table --
CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED,
    manager_id INT UNSIGNED,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
