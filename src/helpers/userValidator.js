const { body, validationResult } = require('express-validator')

const registerValidationRules = () => [
    body('name').isString().bail().trim().notEmpty().withMessage('O nome é obrigatório'),
    body('email').isString().bail().trim().isEmail().withMessage('Informe um e-mail válido'),
    body('password').isString().bail().notEmpty().withMessage('A senha é obrigatória')
        .bail().custom(value => Buffer.byteLength(value, 'utf8') <= 72)
        .withMessage('A senha deve ter no máximo 72 bytes')
]

const loginValidationRules = () => [
    body('email').isString().bail().trim().isEmail().withMessage('Informe um e-mail válido'),
    body('password').isString().bail().notEmpty().withMessage('A senha é obrigatória')
        .bail().custom(value => Buffer.byteLength(value, 'utf8') <= 72)
        .withMessage('A senha deve ter no máximo 72 bytes')
]

// Retornar o primeiro erro
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(422).json({ message: errors.array()[0].msg })
}

module.exports = { registerValidationRules, loginValidationRules, validate }
