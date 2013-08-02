var http = require('http');
var ecstatic = require('ecstatic');

var server = http.createServer(ecstatic(__dirname));
server.listen(8005, function () {
  console.log('open http://localhost:8005/');
});
