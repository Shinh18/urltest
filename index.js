#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const boxenOptions = require("./style")
const path = require("path");
const posts = require("./getPosts");
const fileHandler = require("./utils/readFile");

const printManual = () => {
    console.log(chalk.red("\n                Standard user manual                "));
    console.log((chalk.gray("----------------------------------------------------"))); 
    console.log(chalk.redBright("urltester filename   -"), "reports good,bad,unknown urls"); 
    console.log(chalk.redBright("urltester v |version -"), "displays tool version"); 
    console.log((chalk.redBright("----------------------------------------------------\n"))); 
}; 

const version = boxen(chalk.redBright.bold("Urltester 1.0.0"), boxenOptions);

if(process.argv.length == 2 ) printManual();
else if(process.argv[2] === "version" || process.argv[2] === "-v") console.log(version);
else if(process.argv[2] === "telescope"){
    posts.getPosts().then(
        res => {
            const filePath = path.join(__dirname,'postsUrl.txt');
            fileHandler.readFile(filePath, false, "none");
        }
    )
    .catch(err => (console.log(err)));
}
else {
    const filePath = path.join(__dirname,process.argv[2]);
    if(process.argv[3] === "-j" || process.argv[3] === '--json' || process.argv[3] === '\j') {
        fileHandler.readFile(filePath, true, "none");
    }
    else if(process.argv[3] === '--all' || process.argv[3] === '--good' || process.argv[3] === '--bad'){
        fileHandler.readFile(filePath, false, process.argv[3]);
    }
    else{
        fileHandler.readFile(filePath, false, "none");
    }
}
 
