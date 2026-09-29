//requerer o siquelize
const Sequelize = require("sequelize");

//parametros de conexão
const conn = new Sequelize(
    `${process.env.DB_NAME}`, 
    `${process.env.DB_USER}`, 
    `${process.env.DB_PASSWORD}`, {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }
)

// A conexão e a criação das tabelas são verificadas no server.js com conn.sync().

module.exports = conn;
