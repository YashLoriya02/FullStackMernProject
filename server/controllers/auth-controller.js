const User = require("../models/user-model")

const home = async (req, res) => {
    try {
        res.send({ message: "Welcome to MERN Project" })
    } catch (error) {
        console.log(error)
        res.send({ message: "Some Error Occured." })
    }
}

const register = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body
        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: "Email Already Exists" });
        }
        const userCreated = await User.create({ username, email, phone, password })
        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        const user = await userExist.checkCredentials(password)

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if (user) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password " });
        }
    } catch (error) {
        next(error)
    }
}

const user = async (req, res) => {
    try {
        const userData = req.user
        return res.status(200).json({ userData })
    } catch (error) {
        console.log("Error from User Route", error)
    }
}

module.exports = { home, register, login, user }
