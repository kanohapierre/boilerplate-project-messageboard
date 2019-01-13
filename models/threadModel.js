// require mongoose and mongoose.Schema 
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// create thread schema

// When nesting objects that you define "inline", 
// Mongoose creates schemas for each of those objects behind the scenes.
// In our case we will have id for all our replies object

const threadSchema = new Schema({
  board           : {type: 'string', required: true},
  text            : {type: 'string', required: true},
  delete_password : {type: 'string', required: true},
  created_on      : { type: Date, default: Date.now },
  bumped_on       : { type: Date, default: Date.now },
  reported        : Boolean,
  replies         : [{text: String,created_on: { type: Date, default: Date.now }, reported: Boolean, delete_password: String}],
  replycount      : Number
})

// we need to convert our threadSchema into a Model we can work with. 
// To do so, we pass it into mongoose.model(modelName, schema):

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;