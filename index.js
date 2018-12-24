const express = require('express')
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const app = express()
const path = require('path')
const passport = require('passport')
const session = require('express-session')
    // const MongoStore = require('connect-mongo')(session)
let port = process.env.PORT;
if (port == null || port == "") {
    port = 6060;
}


var db = require('./models/index')
const ownitRoute = require('./routes/ownit.register')
const adminRoute = require('./routes/adminRoutes')
const carRoute = require('./routes/carsRoute')

// Passport Config
const passportFunc = require('./config/passport')
passportFunc(passport)

// bodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'))

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



// use sessions for tracking logins
app.use(session({
    secret: 'Hard Work always pays',
    resave: true,
    saveUninitialized: true
        // store: new MongoStore({
        //     mongooseConnection: db
        // })
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

//Global variables
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

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/sign-up.html'))
})


app.use('/api/ownit', ownitRoute)
app.use('/api/cars', carRoute)
app.use('/', adminRoute)



app.listen(port)