// Required file
const dbConnection = require("./connection");

// Class
class DB {
    constructor(connection) {
      this.connection = connection;
    }

    //Select all the departments
    findAllDepartments() {
        return this.connection.query(
            "Select * FROM department;"
        )
    }

    // Select all the roles with their departments
    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
        )
    }

    // Select all employees
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }

    // Select all the manangers
    findAllManagers() {
        return this.connection.query(
            "SELECT first_name, last_name FROM employee"        
        )
    }

    // Add a new department
    addNewDepartment(newDept) {
        return this.connection.query(
            "INSERT INTO department(name) VALUES ( ? );", [newDept]
        )
    }

    // Add a new role, salary and corresponding department
    addNewRole(newRole, newSalary, department) {
        return this.connection.query(
            "INSERT INTO role(title, salary, department_id) VALUES ( ?, ?, ? );", [newRole, newSalary, department]
        )
    }

    // Add a new employee
    addNewEmployee(newFirstName, newLastName, roleId, managerId) {
        return this.connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? );", [newFirstName, newLastName, roleId, managerId]
        )
    }

    // Update an existing employee with a new role
    updateExistingEmployee(employee, roleId) {
        return this.connection.query(
            "SELECT CONCAT(first_name,' ',last_name) AS full_name FROM employees;",
            "UPDATE employee(full_name, role_id) VALUES (?, ?);", [employee, roleId]
        )
    }
}

module.exports = new DB(dbConnection);