import User from "../models/User.js"
import {compare, hash} from 'bcrypt'
import { createToken } from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constants.js"

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

        //create token and save cookie
         //once user loggedIn clear cookie
         res.clearCookie(COOKIE_NAME, {
            path: "/", 
            domain: "localhost", 
            httpOnly: true,
            signed: true
        })
        //Create token
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(200).json({message: "OK", name: user.name, email: user.email})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "Error", cause: error.message})
    }
}

export const userLogin = async (req, res, next) => {
    try {
        //User Login
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).send("User not registered with this email")
        }
        const isPasswordCorrect = await compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password")
        }

        //once user loggedIn clear cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/", 
            domain: "localhost", 
            httpOnly: true,
            signed: true
        })
        //Create token
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(200).json({ message: "OK", name: user.name, email: user.email})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message})
    }
}

export const verifyUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id)
        if(!user){
            return res.status(401).send("User not registered or Token malfunctioned")
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match")
        }

        return res.status(200).json({ message: "OK", name: user.name, email: user.email})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message})
    }
}