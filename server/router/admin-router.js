const express = require('express')
const { getAllUsers, getAllContacts, deleteUser, deleteContact } = require('../controllers/admin-controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')
const router = express.Router()


router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers)
router.route('/users/:email').delete(authMiddleware, adminMiddleware, deleteUser)
router.route('/contact').get(authMiddleware, adminMiddleware, getAllContacts)
router.route('/contact/:email').delete(authMiddleware, adminMiddleware, deleteContact)

module.exports = router
