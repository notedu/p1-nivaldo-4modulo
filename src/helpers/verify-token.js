const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // O cabeçalho deve ter o formato: Authorization: Bearer TOKEN.
    const authorization = req.headers.authorization
    const parts = authorization ? authorization.split(' ') : []

    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
        return res.status(401).json({ message: 'Acesso negado. Informe o token de autenticação' })
    }

    try {
        req.user = jwt.verify(parts[1], process.env.CHAVETOKEN)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' })
    }

    // Liberar a execução do controller somente depois de validar o token.
    return next()
}

module.exports = verifyToken
