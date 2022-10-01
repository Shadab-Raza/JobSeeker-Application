const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },

    lname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    skill: {
        type: [String],
        required: true,
        enum: ["nodejs", "express", "MongoDb", "JavaScript"],
    },

    mobile: {
        type: Number,
        required: true,
        unique: true,

    }
}, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema); // users