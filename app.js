const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const mainInquirer = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which type of Employee is being entered?',
                name: 'employeeType',
                choices: ['Manager', 'Engineer', 'Intern', 'Done adding employees'],
            }
        ])
        .then((response) => {
            if (response.employeeType === "Manager") {
                console.log(response.employeeType);
                managerInquirer();
            } else if (response.employeeType === "Engineer") {
                console.log(response.employeeType);
                engineerInquirer();
            } else if (response.employeeType === "Intern") {
                console.log(response.employeeType);
                internInquirer();
            } else if (response.employeeType === "Done adding employees") {
                console.log("Now we can render the html!");
                
                fs.writeFile(outputPath, render(employees), (err) =>
                err ? console.error(err) : console.log('Success!'));
            }
        });
};

mainInquirer();

const engineerInquirer = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is your id number',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is your email',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What is your GitHub username?',
                name: 'github',
            }
        ])
        .then((response) => {
            employees.push(new Engineer(response.name, response.id, response.email, response.github));
            mainInquirer();
        });
};

const managerInquirer = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is your id number',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is your email',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What is your office number?',
                name: 'officenum',
            }
        ])
        .then((response) => {
            employees.push(new Manager(response.name, response.id, response.email, response.officenum));
            mainInquirer();
        });
};

const internInquirer = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is your id number',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is your email',
                name: 'email',
            },
            {
                type: 'input',
                message: 'Which school do you attend?',
                name: 'school',
            }
        ])
        .then((response) => {
            employees.push(new Intern(response.name, response.id, response.email, response.school));
            mainInquirer();
        });
};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
