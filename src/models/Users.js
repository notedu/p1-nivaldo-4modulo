const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

// Tabela auxiliar para cadastrar os usuários que acessam a API.
const User = conn.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User
