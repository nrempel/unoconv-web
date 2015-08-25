var spawn = require('child_process').spawn;
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.json());       

app.post('/', function (req, res) {
  var url = req.body.url;
  var child = spawn('stdbuf', ['./unoconv', '--stdout', url]);
  // var child = spawn('ls', ['-a']);
  child.stdout.pipe(res);
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});