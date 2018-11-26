const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var path = require('path');
let port = 6060 || 3000


const ownitRoute = require('./routes/ownit.register')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

app.get('/dashboard', (req, res) => {
        // res.sendfile('views/dashboard.html')
        res.sendFile(path.join(__dirname + '/views/dashboard.html'))
    })
    // res.sendFile(path.join(__dirname + '/index.html'))
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.use('/api/ownit', ownitRoute)


app.listen(port, function() {
    console.log('THIS APP IS RUNNING ON PORT ' + port)
})