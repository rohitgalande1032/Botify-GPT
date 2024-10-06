import User from "../models/User.js"
import {hash} from 'bcrypt'

export const getAllUsers = async (req, res, next) => {
    try {
        // get all users from database
        const users = await User.find()
        return res.status(200).json({
            message: "OK",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            message: "ERROR",
            cause: error.message
        })
    }
}

export const userSignup = async (req, res, next) => {
    try {
        //User Signup
        const {name, email, password} = req.body
        //Check user already registered
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(401).send("User already registerd with this email !")
        const hashedPassword = await hash(password, 10)
        const user = new User({name, email, password: hashedPassword})
        await user.save()
        return res.status(200).json({message: "OK", id: user._id.toString()})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "Error", cause: error.message})
    }
}

export const userLogin = async (req, res, next) => {
    
}