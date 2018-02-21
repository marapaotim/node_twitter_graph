//var config = require('config');

var express = require('express');
var app = express();
var http = require('http').Server(app);

var redis = require('redis');
var url = 'redis://localhost:6379';
var client1 = redis.createClient(url);
var client2 = redis.createClient(url);

var io = require('socket.io')(http)

app.use('/', express.static('views'));

http.listen(8000, function(){
    console.log('listening on *:8000');
});

client1.on('message', function(chan, msg) {
  client2.hgetall(msg, function(err, res) {
    res.key = msg;
    io.sockets.emit('twits', res);
  });
});

client1.subscribe('subscriber');
