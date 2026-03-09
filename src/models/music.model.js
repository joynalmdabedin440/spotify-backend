const mongoose = require("mongoose")


const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    uri: {
        type: String,
        required: true
             
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    }

})

const userModel = mongoose.model("music", musicSchema)

module.exports = userModel