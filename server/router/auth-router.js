const express = require('express')
const authControllers = require('../controllers/auth-controller')
const router = express.Router()
const {signupSchema, signinSchema} = require("../validators/auth-validators")
const validate = require('../middlewares/validate-middleware')
const authMiddleware = require("../middlewares/auth-middleware")
const { changePasswordUser } = require('../controllers/auth-controller')

router.route('/').get(authControllers.home)
router.route('/register').post(validate(signupSchema), authControllers.register)
router.route('/login').post(validate(signinSchema), authControllers.login)
router.route('/forgotPassword/:mail').get(authControllers.sendMail)
router.route('/user').get(authMiddleware, authControllers.user)
router.route('/users/changePassword/:id').patch(authMiddleware, changePasswordUser)

module.exports = router
