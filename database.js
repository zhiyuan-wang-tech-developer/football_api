const Sequelize = require('sequelize')
const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/postgres'
const database = new Sequelize(databaseURL)

// Sync all defined models to the database
database
    .sync({
        // To force changes into previously created tables even though it results in data loss
        // If force: true, your tables are dropped on every restart, deleting all data.
        force: false
    })
    .then(() => console.log('Database schema updated'))
    .catch(console.error)

module.exports = database