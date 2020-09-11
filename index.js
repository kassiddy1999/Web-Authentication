if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const flash = require()
const intializePassport = require('./config')
const passport = require('passport')
initilizePassport(
    passport,email =>users.find(user => user.email === email)
)
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(pssport.initialize())
app.use(passport.session())
const users = []
app.set('view-engine','ejs')
app.use(express.urlencoded({extended: false}))
app.get('/',(req,res)=>{
    res.render('index.ejs',{name:'viktor'})
})
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.post('/login',passport.authenticate('local',{
     successRedirect:'/',
    failureRedirect:'/login',
    failureFlash :true
}))
app.get('/register',(res,req)=>{
    res.render('register.ejs')
})
app.post('/register',async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id : Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password :hashedPassword
        })
        res.redirect('/login')
    }catch{ 
        res.redirect('/register')
    }
    console.log(users)
})

app.listen(3000)