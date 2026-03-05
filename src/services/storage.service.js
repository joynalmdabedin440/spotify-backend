const imagekit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`, // This is the default and can be omitted
    
    
});

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName:"music.mp3"
        
    })

    return result
    
}

module.exports = uploadFile