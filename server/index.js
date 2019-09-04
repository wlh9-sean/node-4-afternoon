require('dotenv').config()
const express = require('express')
const session = require('express-session')

const checkForSession = require('./middleware/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')

const {SESSION_SECRET, SERVER_PORT} = process.env

const app=express()


app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

app.use(checkForSession.checkUser)

app.get('/api/swag', swagCtrl.getSwag)

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.addToCart)
app.delete('/api/cart/:id', cartCtrl.deleteFromCart)


app.listen(SERVER_PORT, () => {
    console.log(`Serving on port ${SERVER_PORT}`)
})