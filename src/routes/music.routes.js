const express = require("express")
const musicController = require("../controllers/music.controller")
const multer = require("multer")
const authMiddleware =require("../middlewares/auth.middleware")


const upload = multer({
    storage: multer.memoryStorage()
})



const router = express.Router()


router.post("/create-music",authMiddleware.authenticateArtist, upload.single("music"), musicController.createMusic)
router.post("/create-album",authMiddleware.authenticateArtist,musicController.createAlbum)

module.exports = router