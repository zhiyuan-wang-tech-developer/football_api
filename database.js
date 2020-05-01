const Sequelize = require('sequelize')
const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/postgres'
const database = new Sequelize(databaseURL)

database
    .sync()
    .then(() => console.log('Database schema updated'))
    .catch(console.error)

module.exports = database