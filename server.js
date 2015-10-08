var express = require('express');
var app = express();

var port = process.env.PORT || 3000; 
var router = express.Router();

var shipGifs = require('./ship.json');
var failGifs = require('./fail.json');

app.get('/', function (req, res) {
  res.send('<html> \
    <head> \
        <title>Curated Ship Gifs</title> \
    </head> \
    <body> \
        <h1>Curated Ship Gifs</h1> \
		<p> Hit <a href="/ship/">/ship/</a> for a random shipping gif (<a href="/ship/view/">preview</a>)</p> \
		<p> Hit <a href="/fail/">/fail/</a> for a random shipping fail gif (<a href="/fail/view/">preview</a>)</p> \
    <body/> \
</html>');
});

app.get('/ship', function(req, res) {
    apiImageResult(res, shipGifs[Math.floor(Math.random()*shipGifs.length)])
});

app.get('/ship/view', function(req, res) {
    viewImageResult(res, shipGifs[Math.floor(Math.random()*shipGifs.length)])
});

app.get('/fail', function(req, res) {
	apiImageResult(res, failGifs[Math.floor(Math.random()*failGifs.length)])    
});

app.get('/fail/view', function(req, res) {
	viewImageResult(res, failGifs[Math.floor(Math.random()*failGifs.length)])
});

function viewImageResult(res, imageUrl) {
	res.send('<html> \
    <head> \
        <title>Curated Ship Gifs</title> \
    </head> \
    <body> \
        <img src="' + imageUrl + '" /> \
    <body/> \
</html>');
}

function apiImageResult(res, imageUrl) {
	res.json({ 
		data: {
			image_url: imageUrl	
		}
	});
}

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Gifs be happenin at http://%s:%s', host, port);
});