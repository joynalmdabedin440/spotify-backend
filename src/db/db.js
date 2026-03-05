const mongoose = require("mongoose")


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)

        console.log("Database connected successfully");


    } catch (error) {
        console.error("Database error",error)

    }
}

module.exports = connectDB