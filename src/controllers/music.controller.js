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


    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        msg: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })



}

// album controller
async function createAlbum(req, res) {
    const { title, musics } = req.body

    // const token = req.cookies.token
    // if (!token) {

    //     return res.status(401).json({
    //         msg: "Unauthorized User"
    //     })

    // }

    const album = await albumModel.create({
        title,
        musics,
        artist: req.user.id

    })

    res.status(201).json({
        msg: "Album created successfully",
        album: {
            title: album.title,
            musics: album.musics,
            artist: album.artist
        }
    })

    // try {
    //     const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    //     if (decoded.role !== "artist") {
    //         return res.status(403).json({
    //             msg: "Forbidden error. User has no access to create album"
    //         })
    //     }

    //     const album = await albumModel.create({
    //         title,
    //         musics,
    //         artist: decoded.id

    //     })

    //     res.status(201).json({
    //         msg: "Album created successfully",
    //         album: {
    //             title: album.title,
    //             musics: album.musics,
    //             artist: album.artist
    //         }
    //     })

    // } catch (error) {
    //     return res.status(401).json({
    //         msg: "Unauthorized User"
    //     })
    // }

}

//singer dashboard

async function singerDashboard(req,res) {
    
    const id = req.params.id 
    

    if (id !== req.user.id) {
        return res.status(403).json({
            msg:"Unauthorize user"
        })
    }

    const musics = await musicModel.find({
        artist:id
    })
    const albums = await albumModel.find().populate("musics").where("artist").equals(id)

    


    res.status(200).json({
        msg: "music retrieved successfully",
        musics: musics.map(music => ({
            id: music._id,
            title: music.title,
            uri: music.uri
        })),
        albums: albums.map(album => ({
            id: album._id,
            title: album.title,
            musics: album.musics
        }))
    })
}

//get music for user

async function getMusic(req,res) {
    const musics = await musicModel.find().limit(2).populate("artist", "username email",)   

    res.status(200).json({
        msg: "Music retrieved successfully",
        musics
    })
}

module.exports = { createMusic, createAlbum,singerDashboard, getMusic }