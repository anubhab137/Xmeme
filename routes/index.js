var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'X-MEME' });
});

router.get('/memes',function(req,res,next){
  var resultArray = [];
  mongo.connect(url, function(err, client){
    if(err) return err;
    else console.log("Database connected");
    var database = client.db('test');
    var cursor = database.collection('data').find();
    cursor.forEach(function(doc, err){
      if(err) return err;
      resultArray.push(doc);
    }, function() {
      client.close();
      res.render('memes', {topmemes: resultArray})
    });
  });
});

router.post('/add-memes',function(req,res,next){
  var newMeme = {
    name: req.body.name,
    caption: req.body.caption,
    memeurl: req.body.memeurl
  };

  mongo.connect(url,function(err,client){
    if(err) return err;
    else console.log("Database connected");
    var database = client.db('test');
    database.collection('data').insertOne(newMeme, function(err,result){
      if(err) return err;
      console.log('New Meme Inserted');
      client.close();      
    });
  });

  res.redirect('/memes')
});

router.get('/memes/:id', function(req , res){
  
  var id=req.params.id;
  
  mongo.connect(url,function(err,client){
    if(err) return err;
    else console.log("Database connected");
    var database = client.db('test');
    database.collection('data').findOne({"_id": ObjectId(id)},function(err, result){
      if(err)return err;
      if(result==null) res.status(404).json("meme not found");
      else res.render('find-meme', {thismeme : result});
      client.close();
      
    });
  });
});


module.exports = router;
