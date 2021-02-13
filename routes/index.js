//Importing modules
var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/test';

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'X-MEME' });
});


//GET function for meme route from homepage 
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


//POST function to add meme to database and display it on top 100 memes
router.post('/memes',function(req,res,next){
  var newMeme = {
    name: req.body.name,
    caption: req.body.caption,
    memeurl: req.body.memeurl
  };

  mongo.connect(url,function(err,client){
    if(err) return err;
    else console.log("Database connected");
    var database = client.db('test');
    database.collection('data').findOne(newMeme,function(err, result){
      if(err)return err;
      if(result!=null) res.status(409).json("post already exists");
      else{
        database.collection('data').insertOne(newMeme, function(err,result){
         if(err) return err;
        console.log('New Meme Inserted');
       });
       res.redirect('/memes')
  }
      client.close();      
    
  });

  
});
});


//GET function to display a particular meme using it's id
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


//GET function to edit the memes
router.get('/memes/edit/:id', function(req, res) {
  var id=req.params.id;
  console.log(id);
  res.render('edit',{id:id});
});


//POST function to save the edited meme 
router.post('/memes/edit/:id', function(req, res) {
  var id=req.params.id;
  
  mongo.connect(url,function(err,client){
    if(err) return err;
    else console.log("Database connected");
    var database = client.db('test');
    const filter = { _id: ObjectId(id) };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
       caption:req.body.caption,memeurl:req.body.memeurl
      },
    };
    const result=database.collection('data').updateOne(filter, updateDoc, options);
      res.redirect('/memes');
    
      client.close();
      
    });
  });




module.exports = router;
