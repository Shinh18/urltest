const fs = require("fs");
const fetch = require("node-fetch");

const getPosts = async () => {

    try {
        var posts = []; 
        var postsURL = 'http://localhost:3000/posts';        
        const response = await fetch(postsURL);
        const data = await response.json();
  
        for(var item of data) {
            posts.push(`http://localhost:3000${item.url}`);
       }

       fs.writeFileSync('./postsUrl.txt', JSON.stringify(posts));
    } catch (err) {
        console.error(err);
    }
  };
  
module.exports = {getPosts};