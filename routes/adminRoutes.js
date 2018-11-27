const express = require('express')
const router = express.Router()

const routeHelpers = require('../helpers/routeHelpers')

// GET route for reading data
// router.get('/', function (req, res, next) {
//   return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
// });


router.route('/')
    .post(routeHelpers.addAdmin)


//POST route for updating data
//router.post('/', )

// GET route after registering
router.get('/dashboard', routeHelpers.loggedAdmin)

// GET for logout logout
router.get('/logout', routeHelpers.logoutAdmin)

module.exports = router