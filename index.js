// Required modules
const inquirer = require("inquirer");
const db = require("./db/dbQueries");

// General prompt to select what you want to do --- will run after each selection
const generalQuestions = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "generalQuestion",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ])
    .then((general) => {
        const { generalQuestion } = general;
        switch (generalQuestion) {
            case "View all departments":
                ViewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department": 
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployee();
                break;
            default:
                break;
        }
    })
}

// Function to view all departments
async function ViewDepartments() {
    let departments = await db.findAllDepartments();
    console.table(departments);
    generalQuestions();
}

// Function to view all roles
async function viewRoles() {
    let roles = await db.findAllRoles();
    console.table(roles);
    generalQuestions();
}

// Function to view all employees
async function viewEmployees() {
    let employees = await db.findAllEmployees();
    console.table(employees);
    generalQuestions();
}

// Function to add a new department to the db
async function addDepartment() {
        return inquirer
        .prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What department would you like to add?"
            }
        ])
        .then((answer) => {
            db.addNewDepartment(answer.newDepartment);
            console.log(`Added ${answer.newDepartment} department Successfully!`);
            generalQuestions();
        })
}

// Function to get all the departments and put them in an array to index in addRole()
const departmentArray = [];
async function selectDepartment() {
    let departments = await db.findAllDepartments() + 1;
    for (let i = 0; i < departments.length; i++) {
        departmentArray.push(departments[i].name); 
    }

  return departmentArray;
}

// Function to add a new role with a salary and a corresponding department
async function addRole() {
    let departments = await selectDepartment();

    return inquirer
    .prompt([
        {
            type: "input",
            name: "newRole",
            message: "What role would you like to add?"
        },
        {
            type: "input",
            name: "newSalary",
            message: "What is the base salary for this new role?"
        },
        {
            type: "list",
            name: "department",
            choices: departments
        }
    ])
    .then(async (answer) => {
        let departments = await selectDepartment();
        let departmentId = departments.indexOf(answer.department) + 1;

        db.addNewRole(answer.newRole, answer.newSalary, departmentId);
        console.log(`Added ${answer.newRole} role with a salary of $${answer.newSalary} Successfully!`);
        generalQuestions();
    })
}

// Function to get all the roles and put them in an array to index in addEmployee()
const roleArray = [];
async function selectRole() {
    let roles = await db.findAllRoles();
    for (let i = 0; i < roles.length; i++) {
      roleArray.push(roles[i].title); 
    }

  return roleArray;
}

// Function to get all the managers and put them in an array to index in addEmployee()
const managersArray = [];
async function selectManager() {
    let managers = await db.findAllManagers();
    for (let i = 0; i < managers.length; i++) {
      let manager = managers[i].first_name + " " + managers[i].last_name;
      managersArray.push(manager);
    }

  return managersArray;
}

// Function to add a new employee with first name, last name, role, and manager
async function addEmployee() {
    let roles = await selectRole();
    let managers = await selectManager();
    return inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the new employee's role? ",
            choices: roles
        },
        {
            type: "list",
            name: "manager",
            message: "What is the new employee's manager's name?",
            choices: managers
        }
    ])
    .then(async (answer) => {
        let roles = await selectRole();
        let managers = await selectManager();
        let roleId = roles.indexOf(answer.role) + 1;
        let managerId = managers.indexOf(answer.manager) + 1;
        db.addNewEmployee(answer.firstName, answer.lastName, roleId, managerId);
        console.log(`Added ${answer.firstName} ${answer.lastName} as a new employee Successfully!`);
        generalQuestions();
    })
}

// Function to get all the employees and put them in an array to index in updateEmployee()
const employeeArray = [];
async function selectEmployee() {
    let employees = await db. findAllEmployees();
    for (let i = 0; i < employees.length; i++) {
        let employee = employees[i].first_name + " " + employees[i].last_name;
        employeeArray.push(employee); 
    }

  return employeeArray;
}

// Function to select employee and update their role
async function updateEmployee() {
    let employees = await selectEmployee();
    let roles = await selectRole();

    return inquirer
    .prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role would you like to update?",
            choices: employees
        },
        {
            type: "list",
            name: "role",
            message: "What role do you want to assign them?",
            choices: roles
        },
    ])
    .then(async (answer) => {
        let roles = await selectRole();
        let roleId = roles.indexOf(answer.role) + 1;

        db.updateExistingEmployee(answer.employee, roleId);

        console.log(`Updated ${answer.employee} role to ${answer.roleId} Successfully!`);
        generalQuestions();
    })
}


// Function to start the application and run generalQuestions()
const init = () => {
    generalQuestions()
      .catch((err) => {
        console.log(err);
      });
  };
  
  init();