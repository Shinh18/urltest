#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "blue",
    backgroundColor: "#FFFFFF"
}

const messageOne = () => {
    console.log(chalk.red("\n                Standard user manual                "));
    console.log((chalk.gray("----------------------------------------------------"))); 
    console.log(chalk.redBright("urltester filename   -"), "reports good,bad,unknown urls"); 
    console.log(chalk.redBright("urltester v |version -"), "displays tool version"); 
    console.log((chalk.redBright("----------------------------------------------------\n"))); 
}; 

const version = boxen(chalk.redBright.bold("Urltester 1.0.0"), boxenOptions);

if(process.argv.length == 2 ) messageOne();
else if(process.argv[2] === "v" || process.argv[2] === "version" || process.argv[2] === "-v") {
    console.log(version);
}    
else {      
    const filePath = path.join(__dirname,process.argv[2]);
    fs.readFile(filePath,'utf-8', function(err, data) {
    if(err) console.log(chalk.red("Unsuccesful to read file"), err)
    else {
        const urlArr = data.match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi);
                
        urlArr.forEach((url) => {
            //network request of url
            fetch(url,{method: "HEAD", timeout: 1500})
            .then((response) => {
            if(response.status == 200) console.log(chalk.green(response.status, url));
                        
            else if(response.status == 400 || response.status == 404) console.log(chalk.red(response.status, url));
        
            else console.log(chalk.gray(response.status, url) );
            })
            .catch((error) => {
            console.log(chalk.red("404", url));  
            });
        });
    }
});

}
