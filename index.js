#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
var displayAll = true;
var displayGood = false;
var displayBad = false;

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

const coloredOutput = (urlArray) => {
    for(var item of urlArray) {      
        if(item.status == '200' && displayGood) {
            console.log(chalk.green.bold(` ${item.status}: ${item.url} `));
        }
        else if((item.status == '400' || item.status == '404') && displayBad){
            console.log(chalk.red.bold(` ${item.status}: ${item.url} `));
        }
        else if(displayAll){
            console.log(chalk.grey.bold(` ${item.status}: ${item.url} `)); 
        }          
    }
}

const checkUrl = async (url) => {
    var jsonOutput = [];
    var urlElement;
    try{
        const res = await fetch(url,{method: "HEAD", timeout: 1500});
        urlElement = { url: `${url}`, status: `${res.status}` };
        jsonOutput.push(urlElement);
    } catch(error) {
        urlElement = { url: `${url}`, status: '404' }
        jsonOutput.push(urlElement)
    }
    return urlElement
}

if(process.argv.length == 2 ) messageOne();
else if(process.argv[2] === "version" || process.argv[2] === "-v") {
    console.log(version);
}    
else {      
    const filePath = path.join(__dirname,process.argv[2]);
    fs.readFile(filePath,'utf-8', function(err, data) {
        if(err) console.log(chalk.red("Unsuccesful to read file"), err)    
        else {
            const urlArr = data.match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi);         
            const promises = urlArr.map(checkUrl);
            Promise
                .all(promises)
                .then(results => {
                    if(process.argv[3] === '-j' || process.argv[3] === '--json' || process.argv[3] === '\j' ){
                        console.log(JSON.stringify(results));
                    }
                    else if(process.argv[3] === '--all' ){
                            displayAll = true;
                            displayGood = true;
                            displayBad = true;
                            coloredOutput(results);
                    }
                    else if(process.argv[3] === '--good' ) {
                            displayGood = true;
                            displayAll = false;
                            coloredOutput(results);
                    }
                    else if(process.argv[3] === '--bad' ) {
                            displayBad = true;
                            displayAll = false;
                            coloredOutput(results);
                    }
                    else {
                        displayAll = true;
                        displayGood = true;
                        displayBad = true;
                        coloredOutput(results);
                    }
                })
                .catch(err => 
                    console.log("Error message: ", err) );
        }
    });
}

