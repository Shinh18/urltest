#!/usr/bin/env node

const chalk = require("chalk");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

if(process.argv.length == 2 ){
    console.log("Standard user manual");
    console.log("----------------------"); 
}

else {
    if(process.argv[2] === "v" || process.argv[2] === "version") {
        console.log("Urltest 1.0.0");
        console.log("works");
    }

    else {
     
        
        const filePath = path.join(__dirname,process.argv[2]);

        //reading file 
 
        fs.readFile(filePath,'utf-8', function(err, data) {
            if(err) {
                console.log("Unsuccesful file read", err)
            }
            else {
                const urlArr = data.match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi);
                
                urlArr.forEach((url) => {
                //network request of url
                    fetch(url)
                    .then(function(response) {
                        if(response.status == 200) {
                            console.log(chalk.green(response.status, url));
                        }
                        else if(response.status == 400 || response.status == 404) {
                            console.log(chalk.red(response.status, url));
                        }
                        else {
                            console.log(chalk.gray(response.status, url) );
                        }
                    })
                    .catch(function(error) {
                        console.log(chalk.redBright("Error occured "), error);  
                    });
                });
            }
        });
    }
}
