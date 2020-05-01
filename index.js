const express = require('express')
const bodyParser = require('body-parser')
// const database = require('./database')
// const teamModel = require('./team/model')
const teamRouter = require('./team/router')
const app = express()
const port = process.env.PORT || 4000
const jsonBodyParser = bodyParser.json()

app.use(jsonBodyParser)
app.use(teamRouter)
app.listen(port, () => console.log(`Server is listening on port ${port}...`))