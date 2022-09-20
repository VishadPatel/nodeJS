const http = require("http");

const server = http.createServer((request, response)=>{
    var date = new Date();

    //access data from request object.
    console.log(request.url, request.method, request.headers);
    //setting headers for response
    response.setHeader("Content-Type","text/html");
    
    response.write("<h1>Hello, Node HTTP Server is ready to serve request.</h1>");
    response.write(`Current Date & Time : ${date}`);
    response.end();
});

server.listen(3000);

