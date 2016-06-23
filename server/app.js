//NOTE: This is a "headless" back-end. It is set up to test the server connections/functions to the database without the use of a Front-end or client side.
//REST Client was used for the purposes of testing, Nodemon was helpful, as well.
//These are very basic hard-coded paths built to provide a simple template for REST methods.
//mongoose has been used for the purposes of interacting with the mongodb database.

var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var app = express();

var User = require( '../models/users' );

mongoose.connect( 'mongodb://localhost:27017/userDb' );

//parse json
app.use( bodyParser.json());  //This method applies the body-parser to all routes. (?)

app.get( '/all', function( req, res ) {
  User.find({}, function( err, usersList ) {
    if( err ) {
      console.log( err );
      res.sendStatus( 500 );
    }else{
      res.send( usersList );
    }
  });
});

app.get( '/samplePath', function( req, res ) {

  var nick = new User({
    name: 'Nick',
    username: 'Overlord00',
    password: 'thisisasamplepassword'
  });

  nick.save( function( err ) {
    if( err ) {
      console.log( err );
      res.sendStatus( 500 );
    }else{
      console.log( 'User saved successfully.' );
      res.sendStatus( 200 );
    }
  });
});

app.post( '/create', function( req, res ) {
  console.log( 'hit create' );
  console.log( 'req.body: ' + req.body );
  res.sendStatus( 200 );

  var newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        console.log('User saved successfully!');
        res.sendStatus(200);
      }
    });
  });

  app.put( '/updateNick', function( req, res ) {
    console.log( 'hit put route- updateNick' );
    User.findOne({ name: 'nick'}, function( err, userResult ) {
      if( err ) {
        console.log( err );
        res.sendStatus( 500 );
      }else{
        userResult.name = "Nick Okey";
        userResult.admin = false;
        userResult.save( function( err ) {
          if( err ) {
            console.log( err );
            res.sendStatus( 500 );
          }else{
            console.log( 'Update user = ', userResult._id);
            res.send( userResult._id);
            res.sendStatus( 200 );
          }
      });
    }
  });
});

app.delete( '/deleteNick', function( req, res ) {
  console.log( 'delete route' );
  User.findOne({ username: 'nick'}, function( err, userResult ) {
    if( err ) {
      console.log( err );
      res.sendStatus( 500 );
    }else{
      User.remove({_id: user._id}, function( err ) {});
        res.sendStatus( 200 );
    }
  });
});

app.listen( 3000, function() {
  console.log( 'Hailing frequencies open, Captain. Listening on PORT 3000.' );
});
