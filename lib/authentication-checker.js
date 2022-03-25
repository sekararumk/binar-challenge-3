module.exports = {
    isUserAuthenticated: (req, res, next) => {
      if ( req.isAuthenticated() ) {
        
        next()
      } else {
        res.redirect('/auth/login')
      }
    },
    isUserNotAuthenticated: (req, res, next) => {
      if ( !req.isAuthenticated() ) {
        next()
      } else {
        res.redirect('/dashboard')
      }
    }
  }