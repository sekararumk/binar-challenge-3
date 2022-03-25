const bcrypt = require('bcrypt')

global.users = [
  {
    id: 1,
    username: 'username',
    password: bcrypt.hash('password', 10)
  }
]

// import express layouts
const expressLayouts = require('express-ejs-layouts')
// import express
const express = require('express')
const app = express()
const port = 1500
const routers = require('./routers')

// Module untuk autentikasi
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
app.use(express.urlencoded({ extended: false})) // untuk mengirim data dari form melalui parameter req
app.use(express.json())

// Middleware untuk autentikasi & session
app.use(flash())
app.use(session({
  secret: 'fejsbinar',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use( (req, res, next) => {
  req.app.set('layout','layouts/default')
  next()
})

// setup view engine
app.set('view engine', 'ejs')

// express layouts ejs sebagai middleware
app.use(expressLayouts)

app.use( (req, res, next) => {
    req.app.set('layout','layouts/default')
    next()
  })

// setup public folder
app.use(express.static('public'))

// default route
app.get('/', (req,res) => {
    res.render('auth/login')
})

app.use('/auth/', routers.auth)
app.use('/dashboard/', routers.dashboard)
app.use('/cars/', routers.cars)


app.listen(port, () => { console.log(`localhost:${port} is running...`)})