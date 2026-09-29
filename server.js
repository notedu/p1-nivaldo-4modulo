require('dotenv').config()
const express = require('express')
const cors = require('cors')
const conn = require('./src/db/conn')
const userRoutes = require('./src/routes/userRoutes')
const ordemServicoRoutes = require('./src/routes/ordemServicoRoutes')

const api = express()

api.use(express.json())
api.use(cors({ credentials: true, origin: 'http://localhost:3030' }))

api.use('/users', userRoutes)
api.use('/ordens-servico', ordemServicoRoutes)

// O segredo assina os tokens gerados no login.
if (!process.env.CHAVETOKEN) {
    throw new Error('Defina CHAVETOKEN no arquivo .env')
}

// Os models são carregados pelas rotas antes da criação das tabelas.
conn.sync()
    .then(() => {
        api.listen(3030, () => {
            console.info('API disponível em http://localhost:3030')
        })
    })
    .catch(error => {
        console.error('Não foi possível iniciar a API:', error.message)
        process.exitCode = 1
    })
