// imports
var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

//Database
var topScoreArr = []
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var dbURL = 'mongodb://localhost:27017/test';
var mongoose = require('mongoose');

mongoose.connect(dbURL, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Connected to DB!');
    }
});

//socket.io
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection:' + socket.id);
    score.find({}, function(err, docs){
        if(err) throw err;
        console.log(docs)
    })

    socket.on('playerScore', scoreMsg);
    
    //works with the JSON 
    function scoreMsg(data) {
        //send to everyone
        io.sockets.emit('playerScore', data)
        console.log(data);
    }

    socket.on('database', databaseMsg);

    function databaseMsg(data) {
        var newScore = new score(data);
        newScore.save(function(err){
            if(err) throw err;
            io.sockets.emit('database', data)
           
        })
        console.log(newScore)
    }
}

console.log("We are LIVE!");