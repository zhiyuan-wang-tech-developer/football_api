const express = require('express')
const { Router } = express
const teamModel = require('./model')

const router = new Router()

router.get('/team', (req, res, next) => {
    teamModel.findAll()
        .then(teams => res.send(teams))
        .catch(next)
})

router.get('/team/:id', (req, res, next) => {
    const teamID = req.params.id
    teamModel.findByPk(teamID)
        .then(team => {
            if (team) {
                res.json(team)
            } else {
                res.send(`Can not find team with ID = ${teamID}`)
            }
        })
        .catch(next)
})

router.post('/team', (req, res, next) => {
    teamModel.create(req.body)
        .then(newTeamRow => {
            res.set('Content-Type', 'application/json').json(newTeamRow)
        })
        .catch(next)
})

module.exports = router