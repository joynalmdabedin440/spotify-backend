const userModel = require("../models/user.model")

async function createUser(req, res) {
    const { username, email, password } = req.body

    const isUserExist = await userModel.findOne({
        $or: [{username: username},
        {email: email}
        ]


    })
    // efficient
    // const isUserExist = await userModel.exists({
    //     $or:[{username},{email}]
    // })

}

module.exports = { createUser }