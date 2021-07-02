#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

//index.js

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("Node JS CLI", {
                font: 'Ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );
};

const askQuestions = () => {
    const questions = [
        {
            name: 'FILENAME',
            type: 'input',
            message: 'What is the name of the file without extension?'
        },
        {
            type: 'list',
            name: 'EXTENSION',
            message: "What is the file extension?",
            choices: ['.js', '.ts', '.html', '.css'],
            filter: function (val) {
                return val.split('.')[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`
    shell.touch(filePath);
    return filePath;
};

const run = async () => {
    //show script introduction
    init();
    // ask questions
    const answers = await askQuestions();
    const { FILENAME, EXTENSION } = answers;
    // create file
    const filePath = createFile(FILENAME, EXTENSION);
    //show success message
    success(filePath);
};

const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
    );
};

run();