const express = require('express')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const app = express()
const path = require('path')
const session = require('express-session')
    //const MongoStore = require('connect-mongo')(session)
let port = process.env.PORT;
if (port == null || port == "") {
    port = 6060;
}



// const mongoose = require('mongoose')
// mongoose.set('debug', true)
// mongoose.connect('mongodb://localhost/ownit-api', {
//     useCreateIndex: true,
//     useNewUrlParser: true
// })

var db = require('./models/index')
const ownitRoute = require('./routes/ownit.register')
const adminRoute = require('./routes/adminRoutes')
const carRoute = require('./routes/carsRoute')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



// use sessions
// for tracking logins
// app.use(session({
//     secret: 'Hard Work always pays',
//     resave: true,
//     saveUninitialized: false,
//     // store: new MongoStore({
//     //     mongooseConnection: db
//     // })
// }))

// app.use(flash());

// //Global variables
// app.use(function(req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     res.locals.user = req.user || null;
//     next();
// });


// // GET route for reading data
app.get('/', (req, res) => {
        res.sendFile('index.html')
    })
    // app.get('/dashboard', (req, res) => {
    //     // res.sendFile(path.join(__dirname + '/views/sign-in.html'))
    //     res.sendFile('dashboard.html')
    // })

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/sign-up.html'))
})


app.use('/api/ownit', ownitRoute)
app.use('/api/cars', carRoute)
app.use('/', adminRoute)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('File Not Found')
//     err.status = 404
//     next(err)
// })


app.listen(port)
    // app.listen(port, function() {
    //     console.log('THIS APP IS RUNNING ON PORT ' + port)
    // })