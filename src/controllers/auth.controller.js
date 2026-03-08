const userModel = require("../models/user.model")

const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

async function createUser(req, res) {

    const { username, email, password, role = 'user' } = req.body

    const isUserExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    // efficient
    // const isUserExist = await userModel.exists({
    //     $or:[{username},{email}]
    // })

    if (isUserExist) {
        res.status(409).json({
            msg: "user already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        role,
        password: hashedPassword
    })

    const token = jwt.sign(({

        id: user._id,
        role: user.role

    }), process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        msg: "user Created successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
       
    })




}

module.exports = { createUser }