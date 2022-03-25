const express = require('express')
const router = express.Router()
const carsController = require('../controllers/cars')

router.use( (req,res,next) => {
    req.app.set('layout', 'layouts/side_bar')  
    next()
})

router.get('/', carsController.default )
router.get('/add',carsController.add )
router.get('/edit', carsController.edit )

module.exports = router