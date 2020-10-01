# Urltester
Command-line tool for finding and reporting dead links (e.g., broken URLs) in a file

## Intsallation
* Fork this repository
* Clone the forked repository to your local device
* Run ```npm i -g https://github.com/Shinh18/urltester.git```

## Usage
* ```urltester <filename>``` 
    * This command enables the tool to search for all the links in the file, make network requests and prints out the url with their respective status code
* ```urltester -v | version ```
    * Using either v or version command, you can see the tool name and current version
* urltester
    * This command displays a standard usage manual which shows how to use the tool as well as the command line arguments available

## Features
* It looks for and processes all the URLs using ```http://``` or ```https://``` schemes 
* URLs are displayed according to the following:
   * Green: good, status code 200 
   * Red: bad, status code 400 or 404
   * Gray: unknown, status code
* Optimized to request headers instead of full body downloads
* Additional support is added for timeouts




