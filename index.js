const { promptForInput, promptForList } = require('./src/prompts');
const inquirer = require('inquirer');
const fs = require('fs');

var allEmployees = [];

function promptForManager() {
    return inquirer.prompt([
        promptForInput('name', 'Enter Manager\'s name'),
        promptForInput('id', 'Enter Manager\'s ID'),
        promptForInput('email', 'Enter Manager\'s email'),
        promptForInput('number', 'Enter Manager\'s office number'),
    ]);
}

function promptForEmployee() {
    return inquirer
        .prompt([
            promptForList('type', 'Next employee type (or quit)?', ['intern', 'engineer', 'quit'])
        ])
        .then(nextEmployeeInput => {
            const nextType = nextEmployeeInput.type;
            if (nextType == 'quit') {
                return allEmployees;
            } else if (nextType == 'intern') {
                return promptForIntern();
            } else {
                // The only other option is engineer...
                return promptForEngineer();
            }
        });
}

function promptForEngineer() {
    return inquirer
        .prompt([
            promptForInput('name', 'Enter Engineer\'s name'),
            promptForInput('id', 'Enter Engineer\'s ID'),
            promptForInput('email', 'Enter Engineer\'s email'),
            promptForInput('github', 'Enter Engineer\'s GitHub user name'),
        ])
        .then(engineerData => {
            allEmployees.push(engineerData);
            return promptForEmployee();
        });
}

function promptForIntern() {
    return inquirer
        .prompt([
            promptForInput('name', 'Enter Intern\'s name'),
            promptForInput('id', 'Enter Intern\'s ID'),
            promptForInput('email', 'Enter Intern\'s email'),
            promptForInput('school', 'Enter Intern\'s school name'),
        ])
        .then(internData => {
            allEmployees.push(internData);
            return promptForEmployee();
        });
}

promptForManager()
    .then(managerData => {
        allEmployees.push(managerData);
        return promptForEmployee();
    })
    .then(allEmployees => {
        console.log(JSON.stringify(allEmployees, null, 4));
    });