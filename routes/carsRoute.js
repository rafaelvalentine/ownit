const express = require('express')
const router = express.Router()
const database = require('../models')
const routeHelpers = require('../helpers/routeHelpers')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    cb(null, false)
}
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
})
router.route('/')
    .get(routeHelpers.getCars)
    .post(uploads.single('carImage'), routeHelpers.addCar)

router.route('/:carid')
    .get(routeHelpers.findCar)
    .put(uploads.single('carImage'), routeHelpers.updateCar)
    .delete(routeHelpers.deleteCar)


module.exports = router