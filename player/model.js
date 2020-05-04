const Sequelize = require('sequelize')
const database = require('../database')
const Team = require('../team/model')
const City = require('../city/model')

const Player = database.define(
    'player',
    {
        name: {
            type: Sequelize.STRING,
            field: 'player_name'
        },
        number: {
            type: Sequelize.INTEGER,
            field: 'player_number'
        }
    },
    {
        tableName: 'football_players'
    }
)

// Sequelize will automatically add a teamId column to the Player table 
Player.belongsTo(Team)
Player.belongsTo(City)

module.exports = Player