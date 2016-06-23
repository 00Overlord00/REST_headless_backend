var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  password: { type: String },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

//First param is the collection name.
var User = mongoose.model( 'users', userSchema );

module.exports = User;
