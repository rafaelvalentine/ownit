const mongoose = require('mongoose')
mongoose.set('debug', true)

let dev_db_url = 'mongodb://ownit-africa_db:ownit_africa4life@ds135413.mlab.com:35413/ownit-africa_test-db'
let mongoDB = process.env.MONGO_URI || dev_db_url
mongoose.connect('mongodb://localhost/ownit-api' || mongoDB, {
    useCreateIndex: true,
    useNewUrlParser: true
})

mongoose.Promise = Promise

module.exports.Admins = require('./admins')
module.exports.Ownit = require('./ownit')