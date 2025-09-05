const {
    loginUser,
    register,
    logoutUser,
    deleteUser,
    getUserById,
    getAllUsers,
    updateUser
} = require('../Controller/UserController')

const route = require('express').Router()

route.post('/login', loginUser)
route.post('/register', register)
route.post('/logout', logoutUser)
route.delete('/:id', deleteUser)
route.get('/:id', getUserById)
route.get('/', getAllUsers)
route.put('/user/:id', updateUser)
module.exports = route