const inq = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
   host: "localhost",

   // Your port; if not 3306
   port: 3306,

   // Your username
   user: "root",

   // Your password
   password: "mysql2020",
   database: "employee_tracker_db"
});

connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId + "\n");
   // put code here
});

const questions = [
   {
      name: "startingQuestion",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
         "Add departments",
         "Add roles",
         "Add employees",
         "View departments",
         "View roles",
         "View employees",
         "Update employee roles"
      ]
   },
   {
      name: "departmentName",
      type: "input",
      message: "What is the department's name?"
   }
   // ,
   // {
   //    whichDpt: {
   //       name: "whichDpt",
   //       type: "rawList",
   //       choices:

   //    }
   // }
];

function runProgram() {
   inq.prompt(questions[0]).then(function(res) {
      console.log(res);

      switch (res.startingQuestion) {
         case "Add departments":
            addDepartments();

            break;
         case "Add roles":
            addRoles();
            break;
         case "Add employees":
            addEmployees();
            break;
         case "View departments":
            viewDepartments();
            break;
         case "View roles":
            viewRoles();
            break;
         case "View employees":
            viewEmployees();
            break;
         case "Update employee roles":
            updateEmployeeRole();
            break;
      }
   });
}

function addDepartments() {
   inq.prompt(questions[1]).then(function(res) {
      let name = res.departmentName;
      let query = "INSERT INTO departments SET ?";
      connection.query(query, { dept_name: name }, function(err) {
         if (err) throw err;
         runProgram();
      });
   });
}

function addRoles() {}

function addEmployees() {}

function viewDepartments() {
   let query = "SELECT * FROM departments";
   connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table(res);
      runProgram();
   });
}

function viewRoles() {}

function viewEmployees() {}

function updateEmployeeRole() {}

// outputs all the arrays in the database as an array so that they can be used as choices in the Inquirer prompt for 'add roles'
// function departmentArray() {
//    let query = 'SELECT * FROM departments';
//    connection.query(query, function(err, res) {
//       if (err) throw err;
//       consol.log(res)

//       for
//    })
// }

// when i go to get this data, i'm going to have to use joins - LOOK AT JOINS - INNER JOIN, OUTER JOIN,  - look at those on W3SCHOOLS
// going to need th joins becaus i'm going to get a role_id, but I need to give them the role name and dept name instead of the id, get request to employees, then join them with hthe roles table and the department table, that's when i do connection.query, that's going to be the main loop thrown at us...
// do the command to add the column using a
// get is going to be the most complicated though for sure - gotta use that JOIN

runProgram();
