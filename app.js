var spawn = require('child_process').spawn;
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.json());       

app.post('/', function (req, res) {
  var url = req.body.url;

  console.log(req.body);
  console.log(url);

  var child = spawn('stdbuf', ['./unoconv', '--stdout', url]);

  child.stderr.on('data', function(data) {
    res.write(data);
    res.status(500).end();
  });

 child.stdout.on('data', function(data) {
    res.write(data);
  });

  child.stdout.on('end', function() {
    res.end();
  });

});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});