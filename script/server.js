var http = require('http');

var port = 8888;

var server = http.createServer(onRequest);

function onRequest(request, response){
    console.log("Receive request ->> " + request);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

server.listen(port);
console.log("Server started at " + port + " port...");