const userModel = require("../models/user.model")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    // console.log(isUserAlreadyExist);


    if (isUserAlreadyExist) {
        return res.status(409).json({
            msg: "User already exist!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        role,
        password: hashedPassword
    })

    const token = await jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)


    res.status(201).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        msg: "user created successfully"
    })



}

// async function createUser(req, res) {

//     const { username, email, password, role = 'user' } = req.body

//     const isUserExist = await userModel.findOne({
//         $or: [{ username }, { email }]
//     })

//     // efficient
//     // const isUserExist = await userModel.exists({
//     //     $or:[{username},{email}]
//     // })

//     if (isUserExist) {
//         res.status(409).json({
//             msg: "user already exist"
//         })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const user = await userModel.create({
//         username,
//         email,
//         role,
//         password: hashedPassword
//     })

//     const token = jwt.sign(({

//         id: user._id,
//         role: user.role

//     }), process.env.JWT_SECRET)

//     res.cookie("token", token)

//     res.status(201).json({
//         msg: "user Created successfully",
//         user:{
//             id: user._id,
//             username: user.username,
//             email: user.email,
//             role: user.role
//         }

//     })




// }

async function loginUser(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.status(401).json({
            msg: "Unauthorized User"
        })

    }

    // const hashedPassword = await bcrypt.hash(password, 10)
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            msg: "invalid credential"
        })
    }

    const token = await jwt.sign({
        id: user._id,
        role:user.role
        
    }, process.env.JWT_SECRET)
    
    res.cookie("token", token)
    
    res.status(200).json({
        msg: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role:user.role
        }
    })
    






}
module.exports = { registerUser, loginUser }