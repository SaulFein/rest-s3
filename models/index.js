const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)

let models = {}

require('./File')(mongoose, models)
require('./User')(mongoose, models)

module.exports = models
