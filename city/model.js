const Sequelize = require('sequelize')
const database = require('../database')

const City = database.define(
    'city',
    {
        name: {
            type: Sequelize.STRING,
            field: 'city_name'
        },
        population: {
            type: Sequelize.INTEGER,
            field: 'city_population'
        }
    },
    {
        tableName: 'cities'
    }
)

module.exports = City