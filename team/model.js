const Sequelize = require('sequelize')
const database = require('../database')

const Team = database.define(
    'team',
    {
        name: {
            type: Sequelize.STRING,
            field: 'team_name'
        }
    },
    {
        tableName: 'football_teams'
    }
)

module.exports = Team