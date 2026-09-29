const route = require('express').Router()
const UserController = require('../controllers/userController')
const { registerValidationRules, loginValidationRules, validate } = require('../helpers/userValidator')

route.post('/register', registerValidationRules(), validate, UserController.register)
route.post('/login', loginValidationRules(), validate, UserController.login)

module.exports = route
