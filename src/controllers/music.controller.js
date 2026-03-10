const musicModel = require("../models/music.model")
const uploadFile = require('../services/storage.service')
const albumModel = require("../models/album.model")

const jwt = require("jsonwebtoken")

// async function createMusic(req, res) {
//     const { title } = req.body
//     const file = req.file


//     const token = req.cookies.token

//     if (!token) {
//         return res.status(401).json({
//             msg: "unauthorize user"
//         })
//     }

//     try {
//         const decoded = await jwt.verify(token, process.env.JWT_SECRET)

//         if (decoded.role !== "artist") {
//             return res.status(403).json({
//                 msg: "Forbidden access"
//             })
//         }

//         const result = await uploadFile(file.buffer.toString("base64"))

//         const music = await musicModel.create({
//             title,
//             uri: result.url,
//             artist: decoded.id


//         })

//         res.status(201).json({
//             msg: "music created successfully",
//             music: {
//                 id: music._id,
//                 uri: music.uri,
//                 title: music.title,
//                 artist: music.artist
//             }
//         })



//     } catch (error) {

//         return res.status(301).json({
//             msg: "This user not allow to create music"
//         })

//     }




// }

async function createMusic(req, res) {
    const { title } = req.body
    const file = req.file

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            msg: "unauthorize user"
        })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({
                msg: "Forbidden Access"
            })
        }

        const result = await uploadFile(file.buffer.toString('base64'))

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        })

        res.status(201).json({
            msg: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.tile,
                artist: music.artist
            }
        })


    } catch (error) {
        return res.status(401).json({
            msg: "unauthorize user"
        })

    }





}

// album controller
async function createAlbum(req, res) {
    const token = req.cookies.token
    const { title, musics } = req.body
    if (!token) {

        return res.status(401).json({
            msg: "Unauthorized User"
        })

    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({
                msg: "Forbidden error. User has no access to create album"
            })
        }

        const album = await albumModel.create({
            title,
            musics,
            artist: decoded.id

        })

        res.status(201).json({
            msg: "Album created successfully",
            album: {
                title: album.title,
                musics: album.musics,
                artist: album.artist
            }
        })

    } catch (error) {
        return res.status(401).json({
            msg: "Unauthorized User"
        })
    }

}

module.exports = { createMusic,createAlbum }