const Contact = require("../models/contact-model")
const User = require("../models/user-model")

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

module.exports = { getAllUsers, getAllContacts, deleteUser, deleteContact }
