//Test database code (not finished)
var topScoreArr = []
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var dbURL = 'mongodb://localhost:27017/test';


router.get('/get-data', function(req, res, next) {
    mongo.connect(url, function(err, db) {

        var cursor = db.collection('user-data').find();
        cursor.forEach(function (doc, err){
            
            topScoreArr.push(doc);
        }, function() {
            db.close(); 

        });
    });

});

router.post('/insert', function(req, res, next) {
    var item = {
        score: Math.max.apply(null, highestArr),
        client: socket.id
    }
});

mongo.connect(dbURL, function(err, db){
    assert.equal(null, err);
    db.collection('top-score').insertOne(item, function(err, result) {
        assert.equal(null, err);
        console.log('Item Inserted');
        db.close();
    });
});

router.post('/update', function(req, res, next) {

});

router.post('/delete', function(req, res, next) {

});