const express = require('express')
const router = express.Router()
const database = require('../models')
const routeHelpers = require('../helpers/routeHelpers')
const multer = require('multer')
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
    .post(uploads.single('carImage'), (req, res) => {
        // let path = req.file.path
        let mainBody = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            downpayment: req.body.downpayment,
            carImage: 'uploads\\' + req.body.make + '-' + req.body.model + '-' + req.body.year + '.jpg',
            weeklypayment: req.body.weeklypayment
        }
        console.log(req.headers)
        database.Car.create(mainBody)
            .then((newcar) => {
                console.log(newcar)
                    // res.send('Car has been added to database')
                res.redirect('/drive2own_cars')
            })
            .catch((err) => {
                res.send(err)
            })
    })

router.route('/:userid')
    .get(routeHelpers.findUser)
    .put(routeHelpers.updateUser)
    .delete(routeHelpers.deleteUser)
    // router.route('/login')
    //     .get(routeHelpers.getAdmin)
    //     .post(routeHelpers.addAdmin)

module.exports = router