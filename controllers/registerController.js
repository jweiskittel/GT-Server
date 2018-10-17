let router = require('express').Router()
let Register = require('../db').import('../models/registerModel')
const validateSession = require('../middleware/validate-session')

router.post('/register/:id', validateSession, (req, res) => {
    Register.create({
        user: req.user.id,
        event: req.params.id
    })
    // .then(res.json({message: 'You have successfully registered for this event! Go to your My Events page to see what tournaments you are registered for!'}))
})

router.delete('/unregister/:id', validateSession, (req, res) => {
    Register.destroy({where: {user: req.user.id, event: req.params.id}})
})

router.get('/register', validateSession, (req, res) => {
    Register.findAll({where: {user: req.user.id}})
    .then(response => res.json(response))
})

module.exports = router