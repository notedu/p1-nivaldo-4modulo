const route = require('express').Router()
const OrdemServicoController = require('../controllers/ordemServicoController')
const verifyToken = require('../helpers/verify-token')
const { ordemServicoValidationRules, idValidationRules } = require('../helpers/ordemServicoValidator')
const { validate } = require('../helpers/userValidator')

// Todas as rotas abaixo exigem um token válido.
route.use(verifyToken)

route.post('/', ordemServicoValidationRules(), validate, OrdemServicoController.create)
route.get('/', OrdemServicoController.listAll)
route.get('/:id', idValidationRules(), validate, OrdemServicoController.listById)
route.patch('/:id', idValidationRules(), ordemServicoValidationRules(true), validate, OrdemServicoController.update)
route.delete('/:id', idValidationRules(), validate, OrdemServicoController.remove)

module.exports = route
