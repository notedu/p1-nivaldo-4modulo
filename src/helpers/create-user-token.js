const jwt = require('jsonwebtoken')

const createUserToken = (user, req, res) => {
    // O token identifica o usuário nas próximas requisições.
    const token = jwt.sign({ name: user.name, id: user.id }, process.env.CHAVETOKEN)
    return res.status(200).json({ token: token })
}

module.exports = createUserToken
