require('dotenv').config();

const User = require("../models/user-model")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const generateRandomString = require("../utils/randomGeneration")


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

const changePasswordUser = async (req, res) => {
    try {
        const id = req.params.id
        const response = req.body
        const user = await User.findOne({ _id: id })

        const saltRound = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(response.new, saltRound)

        if (!user) {
            return res.status(500).json({ message: "User does not Exist." })
        }
        const isPasswordCorrect = await bcrypt.compare(response.old, user.password)
        if (isPasswordCorrect && response.new == response.confirm) {
            const result = await User.updateOne({ _id: req.params.id }, { $set: { password: hashedPassword } });
            if (result.modifiedCount !== 0) {
                res.status(200).json({ message: 'Password Updated Successfully' });
            }
        }
        else if (!isPasswordCorrect) {
            res.status(400).json({ message: "Please Enter Correct Old-Password" })
        }
        else {
            res.status(400).json({ message: "Please Enter the given details Properly" })
        }
    } catch (error) {
        console.log(error)
    }
}

const sendMail = async (req, res) => {
    const userEmail = req.params.mail
    const senderEmail = 'alientesting02@gmail.com'
    const tempPass = generateRandomString(10)
    const user = await User.findOne({ email: userEmail })

    const message = `We have got a Request to Change the Password for Mail-id : ${userEmail}.\n\nKindly Login using Password '${tempPass}' and \nPlease change it by Clicking the Profile icon in Right hand side > Change Password > Type Old and New Password. `

    if (!user) {
        return res.status(500).json({ message: "User does not Exist with given Mail-Id " })
    }
    else {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: `MERN Support <${senderEmail}>`,
                to: userEmail,
                subject: 'Password Change Request',
                text: message
            };

            await transporter.sendMail(mailOptions);

            const saltRound = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(tempPass, saltRound)
            await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

            res.status(200).json({ message: "Mail is Sent to Registered Mail-Id. Refer it to Login." })
        } catch (error) {
            res.status(500).json({ message: "Server Error in Sending Mail." })
            console.log(error)
        }
    }
}

module.exports = { home, register, login, user, changePasswordUser, sendMail }
