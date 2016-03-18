'use strict';
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/User.js');

var s3 = new AWS.S3();
