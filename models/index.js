const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/ownit-api')

mongoose.Promise = Promise

module.exports.Ownit = require('./ownit')