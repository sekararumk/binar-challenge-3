const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
// const authChecker = require('../lib/authentication-checker')

// router.use(authChecker.isUserNotAuthenticated)

router.get('/register', auth.register)
router.post('/register', auth.post.register)
router.get('/login', auth.login)
router.post('/login', auth.post.login)

module.exports = router