const express = require('express')
const { Router } = express
const cityModel = require('./model')

const router = new Router()

// To read all the cities
router.get('/city', (req, res, next) => {
    cityModel.findAll()
        .then(cities => res.send(cities))
        .catch(next)
})

// To read one city by id
router.get('/city/:id', (req, res, next) => {
    const cityID = req.params.id
    cityModel.findByPk(cityID)
        .then(city => {
            if (city) {
                res.json(city)
            } else {
                res.send(`Can not find city with ID = ${cityID}`)
            }
        })
        .catch(next)
})

// To create a new city
router.post('/city', (req, res, next) => {
    cityModel.create(req.body)
        .then(newCityRow => {
            res.set('Content-Type', 'application/json').json(newCityRow)
        })
        .catch(next)
})

// To update one city by id
router.put('/city/:id', (req, res, next) => {
    const cityID = req.params.id
    cityModel.update(req.body,
        {
            where: {
                id: cityID
            }
        })
        .then(affectedRows => {
            res.send(`Success in updating ${affectedRows[0]} rows`)
        })
        .catch(next)
})

module.exports = router