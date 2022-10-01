const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
  
    jobprofile: {
        type: [String],
        required: true,
        enum: ["Software Engineer", "data analyst", "hardware engineer", "support specialist", "Developer"]

    },
    jobDescription: {
        type: String,
        required: true,
    },
    minEducation: {
        type: [String],
        required: true,
        enum: ["B.E", "B.Tech", "Diploma"]
    },

    skill: {
        type: [String],
        required: true,
        enum: ["nodejs", "express", "MongoDb", "JavaScript"],
    },
    contact: {
        type: Number,
        required: true,
        unique: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }
)

module.exports = mongoose.model("Company", companySchema); // companies"Software Engineer", "data analyst", "hardware engineer", "support specialist", "Developer"]