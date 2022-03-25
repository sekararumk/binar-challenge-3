const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')

router.use( (req,res,next) => {
    req.app.set('layout', 'layouts/side_bar')  
    next()
})

router.get('/', dashboardController.default )

module.exports = router