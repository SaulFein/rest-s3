'use strict';

var File = require(__dirname + '/../models/File.js');

module.exports = function (router) {
  router.route('/files/:file')
    .get((req, res) => {
      File.findById(req.params.id, (err, file) => {
        if (err) return res.send(err);
        res.json(file);
      });
    })
    .put((req, res) => {
      File.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, file) => {
        if (err) return res.send(err);
        res.json(file);
      });
    })
    .delete((req, res) => {
      File.findByIdAndRemove(req.params.id, (err, file) => {
        if (err) return res.send(err);
        res.json({message: 'File Deleted'})
      });
    });
};
