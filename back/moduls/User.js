const mongoose = require('mongoose')
const joi = require('joi')

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // ← مهم
    },
    Password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId: null
        }
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    preferredReciter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reciter",
        default: null
    },
    location: {
        type: String,
        default: "Cairo, Egypt"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerify: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

// ✅ التحقق عند إنشاء مستخدم جديد
const ValidateUser = (obj) => {
    const schema = joi.object({
        Name: joi.string().required(),
        Password: joi.string().required(),
        Email: joi.string().email().required(),
        gender: joi.string().valid("male", "female"),
        preferredReciter: joi.string().hex().length(24),
        location: joi.string()
    })
    return schema.validate(obj)
}

// ✅ التحقق عند تسجيل الدخول
const LoginValidate = (obj) => {
  const schema = joi.object({
    Email: joi.string().email().required(),
    Password: joi.string().required(),
  });

  // توحيد المدخلات (normalize) قبل التحقق
  const normalized = {
    Email: String(obj.Email ?? obj.email ?? '').trim().toLowerCase(),
    Password: String(obj.Password ?? obj.password ?? ''),
  };

  return schema.validate(normalized);
};


module.exports = { User, ValidateUser, LoginValidate }
