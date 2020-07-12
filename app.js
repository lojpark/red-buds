var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/board', function (req, res) {
    res.sendFile(__dirname + '/client/board.html');
});

app.use('/client', express.static(__dirname + '/client'));

app.listen(2000, function(){
    console.log("port: 2000 open");
});