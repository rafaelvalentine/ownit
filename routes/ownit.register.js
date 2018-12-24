const express = require('express')
const router = express.Router()
const ensureAuthenticated = require('../helpers/Auth.js')
const routeHelpers = require('../helpers/routeHelpers')

router.route('/')
    .get(ensureAuthenticated, routeHelpers.getUsers)
    .post(routeHelpers.addUser)

router.route('/:userid')
    .get(routeHelpers.findUser)
    .put(ensureAuthenticated, routeHelpers.updateUser)
    .delete(ensureAuthenticated, routeHelpers.deleteUser)

module.exports = router