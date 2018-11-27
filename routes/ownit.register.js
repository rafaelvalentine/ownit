const express = require('express')
const router = express.Router()

const routeHelpers = require('../helpers/routeHelpers')

router.route('/')
    .get(routeHelpers.getUsers)
    .post(routeHelpers.addUser)

router.route('/:userid')
    .get(routeHelpers.findUser)
    .put(routeHelpers.updateUser)
    .delete(routeHelpers.deleteUser)
    // router.route('/login')
    //     .get(routeHelpers.getAdmin)
    //     .post(routeHelpers.addAdmin)


module.exports = router