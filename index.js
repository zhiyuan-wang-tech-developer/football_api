const express = require('express')
const bodyParser = require('body-parser')
const teamRouter = require('./team/router')
const playerRouter = require('./player/router')
const cityRouter = require('./city/router')
const app = express()
const port = process.env.PORT || 4000
const jsonBodyParser = bodyParser.json()

app.use(jsonBodyParser)
app.use(teamRouter)
app.use(playerRouter)
app.use(cityRouter)

app.get('/', (req, res, next) => {
    res.send('<h1>Football API Homepage</h1>')
})

app.listen(port, () => console.log(`Server is listening on port ${port}...`))