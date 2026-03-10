const jwt = require("jsonwebtoken")

async function authenticateArtist(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorize user"
        })

    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({
                msg: "User has no access to create music or album"
            })
        }

        req.user = decoded

        next()

    } catch (error) {
        console.error(error)
        return res.status(401).json({
            msg: "Unauthorize user"
        })
    }
}

module.exports = { authenticateArtist };