const { User, ValidateUser, LoginValidate } = require('../Modules/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const { cloudUpload, cloudRemove } = require('../Config/cloudUpload')
const fs = require('fs')

// ================== Login ==================
const loginUser = asyncHandler(async (req, res) => {
    const { error } = LoginValidate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ Email: req.body.Email })
    if (!user) return res.status(400).json({ error: "Email or Password are not Correct" })

    const validPassword = await bcrypt.compare(req.body.Password, user.Password)
    if (!validPassword) return res.status(400).json({ error: "Email or Password are not Correct" })

    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    const { Password, ...others } = user._doc

    // Save token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    res.status(200).json({ ...others })
})

// ================== Register ==================
const register = asyncHandler(async (req, res) => {
    const { error } = ValidateUser(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.Password, salt)
    req.body.Password = hash

    const user = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
    })
    await user.save()
    res.status(201).json({ message: "User Created Successfully" })
})

// ================== Logout ==================
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })
    res.status(200).json({ message: "Logged out successfully" })
})

// ================== Delete User ==================
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User is not Found" })
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "User Deleted Successfully" })
})

// ================== Get User by ID ==================
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.status(200).json(user)
})

// ================== Get All Users ==================
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})


module.exports = {
    loginUser,
    register,
    logoutUser,
    deleteUser,
    getUserById,
    getAllUsers,
}
