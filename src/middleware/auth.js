const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel.js');
const { isValidObjectId } = require('../validation/validator.js');

const authentication = async function (req, res, next) {
    try {

        let token = req.headers["x-api-key"] || req.headers["X-Ai-Key"];

        if (!token) return res.status(401).send({ status: false, message: "Missing authentication token in request" });

        jwt.verify(token, "JobSeeker", (err, decoded) => {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            } else {
                req.decodedToken = decoded
                next();
            }
        })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


const authorization = async function (req, res, next) {
    try {

        let userId = req.params.userId;
        if (!isValidObjectId(userId))
            return res.status(400).send({ status: false, message: `The given userId: ${userId} is not in proper format` });

        let tokenUserId = req.decodedToken.userId;

        const checkUser = await UserModel.findOne({ _id: userId });
        if (!checkUser)
            return res.status(404).send({ status: false, message: "No user details found" });

        if (tokenUserId != userId)
            return res.status(403).send({ status: false, message: "You are not authorize to take this action" })
        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports =  { authentication, authorization } 