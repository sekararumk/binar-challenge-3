/*
/* passport-config.js berisi setting object passport yang akan melakukan autentikasi aplikasi
/*/

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = (passport, getUserByName, getUserById) => {
  
  const authenticateUser = async (username, password, done) => {
    // Mencari user yang memiliki username pada global.users
    const user = getUserByName(username)

    // Jika user tidak ditemukan 
    if ( user == null ) {
      return done(null, false, {message: 'User tidak ditemukan'}) // autentikasi FALSE & mengirim pesan error
    }

    // Jika user ditemukan 
    try {
      // Mengecek apakah password hash benar atau tidak
      if ( await bcrypt.compare(password, user.password) ) {
        // autentikasi TRUE & mengirim object user sebagai data pada session
        return done(null, user)
      } else {
        // autentikasi FALSE & mengirim pesan error
        return done(null, false, {message: 'Password salah'})
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(
    new LocalStrategy(
      { usernameField: 'username', password: 'password'},
      authenticateUser
    )
  )
  passport.serializeUser( (user, done) => done(null, user.id) )
  passport.deserializeUser( (id, done) => {
    return done(null, getUserById(id))
  })
  
}