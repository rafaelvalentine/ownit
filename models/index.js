const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/ownit-api', {
    useCreateIndex: true,
    useNewUrlParser: true
})

mongoose.Promise = Promise

module.exports.Admins = require('./admins')
module.exports.Ownit = require('./ownit')