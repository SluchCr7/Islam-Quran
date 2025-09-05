
const { User, ValidateUser, LoginValidate } = require('../moduls/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const path = require('path')
// const { cloudUpload, cloudRemove } = require('../Config/cloudUpload')
// const fs = require('fs')

// ================== Register ==================

/**
 * @desc Register New User
 * @route POST /api/auth/register
 * @access Public
 */
const register = asyncHandler(async (req, res) => {
  const body = {
    Name: String(req.body.Name ?? req.body.name ?? '').trim(),
    Email: String(req.body.Email ?? req.body.email ?? '').trim().toLowerCase(),
    Password: String(req.body.Password ?? req.body.password ?? ''),
    gender: req.body.gender,
    preferredReciter: req.body.preferredReciter,
    location: req.body.location,
  };

  const { error } = ValidateUser(body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const userExist = await User.findOne({ Email: body.Email });
  if (userExist) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.Password, salt);

  const user = new User({
    Name: body.Name,
    Email: body.Email,
    Password: hashPassword,
  });

  await user.save();
  res.status(201).json({ message: "User Created Successfully" });
});


// ================== Login ==================

const loginUser = asyncHandler(async (req, res) => {
  try {
    // تطبيع القيم
    const payload = {
      Email: String(req.body.Email ?? req.body.email ?? '').trim().toLowerCase(),
      Password: String(req.body.Password ?? req.body.password ?? ''),
    };

    const { error } = LoginValidate(payload);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ Email: payload.Email });
    if (!user) {
      return res.status(400).json({ message: "Email or password are not correct" });
    }

    const validPassword = await bcrypt.compare(payload.Password, user.Password);
    if (!validPassword) {
      return res.status(400).json({ message: "Email or password are not correct" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    const { Password, ...others } = user._doc;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user: others, token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});




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

// ================== Update User ==================
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id

    // التحقق أن المستخدم موجود
    let user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }

    // تحديث الحقول المسموح بها فقط
    const allowedUpdates = [
        "Name",
        "profilePhoto",
        "gender",
        "preferredReciter",
        "location"
    ]

    allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
            user[field] = req.body[field]
        }
    })

    // حفظ التعديلات
    const updatedUser = await user.save()

    const { Password, ...others } = updatedUser._doc
    res.status(200).json({ message: "User Updated Successfully", user: others })
})

module.exports = {
    loginUser,
    register,
    logoutUser,
    deleteUser,
    getUserById,
    getAllUsers,
    updateUser,   // ✅ أضفناها هنا
}
