const { body, param } = require('express-validator')

const ordemServicoValidationRules = () => [
    body('nome_cliente').isString().bail().trim().notEmpty().withMessage('O nome do cliente é obrigatório'),
    body('nome_funcionario').isString().bail().trim().notEmpty().withMessage('O nome do funcionário é obrigatório'),
    body('servico').isString().bail().trim().notEmpty().withMessage('O serviço é obrigatório'),
    body('valor_servico').isString().bail().trim().isFloat({ min: 0 }).withMessage('Informe um valor de serviço válido'),
    body('status').isString().bail().trim().notEmpty().withMessage('O status é obrigatório')
]

const idValidationRules = () => [
    param('id').isInt({ min: 1 }).withMessage('Informe um ID válido')
]

module.exports = { ordemServicoValidationRules, idValidationRules }
