const UserModel = require('../models/userModel.js');
const CompanyModel = require('../models/jobModel.js');
const jwt = require('jsonwebtoken');

const { isValid, isValidRequest, nameRegex, mailRegex, mobileRegex, passwordRegex } = require('../validation/validator.js');


const creatUser = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')

        if (!isValidRequest(req.body))
            return res.status(400).send({ status: false, message: "Request body cannot remain empty" });

        let { fname, lname, email, skill, mobile, password } = req.body;

        if (!isValid(fname))
            return res.status(400).send({ status: false, message: "fname must be present it cannot remain empty" });

        if (!nameRegex(fname))
            return res.status(400).send({ status: false, message: "Please provide valid fname, it should not contains any special characters and numbers" });

        if (!isValid(lname))
            return res.status(400).send({ status: false, message: "lname must be present it cannot remain empty" });

        if (!nameRegex(lname))
            return res.status(400).send({ status: false, message: "Please provide valid lname, it should not contains any special characters and numbers" });

        if (!isValid(skill))
            return res.status(400).send({ status: false, message: "skill must be present it cannot remain empty" });

        if (skill != 'nodejs' && skill != 'express' && skill != 'MongoDb' && skill != 'JavaScript')
            return res.status(400).send({ status: false, message: "Please enter valid skill from these options only ['nodejs','express', 'MongoDb', 'JavaScript']" });

        if (!isValid(email))
            return res.status(400).send({ status: false, message: "EmailId must be present" });

        if (!mailRegex(email))
            return res.status(400).send({ status: false, message: "Please enter valid email" });



        const checkUser = await UserModel.findOne({ email: email });
        if (checkUser) {
            return res.status(409).send({ status: false, message: "EmailId already taken" });
        }

        if (!isValid(mobile))
            return res.status(400).send({ status: false, message: "Phone number must be present" });

        if (!mobileRegex(mobile))
            return res.status(400).send({ status: false, message: "Please provide valid mobile number" });

        const checkphone = await UserModel.findOne({ mobile: mobile });
        if (checkphone) {
            return res.status(409).send({ status: false, message: "Phone number is already taken" });
        }

        if (!isValid(password))
            return res.status(400).send({ status: false, message: "Password must be present" });

        if (!passwordRegex(password))
            return res.status(400).send({ status: false, message: "Please enter a password which contains min 8 letters & max 15 letters, at least a symbol, upper and lower case letters and a number" });

        const savedData = await UserModel.create(req.body);
        return res.status(201).send({ status: true, message: 'Success', data: savedData });

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const loginUser = async (req, res) => {
    try {

        if (!isValidRequest(req.body))
            return res.status(400).send({ status: false, message: "Request body cannot remain empty" });

        const { email, password } = req.body;

        if (!isValid(email) || !isValid(password))
            return res.status(400).send({ status: false, message: "Credential must be present" });



        let user = await UserModel.findOne({ email: email, password: password });
        if (!user)
            return res.status(400).send({ status: false, message: "Credential is not correct", });

        let token = jwt.sign(
            {
                userId: user._id.toString(),
            },
            "JobSeeker",
            {
                expiresIn: '72h'
            }
        );
        res.setHeader("x-api-key", token);
        const finalData = {};
        finalData.userId = user._id;
        finalData.token = token
        res.status(200).send({ status: true, message: "User login successfull", data: finalData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


// const getDetailsForUser = async (req, res) => {
//     try {
//         res.setHeader('Access-Control-Allow-Origin', '*')

//         let data = req.query
//         let { companyName, jobprofile, skill } = data;
//         let filter = { isDeleted: false }
//         if (Object.keys(data).length !== 0) {

//             filter['$or'] = [
//                 { skill: skill },
//                 { companyName: companyName },
//                 { jobprofile: jobprofile },
//             ];

//             const findData = await CompanyModel.find(filter)
//             if (!findData)
//                 return res.status(404).send({ status: false, message: "No data found" })

//             return res.status(200).send({ status: true, message: 'Companie Details', data: findData });

//         } else {
//             const findData = await CompanyModel.find({ isDeleted: false })
//             if (!findData)
//                 return res.status(404).send({ status: false, message: "No data found" });

//             return res.status(200).send({ status: true, message: "Companies Details", data: findData });

//         }
//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message });
//     }

// }



const getDetailsForUser = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')

        let data = req.query
        let { mobile, email, skill } = data;
        let filter = { isDeleted: false }
        if (Object.keys(data).length !== 0) {

            filter['$or'] = [
                { skill: skill },
                { mobile: mobile },
                { email: email },
            ];

            const findData = await UserModel.find(filter)
            if (!findData)
                return res.status(404).send({ status: false, message: "No data found" })

            return res.status(200).send({ status: true, message: 'Candidate Details', data: findData })

        } else {
            const findData = await UserModel.find()
            if (!findData)
                return res.status(404).send({ status: false, message: "No data found" })

            return res.status(200).send({ status: true, message: "Candidate Details", data: findData })

        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }

}

module.exports = { creatUser, loginUser, getDetailsForUser } 