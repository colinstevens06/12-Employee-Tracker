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
   console.log("Connected as id " + connection.threadId + "\n");
   // put code here
});

const questions = [
   {
      name: "startingQuestion",
      type: "list",
      message: "What would you like to do?",
      choices: [
         "Add departments",
         "Add roles",
         "Add employees",
         "View departments",
         "View roles",
         "View employees",
         "Update employee roles",
         "End program"
      ]
   },
   // here is the question for 'add departments'
   {
      name: "departmentName",
      type: "input",
      message: "What is the department's name?"
   }
];

function runProgram() {
   // console.log(allDepartments);

   inq.prompt(questions[0]).then(function(res) {
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
         case "End program":
            connection.end();
      }
   });
}

function addDepartments() {
   console.log(allDepartments);
   inq.prompt(questions[1]).then(function(res) {
      let name = res.departmentName;
      let query = "INSERT INTO departments SET ?";
      connection.query(query, { dept_name: name }, function(err) {
         if (err) throw err;
         runProgram();
      });
   });
}

function viewDepartments() {
   let query = "SELECT * FROM departments";
   connection.query(query, function(err, res) {
      if (err) throw err;
      // console.log(res);
      console.log("\nHere are the departments\n\n======================\n");
      console.table(res);
      console.log("======================\n");
      runProgram();
   });
}

function addRoles() {
   // console.log("departmentArray function ran");
   let query = "SELECT * FROM departments";
   connection.query(query, function(err, departmentTable) {
      if (err) throw err;
      let allDepartments = [];

      departmentTable.forEach(department => {
         allDepartments.push(department.dept_name);
      });

      console.log(allDepartments);

      const rolesQuestions = [
         // here is the first question for 'add roles'
         {
            name: "whichDpt",
            type: "list",
            message: "Which department would you like to add the role to?",
            choices: allDepartments
         },
         // here is the second question for 'add roles'
         {
            name: "roleTitle",
            type: "input",
            message: "What's the title of the role?"
         },
         // here is the third question for 'add roles'
         {
            name: "roleSalary",
            type: "input",
            message: "What's the salary for this role?"
         }
      ];

      inq.prompt(rolesQuestions).then(function(fullResult) {
         let deptID = "";
         let title = fullResult.roleTitle;
         let salary = fullResult.roleSalary;

         for (let i = 0; i < allDepartments.length; i++) {
            if (fullResult.whichDpt === departmentTable[i].dept_name) {
               deptID = departmentTable[i].dept_id;
            }
         }

         connection.query(
            "INSERT INTO roles SET ?",
            { title: title, salary: salary, dept_id: deptID },
            function(err) {
               if (err) throw err;
               runProgram();
            }
         );
      });
   });
}

function viewRoles() {
   let query =
      "SELECT roles.roles_id, roles.title, roles.salary, departments.dept_name FROM roles INNER JOIN departments ON (roles.dept_id = departments.dept_id)";
   connection.query(query, function(err, res) {
      if (err) throw err;
      // console.log(res);
      console.log("\nHere are the roles\n\n======================\n");
      console.table(res);
      console.log("======================\n");
      runProgram();
   });
}

function addEmployees() {
   let query = "SELECT * FROM roles";
   connection.query(query, function(err, rolesTable) {
      console.log(rolesTable);
      if (err) throw err;
      let allRoles = [];

      rolesTable.forEach(role => {
         allRoles.push(role.title);
      });

      const employeeQuestions = [
         // here is the first question for 'add roles'
         {
            name: "whichRole",
            type: "list",
            message: "Which role will this employee have?",
            choices: allRoles
         },
         // here is the second question for 'add roles'
         {
            name: "employeeFirstName",
            type: "input",
            message: "What's the employee's first name?"
         },
         // here is the third question for 'add roles'
         {
            name: "employeeLastName",
            type: "input",
            message: "What's the employee's last name?"
         }
      ];

      inq.prompt(employeeQuestions).then(function(employee) {
         console.log(employee);

         let roleID;
         let firstName = employee.employeeFirstName;
         let lastName = employee.employeeLastName;

         for (let i = 0; i < allRoles.length; i++) {
            if (employee.whichRole === rolesTable[i].title) {
               roleID = rolesTable[i].roles_id;
            }
         }

         console.log;

         connection.query(
            "INSERT INTO employee SET ?",
            {
               first_name: firstName,
               last_name: lastName,
               roles_id: roleID
            },
            function(err) {
               if (err) throw err;
               runProgram();
            }
         );
      });
   });
}

function viewEmployees() {
   let query =
      "SELECT employee.employee_id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.dept_name FROM employee INNER JOIN roles ON (employee.roles_id = roles.roles_id) INNER JOIN departments ON (roles.dept_id = departments.dept_id)";
   connection.query(query, function(err, res) {
      if (err) throw err;
      // console.log(res);
      console.log("\nHere are the employees\n\n======================\n");
      console.table(res);
      console.log("======================\n");
      runProgram();
   });
}

function updateEmployeeRole() {}

// outputs all the arrays in the database as an array so that they can be used as choices in the Inquirer prompt for 'add roles'

// when i go to get this data, i'm going to have to use joins - LOOK AT JOINS - INNER JOIN, OUTER JOIN,  - look at those on W3SCHOOLS
// going to need th joins becaus i'm going to get a role_id, but I need to give them the role name and dept name instead of the id, get request to employees, then join them with hthe roles table and the department table, that's when i do connection.query, that's going to be the main loop thrown at us...
// do the command to add the column using a
// get is going to be the most complicated though for sure - gotta use that JOIN

runProgram();
