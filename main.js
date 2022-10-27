//var express = require('express');
var http=require("http");
var path = require('path');
var fs = require('fs');
//var app = express();

const port = 3000;
var server = http.createServer(function(request, response){

    var filePath = '.' + request.url;
    if (filePath == './')
       filePath = './index.html';

    var extName = path.extname(filePath);
    var contentType = 'text/html';
    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }


        fs.readFile(filePath, function(error, content) {
            if (error) {
                response.writeHead(500);
                response.end();
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });

});
server.listen(port, function(error){
    if(error){
        console.log('Something bad');
    }else{
        console.log("Server is listening on port " + port);
    }
});
