const http = require("http");
const fs = require('fs');

const server = http.createServer((request, response)=>{
     let url = request.url;

     if(url == "/"){
        buildMessageForm(request,response)
     }else if(url=="/message" && request.method=="POST"){        
        handleSubmittedForm(request, response);
     }

     response.end();
});

const handleSubmittedForm = (request, response)=>{
    
    const body= [];
    request.on('data', (chunk)=>{
        body.push(chunk);
    });

    request.on('end',()=>{
        const parseBody = Buffer.concat(body).toString();
        console.log(parseBody);
        fs.writeFileSync("message.txt" ,parseBody.split("=")[1]);
    });
   
    //redirect to same page again.
    response.statusCode = 302;
    response.setHeader('Location','/');
    
}
const buildMessageForm = (request, response)=>{
    response.write(`
    <html>
    <head><title>Request Routing Demo</title></head>
    <body>    
    <form method='post' action='/message'>
        <p>Enter message : </p>
        <input name='message'></input>
        <button>Display Message</button>
    </form>
    </body>
    </html>`);
}

server.listen(3000);