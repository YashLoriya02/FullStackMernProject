const express = require('express')
const { getAllUsers, getAllContacts, deleteUser, deleteContact, UpdateUser, getUser, replyToUser } = require('../controllers/admin-controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')
const router = express.Router()

router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers)
router.route('/users/:id').get(authMiddleware, adminMiddleware, getUser)
router.route('/users/:email').delete(authMiddleware, adminMiddleware, deleteUser)
router.route('/users/:id').patch(authMiddleware, adminMiddleware, UpdateUser)

router.route('/contact').get(authMiddleware, adminMiddleware, getAllContacts)
router.route('/contact/:email').delete(authMiddleware, adminMiddleware, deleteContact)
router.route('/contact/reply/:id').post(authMiddleware, adminMiddleware, replyToUser)


module.exports = router
