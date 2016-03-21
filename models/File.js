'use strict';
module.exports = function(mongoose, models) {

  // const mongoose = require('mongoose');
  const fileSchema = new mongoose.Schema({
    name: String,
    content: String,
    url: String
  });

  let File = mongoose.model('File', fileSchema);
  models.File = File
}
