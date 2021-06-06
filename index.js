// require packages
const inquirer = require("inquirer");
const db = require("./db/connection");

// func to prompt user for 'view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role'
const promptInitialApp = async () => {
  let response = await inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Choose an option",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    },
  ]);

  switch (response.options) {
    case "view all departments":
      // call func
      departmentsQuery();
      console.log("view all departments successful");
      break;
    case "view all roles":
      // call func
      rolesQuery();
      break;
    case "view all employees":
      // call func
      employeesQuery();
      break;
    case "add a department":
      // call func
      addDep();
      break;
    case "add a role":
      // call func
      addRole();
      break;
    case "add an employee":
      // call func
      addEmp();
      break;
    case "update an employee role":
      // call func
      updateRole();
      break;
  }
};

const departmentsQuery = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
};

const rolesQuery = () => {
  const sql = `SELECT * FROM role
            LEFT JOIN department
            ON department.id = role.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
};

const employeesQuery = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
};
// run db.query if user chooses to view database

// call func if user chooses to add input, call function for that option
const addDep = async () => {
  let response = await inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: "Please enter the department name.",
    },
  ]);

  const sql = `INSERT INTO department (name)
                VALUES(?)`;
  const params = response.department;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
};

const addRole = async () => {
  let res = await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the role name?",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "depName",
      message: "Choose a department",
      choices: [
        "1 Management",
        "2 Development",
        "3 Maintenance",
        "4 Marketing",
      ],
    },
  ]);
  const sql = `INSERT INTO role (title, salary, department_id)
                VALUES(?,?,?) 
                UPDATE role
                    INNER JOIN
                department ON role.role_id = department.id
                `;
  const params = [res.roleName, res.roleSalary, res.depName];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
};
const addEmp = async () => {
  let res = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Please enter the employee's first name.",
    },
    {
      type: "input",
      name: "lastName",
      message: "Please enter the employee's last name.",
    },
    {
      type: "input",
      name: "role",
      message: "What is this employees role?",
    },
    {
      type: "input",
      name: "manager",
      message: "Who is this employee's manager?",
    },
  ]);
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
  const params = [res.firstName, res.lastName, res.role, res.manager];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
};
const updateRole = async () => {
  let res = await inquirer.prompt([
    {
      type: "list",
      name: "empOptions",
      message: "Choose an employee to update.",
      choices: [],
    },
    {
      type: "list",
      name: "updateRole",
      message: "Choose this employee's new role.",
      choices: ["Manager", "Engineer", "Intern", "Consultant"],
    },
  ]);
  const sql = `UPDATE employee SET role_id = ?
            WHERE id = ?`;
  const params = [res.empOptions, res.updateRole];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
};

promptInitialApp();
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
