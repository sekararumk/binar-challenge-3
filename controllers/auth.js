const bcrypt = require('bcrypt')
const passport = require('passport')
const passportInit = require('../passport-config')

passportInit(
  passport,
  username => users.find( user => user.username === username),
  id => users.find( user => user.id === id)
)

module.exports = {
  login: (req,res) => res.render('auth/login'),
  register: (req,res) => res.render('auth/register'),
  post: {
    login: passport.authenticate('local', {
      successRedirect: '/dashboard', // ketika autentikasi berhasil akan redirect ke path ini
      failureRedirect: '/auth/login', // ketika autentikasi gagal akan redirect ke path ini
      failureFlash: true
    }),
    register: async (req, res) => {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      try {
        users.push({
          id: Date.now().toString(),
          username: req.body.username,
          password: hashedPassword
        })
        res.redirect('/auth/login')
      } catch (error) {
        res.redirect('/auth/register')
      }

      console.log(users)
    }
  }
}