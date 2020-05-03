//start the game
window.addEventListener('load', init);

//global variables
let time = 5; 
let score = 0;

let playing;

const input = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const displayScore = document.querySelector('#score');
const displayTime = document.querySelector('#time');
const gameOverMessage = document.querySelector('#message');
const secondsLeft = document.querySelector('#seconds');
const otherScore = document.querySelector('#other-score');

const words =[
    'Hello',
    'Lama',
    'Bunny',
    'Kitty',
];

//main game
//make it so that the first word is begin or timer doesn't start automatically or countdown or something
function init() {
    getWord(words);
    input.addEventListener('input', begin);
    setInterval(countdown, 1000);
    setInterval(gameStatus, 50);
    setInterval(sendScore, 1000);
    setInterval(updateHighest, 1000);
}

///////////////////////////////////// sockets.io stuff /////////////////////////////////////////////
var socket;
const displayOtherScore = document.querySelector('#other-score')

socket = io.connect('http://localhost:3000')
socket.on('playerScore', maxScore)

var highestArr = []


function sendScore() {
    //json data
    var data = {
        score: score,
        client: socket.id
    }
    socket.emit('playerScore', data)
    socket.emit('database', data)
}

function maxScore(data) {
    highestArr.push(data.score)
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function updateHighest() {
    otherScore.innerHTML = Math.max.apply(null, highestArr)
    mongo.connect(dbURL, function(err, db){
        assert.equal(null, err);
        db.collection('top-score').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item Inserted');
            db.close();
        });
    });
}

function begin() {
    if(checkWords()) {
        playing = true;
        time = 6;
        getWord(words)
        input.value = '';
        score = score + 1;
    }
    if(score === -1) {
        displayScore.innerHTML = 0;
    } else {
        displayScore.innerHTML = score;
    }
}

function checkWords() {
    if (input.value === currentWord.innerHTML) {
        message.innerHTML = 'nice!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

function getWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex]; 
}

function countdown() {
    if(time > 0) {
        time = time - 1
    } else if(time === 0) {
        playing = false;
    }
    displayTime.innerHTML = time;
}

function gameStatus() {
    if(time === 0 && !playing) {
        gameOverMessage.innerHTML = 'Game Over :(';
        score = -1;
        currentWord.innerHTML = 'begin'
    }
}
