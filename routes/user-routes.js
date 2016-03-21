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
//'{"name":"Kimi Raikkonen", "raceWins":20}'
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
      // User.
    })
    .post((req, res) => {
      User.findbyId(req.params.id, req.body, {new: true}, (err, user) => {

      })
    });
}
