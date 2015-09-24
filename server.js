var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use('/src',express.static('src'));
app.use('/bower_components',express.static('bower_components'));
var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
});