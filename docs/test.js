



var path = require("path")
var fs = require("fs")
const {resolve} = require('path')
const dirs = []
const pathName = __dirname+'/Guide/Javascript/'
fs.readdir(pathName, function(err, files){
    fs.readdir(pathName, function(err, files){
        var dirs = [];
        (function iterator(i){
          if(i == files.length) {
            console.log(dirs);
            return ;
          }
          fs.stat(path.join(pathName, files[i]), function(err, data){     
            if(data.isFile()){               
                dirs.push(files[i]);
            }
            iterator(i+1);
           });   
        })(0);
    });
    console.log(dirs);  
})