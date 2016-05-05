var express = require('express');
var request = require('request');
var shipGifs = require('./ship.json');
var failGifs = require('./fail.json');
var blacklistedGifs = require('./blacklist.json');

var app = express();

var port = process.env.PORT || 3000; 
var router = express.Router();

app.get('/', function (req, res) {
  res.send('<html> \
    <head> \
        <title>Curated Ship Gifs</title> \
    </head> \
    <body> \
        <h1>Curated Ship Gifs</h1> \
        <h3>Select from pre-approved list</h3> \
        <ul> \
            <li>Hit <a href="/ship/">/ship/</a> for a random shipping gif (<a href="/ship/view/">preview</a>)</li> \
		    <li>Hit <a href="/fail/">/fail/</a> for a random shipping fail gif (<a href="/fail/view/">preview</a>)</li> \
        </ul> \
        <h3>Random but avoiding blacklisted</h3> \
        <ul> \
            <li>Hit <a href="/ship/lucky">/ship/lucky</a> for a random shipping gif (<a href="/ship/lucky/view/">preview</a>)</li> \
		    <li>Hit <a href="/fail/lucky">/fail/lucky</a> for a random shipping fail gif (<a href="/fail/lucky/view/">preview</a>)</li> \
            <li>Hit <a href="/search?q=computer+fail">/search?q=computer+fail</a> for a random search term gif (<a href="/search/view?q=computer+fail">preview</a>)</li> \
        </ul> \
    <body/> \
</html>');
});

app.get('/ship', function(req, res) {
    apiImageResult(res, shipGifs[Math.floor(Math.random()*shipGifs.length)])
});

app.get('/ship/lucky', function(req, res) {
    searchAndReturn("computer", res, apiImageResult);
});

app.get('/ship/view', function(req, res) {
    viewImageResult(res, shipGifs[Math.floor(Math.random()*shipGifs.length)])
});

app.get('/ship/lucky/view', function(req, res) {
    searchAndReturn("computer", res, viewImageResult);
});

app.get('/fail', function(req, res) {
	apiImageResult(res, failGifs[Math.floor(Math.random()*failGifs.length)])    
});

app.get('/fail/lucky', function(req, res) {
    searchAndReturn("boat fail", res, apiImageResult);
});

app.get('/fail/view', function(req, res) {
	viewImageResult(res, failGifs[Math.floor(Math.random()*failGifs.length)])
});

app.get('/fail/lucky/view', function(req, res) {
    searchAndReturn("boat fail", res, viewImageResult);
});

app.get('/search', function(req, res) {
    searchAndReturn(req.query.q, res, apiImageResult);
});

app.get('/search/view', function(req, res) {
    searchAndReturn(req.query.q, res, viewImageResult);
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

function searchAndReturn(searchTerm, res, responder) {
    search(searchTerm, 0, function(imageUrl){
        if(imageUrl == null){
            res.send(404);
            return;
        }
        responder(res, imageUrl)
    });
}

function search(searchTerm, count, callback) {
    if(count > 5) {
        return null;
    }
    request({ 
        method: 'GET', 
        uri: "http://api.giphy.com/v1/gifs/random?tag=" + encodeURIComponent(searchTerm) + "&api_key=dc6zaTOxFJmzC",
        json: true 
        }, function(err, res, body) {
        if(!err && res.statusCode == 200) {
            var imageUrl = body.data.image_url;
            if(isBlacklisted(imageUrl)) {
                console.log("Whoops!!!");
                count++;
                search(searchTerm, count, callback);
            }
            else { 
                console.log("Took " + count + " attempts");
                callback(imageUrl);
            }
        } 
    });    
}

function isBlacklisted(imageUrl) {
    for(var i=0;i<blacklistedGifs.length;i++){
        if(imageUrl.indexOf(blacklistedGifs[i]) != -1){
            return true;
        }
    }
    return false;
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