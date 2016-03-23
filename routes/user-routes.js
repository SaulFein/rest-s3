'use strict';

var mongoose = require('mongoose');
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/User.js');

'use strict';

module.exports = (router, models) => {

  // let User = models.User;

  router.route('/users')
    .get((req, res) => {
      User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.json({data: users});
      });
    })
    .post((req, res) => {
      var newUser = new User({
        username: req.body.username,
        files: []
      });
      newUser.save((err, user) => {
        if (err) return res.send(err);
        res.json({msg:'New user "' + req.body.username + '" has been created'});
      });
    });
//'{"username":"Kimi Raikkonen", "files":[]}'
  router.route('/users/:id')
    .get((req, res) => {
      User.findById(req.params.id, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
      });
    })
    .put((req, res) => {
      User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
      });
    })
    .delete((req, res) => {
      User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.send(err);
        res.json({message: 'User Removed'})
      });
    });

  router.route('/users/:id/files')
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.send(err);
      res.status(200).json(user.files);
    });
  })
  .post((req, res) => {
    let fileJSON = {
      Key: req.params.id + '/' + req.body.name,
      Body: req.body.content
    };
    s3Services.upload(fileJSON, (err, data) => {
      if (err) return res.send(err);

      var s3File = {
        name: data.key,
        url: data.Location,
        content: req.body.content
      };

      var newFile = new File(s3File);
      newFile.save((err, file) => {
        if (err) return res.send(err);
        User.findById(req.params.user)
          .populate('files')
          .exec((err, user) => {
            user.files.push(file._id);
            if (err) return res.send(err);
            res.status(200).json(user);
          });
      });
    });
  });
}
