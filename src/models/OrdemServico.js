//requerer somente o metodo DataTypes do Sequelize
const { DataTypes } = require("sequelize");
//requerer a conexão com banco
const conn = require("../db/conn");

// Definir os campos da Ordem de Serviço.
const OrdemServico = conn.define("ordem_servico", {
    nome_cliente: {
       type: DataTypes.STRING,
       allowNull: false
    },
    nome_funcionario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    servico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor_servico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = OrdemServico;
