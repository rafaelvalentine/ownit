const express = require('express')
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const app = express()
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const Nexmo = require('nexmo')
const socketio = require('socket.io')


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
app.use(passport.initialize())
app.use(passport.session())
    // app.use(flash());

//Global variables
// app.use(function(req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     res.locals.user = req.user || null;
//     next();
// });


/**
 *  GET route for Landing Page
 */
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

/**
 * Imported Routes
 */
app.use('/api/ownit', ownitRoute)
app.use('/api/cars', carRoute)
app.use('/', adminRoute)


// Start Server

const server = app.listen(port)


/** 
 *  Connect to Socket.io
 */

const io = socketio(server)
io.on('connection', client => {
    console.log('Connected!')
    client.on('disconnect', () => {
        console.log('Disconnected')
    })
})


/**
 * Call Nexom function
 */
const nexmo = new Nexmo({
    apiKey: '968450f6',
    apiSecret: 'OOUL9xBiQWLIEXB0'
}, { debug: true })


//Catch SMS from DASHBOARD
app.post('/users/sms', (req, res) => {
    const from = 'Ownit-Africa'
    const to = req.body.number
    const text = req.body.message
    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err)
        } else {
            console.log('this is the responseData:', responseData)
                // get Data for response

            const data = {
                id: responseData.messages[0]['message-id'],
                number: responseData.messages[0]['to']
            }

            //Emit to client
            io.emit('smsStatus', data)
        }
    })

})