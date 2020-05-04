const express = require('express')
const { Router } = express
const playerModel = require('./model')
const teamModel = require('../team/model')
const cityModel = require('../city/model')

const router = new Router()

// To read all the players
router.get('/player', (req, res, next) => {
    // console.log(req.query)
    if (Object.keys(req.query).length === 0) {
        // No query parameter in route and return all players
        playerModel.findAll()
            .then(players => res.send(players))
            .catch(next)
    }
    else if (Object.keys(req.query).length === 1) {
        // The route contains a query parameter
        // GET /player?team=xxx
        if (req.query.team) {
            teamModel.findOne({
                where: {
                    name: req.query.team
                }
            })
                .then(team => {
                    if (team) {
                        playerModel.findAll({
                            where: {
                                teamId: team.id
                            }
                        })
                            .then(players => {
                                res.json(players)
                            })
                            .catch(next)
                    }
                    else {
                        res.send(`Can not find player from team ${req.query.team}!`)
                    }
                })
                .catch(next)
        }
        // GET /player?city=xxx
        else if (req.query.city) {
            cityModel.findOne({
                where: {
                    name: req.query.city
                }
            })
                .then(city => {
                    if (city) {
                        playerModel.findAll({
                            where: {
                                cityId: city.id
                            }
                        })
                            .then(players => {
                                res.json(players)
                            })
                            .catch(next)
                    }
                    else {
                        res.send(`Can not find player from city ${req.query.city}!`)
                    }
                })
                .catch(next)
        }
        else {
            res.send('Route query parameter error')
        }
    }
    else {
        // The route contains more than one route parameter
        res.send('Only one route query parameter is allowed!')
    }
})

// To read one player by id
router.get('/player/:id', (req, res, next) => {
    const playerID = req.params.id
    playerModel.findByPk(playerID,
        {
            // To include team and city inside the player
            include: [teamModel, cityModel]
        })
        .then(player => {
            if (player) {
                res.json(player)
            } else {
                res.send(`Can not find player with ID = ${playerID}`)
            }
        })
        .catch(next)
})

// To create a new player
router.post('/player', (req, res, next) => {
    playerModel.create(req.body)
        .then(newPlayerRow => {
            res.set('Content-Type', 'application/json').json(newPlayerRow)
        })
        .catch(next)
})

// To update one player by id
router.put('/player/:id', (req, res, next) => {
    const playerID = req.params.id
    playerModel.update(req.body,
        {
            where: {
                id: playerID
            }
        })
        .then(affectedRows => {
            res.send(`Success in updating ${affectedRows[0]} rows`)
        })
        .catch(next)
})

module.exports = router