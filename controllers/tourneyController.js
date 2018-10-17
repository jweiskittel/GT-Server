const router = require('express').Router()
const Tourney = require('../db').import('../models/tourneyModel')
const validateSession = require('../middleware/validate-session')

router.get('/', (req, res) => {
    Tourney.findAll()
    .then(response => res.status(200).json(response))
})

router.get('/register/:id', validateSession, (req, res) => {
    Tourney.findOne({where: {id: req.params.id}})
    .then(response => res.json(response))
})

router.post('/create', validateSession, (req, res) => {
    let location = req.body.location
    let date = req.body.date
    let format = req.body.format
    let userid = req.user.id

    Tourney.create({
        location: location,
        date: date,
        format: format,
        owner: userid
    })
    .then(
        createSuccess = () => res.send('Event successfully created'),
        createError = (err) => res.send(500, `Format must be either 'Stroke' or 'Match'`)
    )
})

router.put('/update/:id', validateSession, (req, res) => {
    Tourney.update(req.body, {where: {owner: req.user.id, id: req.params.id}})
    .then(
        updateSuccess = () => res.send('Event successfully updated'),
        updateError = (err) => res.send('You do not have access to this event')
    )
})

router.delete('/delete/:id', validateSession, (req, res) => {
    Tourney.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(response => console.log(response))
})

module.exports = router