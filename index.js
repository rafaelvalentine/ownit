const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
let port = process.env.PORT;
if (port == null || port == "") {
    port = 6060;
}



const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/ownit-api', {
    useCreateIndex: true,
    useNewUrlParser: true
})

var db = mongoose.connection
const ownitRoute = require('./routes/ownit.register')
const adminRoute = require('./routes/adminRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

// use sessions for tracking logins
app.use(session({
    secret: 'Hard Work always pays',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/dashboard.html'))
})

// GET route for reading data

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/sign-in.html'))
})

app.get('/temp', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/test.html'))
})
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.use('/api/ownit', ownitRoute)

app.use('/api/admins', adminRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found')
    err.status = 404
    next(err)
})

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send(err.message)
})

app.listen(port)
    // app.listen(port, function() {
    //     console.log('THIS APP IS RUNNING ON PORT ' + port)
    // })