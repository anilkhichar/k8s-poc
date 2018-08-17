var http = require('http');
var handleRequest = function(request, response) {
  response.writeHead(200);
  var htmlStr = '<!DOCTYPE html><html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css" media="screen,projection"><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body><div style="text-align: center;"> <h3>Hello Kubernetes!</h3></div><div style="padding: 5% 10%;"><table class=" centered responsive-table bordered"><thead><tr><th>Node Name</th><th>Pod Name</th><th>Pod IP</th></tr></thead><tbody><tr><td>';
  htmlStr += process.env.K8S_NODE_NAME.toString() + '</td><td>' + process.env.K8S_POD_NAME.toString() + '</td><td>' + process.env.K8S_POD_IP.toString() + '</td></tr></tbody></table></div></body></html>';
  response.end(htmlStr);
}
var www = http.createServer(handleRequest);
www.listen(8080);
