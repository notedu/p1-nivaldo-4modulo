const User = require('../models/Users')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, password } = req.body

        try {
            const userExists = await User.findOne({ where: { email: email } })
            if (userExists) {
                return res.status(422).json({ message: 'Usuário já cadastrado, utilize outro e-mail' })
            }

            // Salvar o hash da senha, em vez da senha original.
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            await User.create({ name: name, email: email, password: passwordHash })
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(422).json({ message: 'Usuário já cadastrado, utilize outro e-mail' })
            }
            return res.status(500).json({ message: 'Não foi possível cadastrar o usuário' })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ where: { email: email } })
            if (!user) {
                return res.status(401).json({ message: 'E-mail ou senha inválidos' })
            }

            // Comparar a senha recebida com o hash armazenado no banco.
            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                return res.status(401).json({ message: 'E-mail ou senha inválidos' })
            }

            return createUserToken(user, req, res)
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível realizar o login' })
        }
    }
}
