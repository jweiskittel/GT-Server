const router = require('express').Router()
const User = require('../db').import('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

router.post('/signUp', (req, res) => {
    let fName = req.body.fName
    let lName = req.body.lName
    let email = req.body.email
    let password = req.body.password
    
    User.create({
        fName: fName,
        lName: lName,
        email: email,
        password: bcrypt.hashSync(password, 10)
    })
})

router.post('/signIn', (req, res) => {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({sessionToken: token, message: 'Login successful'})
                } else {
                    res.send({message: 'Try again'})
                }
            })
        } else {
            res.send({message: 'No user found with that email'})
        }
    })
})

module.exports = router