const inquirer = require("inquirer");
// const db = require("./db/dbQueries");

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

                break;
            case "View all roles":
            
                break;
            case "View all employees":
                
                break;
            case "Add a department":
                
                break;
            case "Add a role":
                
                break;
            case "Add an employee":
                
                break;
            case "Update an employee role":
                
                break;
            default:
                break;
        }
    })
}



// async function viewEmployees() {
//     let employees = await db.findAllEmployees();
//     console.table(employees);
// }

// viewEmployees();


const init = () => {
    generalQuestions()
    //   .then(employeeQuestion)
      .catch((err) => {
        console.log(err);
      });
  };
  
  init();