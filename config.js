const LocalStrategy = require('passport-local').Strategy;
const bcrypt  = require('bcrypt')

function intialize(passport,getUserByEmail){
    const authenticateUser = (email,password,done)=>{
        const user = getUserByEmail(email)
        if(user ==null){
            return done(null,false,{message:'no user with that email'})
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }else{
                return done(null,false, { meassge:'it is not working'})
            }
        }catch(e){
            return done(e)
        }
    }
passport.use(new LocalStrategy({usernameField:'email'}),authenticateUser)
passport.serializeUser((user,done)=>{

})
passport.deserializeUser((id,done)=>{

})
}
module.exports = initialize 