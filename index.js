const inq = require("inquirer");
const mysql = require("mysql");

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



// when i go to get this data, i'm going to have to use joins - LOOK AT JOINS - INNER JOIN, OUTER JOIN,  - look at those on W3SCHOOLS
// going to need th joins becaus i'm going to get a role_id, but I need to give them the role name and dept name instead of the id, get request to employees, then join them with hthe roles table and the department table, that's when i do connection.query, that's going to be the main loop thrown at us...
// do the command to add the column using a 
// get is going to be the most complicated though for sure - gotta use that JOIN