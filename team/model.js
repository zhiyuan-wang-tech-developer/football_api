const Sequelize = require('sequelize')
const database = require('../database')
const City = require('../city/model')

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

Team.belongsTo(City)

module.exports = Team