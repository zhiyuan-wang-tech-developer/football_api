const express = require('express')
const { Router } = express
const teamModel = require('./model')
const cityModel = require('../city/model')

const router = new Router()

// To read all the teams
router.get('/team', (req, res, next) => {
    teamModel.findAll({
        include: [cityModel]
    })
        .then(teams => res.send(teams))
        .catch(next)
})

// To read one team by id
router.get('/team/:id', (req, res, next) => {
    const teamID = req.params.id
    teamModel.findByPk(teamID,
        {
            // To include the city inside the team
            include: [cityModel]
        })
        .then(team => {
            if (team) {
                res.json(team)
            } else {
                res.send(`Can not find team with ID = ${teamID}`)
            }
        })
        .catch(next)
})

// To create a new team
router.post('/team', (req, res, next) => {
    teamModel.create(req.body)
        .then(newTeamRow => {
            res.set('Content-Type', 'application/json').json(newTeamRow)
        })
        .catch(next)
})

// To update one team by id
router.put('/team/:id', (req, res, next) => {
    const teamID = req.params.id
    teamModel.update(req.body,
        {
            where: {
                id: teamID
            }
        })
        .then(affectedRows => {
            res.send(`Success in updating ${affectedRows[0]} rows`)
        })
        .catch(next)
})

module.exports = router