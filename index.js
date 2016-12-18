console.log('Starting Screen Shot Test Builder.');
var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send(fs.readFileSync(__dirname + '/public/index.html', 'utf-8'));
});

app.get('/get-result/:screen/:state', function (req, res) {
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    console.log('Your life just got easier.');
    console.log('PWD: ' + __dirname);
    console.log('PWD: ' + __filename);
});