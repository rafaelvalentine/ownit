const express = require('express')
const router = express.Router()
const database = require('../models')

const routeHelpers = require('../helpers/routeHelpers')

router.route('/')
    .get(routeHelpers.getUsers)
    .post(routeHelpers.addUser)

router.route('/:userid')
    .get(routeHelpers.findUser)
    .put(routeHelpers.updateUser)
    .delete(routeHelpers.deleteUser)

module.exports = router