const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel')

passport.use(new LocalStrategy(async (usernameOrEmail, password, done) => { 

try {
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        })
    
    if(!user) {

        return done(null, false, { message: 'Invalid Username or Password.' })
    }
    

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) { 
        return done(null, false, { message: 'Invalid Username or Password.' })
    }
    
    return done(null, user)
} catch (error) {
    return done(error)
    }


}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => { 
    try {
        const user = await User.findById(id)
        if (!user) return done(null, false)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

module.exports = passport;