const { z } = require('zod')

const signupSchema = z.object({
    username: z.string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be of atleast 3 Characters" })
    .max(100, {message : "Name must be maximum of 100 Characters."}),

    email: z.string({ required_error: "Email is Required" })
    .trim()
    .email({message : "Invalid Email Address."}),

    phone: z.string({ required_error: "Phone is Required" })
    .trim()
    .min(10, { message: "Phone-Number must contain 10 Digit." })
    .max(11, { message: "Phone-Number must contain only 10 Digits." }),

    password: z.string({ required_error: "Password is Required" })
    .trim()
    .min(6, { message: "Password must be of atleast 6 Characters" })
    .max(25, {message : "Password must be maximum of 25 Characters."}),
})

const signinSchema = z.object({
    email: z.string({ required_error: "Email is Required" })
    .trim()
    .email({message : "Invalid Email Address."}),

    password: z.string({ required_error: "Password is Required" })
    .trim()
    .min(6, { message: "Password must be of atleast 6 Characters" })
    .max(15, {message : "Password must be maximum of 15 Characters."}),
})

module.exports = {signupSchema, signinSchema}
