require('dotenv').config();

const Contact = require("../models/contact-model")
const User = require("../models/user-model")
const nodemailer = require("nodemailer")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select({ password: 0 })
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" })
        }
        return res.status(200).json(users)
    } catch (error) {
        console.log(`Error in Fetching Users ${error}`)
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contact Found" })
        }

        return res.status(200).json(contacts)
    } catch (error) {
        console.log(`Error in Fetching Contacts ${error}`)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isAdmin) {
            const deletedUser = await User.deleteOne({ email: userEmail });

            if (deletedUser.deletedCount === 1) {
                return res.status(200).json({ message: "User Deleted Successfully.", deletedUser });
            } else {
                return res.status(500).json({ message: "Error Deleting user" });
            }
        }
        else {
            console.log(`Cannot delete admin user with email ${userEmail}`);
            return res.status(500).json({ message: "Cannot Delete Admin" });
        }
    } catch (error) {
        console.log(`Error in Deleting User: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteContact = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await Contact.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const deletedContact = await Contact.deleteOne({ email: userEmail });

        if (deletedContact.deletedCount === 1) {
            return res.status(200).json({ message: "Contact Deleted Successfully.", deletedContact });
        } else {
            return res.status(500).json({ message: "Error Deleting Contact" });
        }

    } catch (error) {
        console.log(`Error in Deleting User: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const UpdateUser = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const update = { $set: req.body }
        const result = await User.updateOne(filter, update);
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json({ message: 'User Updated Successfully' });
        }
    } catch (error) {
        console.log(`Error Updating User ${error}`)
        res.status(500).json(`Internal Server Error.`)
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const users = await User.findOne({ _id: id }).select({ password: 0 })
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" })
        }
        return res.status(200).json(users)
    } catch (error) {
        console.log(`Error in Fetching Users ${error}`)
    }
}

const replyToUser = async (req, res) => {
    const id = req.params.id
    const user = await Contact.findOne({ _id: id })
    const userEmail = user.email
    const senderEmail = 'alientesting02@gmail.com'
    const message = req.body

    if (!user) {
        return res.status(500).json({ message: "User Does not Exist." })
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
                subject: 'Reply to Your Query',
                text: `We get a Query from User with Email : ${userEmail}\nReply from MERN Team :- ${message.query}`
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Replied Successfully to User's Query." })
        } catch (error) {
            res.status(500).json({ message: "Server Error in Sending Mail." })
            console.log(error)
        }
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUser, deleteContact, UpdateUser, getUser, replyToUser }

