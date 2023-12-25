const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        )
        return token
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.checkCredentials = async function (password) {
    const user = bcrypt.compare(password, this.password)
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) {
        next()
    }
    try {
        const saltRound = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(user.password, saltRound)
        user.password = hashed
    } catch (error) {
        next(error)
    }
})

const User = new mongoose.model("users", userSchema)

module.exports = User