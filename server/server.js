const http = require("http");
const fs = require("fs");
const port = 5000;
const ip = "127.0.0.1";
/*
const getDataFromLocal = filePath => {
    return new Promise((resolve, rejects) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if(err) {
                rejects(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
*/

// let message = getDataFromLocal("./database.md");
let messages = {results:['안녕?','여러분']};
const server = http.createServer((request, response) => {


    if(request.method === 'GET') {
        response.writeHead(200, defaultCorsHeaders);
        response.end(JSON.stringify(messages));
    }
    else if(request.method === 'POST' && request.url === '/post') {
        let body = [];
        response.on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            message.result.push(JSON.parse(body));
            response.writeHead(200, defaultCorsHeaders);
            response.on(JSON.stringify(messages));
        })
    }
    else if(request.method === 'OPTIONS') {
        response.writeHead(200, defaultCorsHeaders);
        response.end();
    }
    else {
        response.writeHead(404, defaultCorsHeaders);
        response.end();
    }




})
server.listen(port, ip);

const defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };