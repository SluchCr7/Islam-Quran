const {
    loginUser,
    register,
    logoutUser,
    deleteUser,
    getUserById,
    getAllUsers,
} = require('../Controller/UserController')

const route = require('express').Router()

route.post('/login', loginUser)
route.post('/register', register)
route.post('/logout', logoutUser)
route.delete('/:id', deleteUser)
route.get('/:id', getUserById)
route.get('/', getAllUsers)

module.exports = route