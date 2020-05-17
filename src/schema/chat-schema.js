const mongoose = require('mongoose')

module.exports.ChatSchema = new mongoose.Schema({
  'idUser': String,
  'author': String,
  'message': String,
  'friend': String,  
  'createdAt': {
    'type': Date,
    'index': true
    },
  'updatedAt': {
    'type': Date,
    'index': true
    },
}) 

module.exports.ChatDefault = function getDefault(){
    return{

  'type': null,
  'content': null,
  'id': null,
  'friend': null, 
}
}