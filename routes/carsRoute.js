const express = require('express')
const router = express.Router()

const routeHelpers = require('../helpers/routeHelpers')
const multer = require('multer')
const date = new Date()
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
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

router.route('/:userid')
    .get(routeHelpers.findUser)
    .put(routeHelpers.updateUser)
    .delete(routeHelpers.deleteUser)
    // router.route('/login')
    //     .get(routeHelpers.getAdmin)
    //     .post(routeHelpers.addAdmin)

module.exports = router