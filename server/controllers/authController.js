const users = require('./../models/users')

let id = 1

const login = (req, res) => {
    const {username, password} = req.body
    const {session} = req

    let currentUser = users.filter(user => {
        if(user.username === username){
            return user
        }
    })
            
    if(currentUser.length === 0){
        res.status(403).send('Not signed in')
        return;
    }

    if(currentUser[0].password === password){
        delete currentUser[0].password
        req.session.user = currentUser[0]
        res.status(200).send(req.session.user)
    } else {
        res.status(500).send('You really muffed up! ')
    }
}

const register = (req, res) => {
    const {username, password} = req.body
    const {session} = req

    users.push({id, username, password})
    id++

    session.user.username = username
    res.status(200).send(session.user)
}   

const signout = (req, res) => {
    req.session.destroy()
    res.status(200).send(req.session)
}   

const getUser = (req, res) => {
    const {session} = req
    res.status(200).send(session.user)
}



module.exports = {
    login,
    register,
    signout,
    getUser
}