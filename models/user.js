'use strict';
const mongoose = require('mongoose');
module.exports = function (mongoose, models) {

}


let userSchema = new mongoose.Schema({
  username: String,
  files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
});

let User = mongoose.model('User', userSchema);
module.exports = User;
