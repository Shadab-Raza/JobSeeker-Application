const CompanyModel = require('../models/jobModel.js')
const UserModel = require('../models/userModel.js');

const { isValid, isValidRequest, nameRegex, mobileRegex } = require('../validation/validator.js');

const createCompany = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')

        let data = req.body;
        const { companyName, skill, jobprofile, jobDescription, minEducation, contact } = data

        if (!isValidRequest(req.body))
            return res.status(400).send({ status: false, message: "Request body cannot remain empty" });

        if (!isValid(companyName))
            return res.status(400).send({ status: false, message: "companyName must be present it cannot remain empty" })
        if (!nameRegex(companyName))
            return res.status(400).send({ status: false, message: "Please provide valid companyName, it should not contains any special characters and numbers" });

        if (!isValid(jobprofile))
            return res.status(400).send({ status: false, message: "jobprofile must be present it cannot remain empty" });
        if (jobprofile != 'data analyst' && jobprofile != 'Software Engineer' && jobprofile != 'data analyst' && jobprofile != 'hardware engineer' && jobprofile != 'support specialist' && jobprofile != 'Developer')
            return res.status(400).send({ status: false, message: "Please enter valid jobprofile from these options only ['Software Engineer', 'data analyst', 'hardware engineer', 'support specialist', 'Developer']" });

        if (!isValid(jobDescription))
            return res.status(400).send({ status: false, message: "jobDescription must be present it cannot remain empty" });
        if (!nameRegex(jobDescription))
            return res.status(400).send({ status: false, message: "Please provide valid jobDescription, it should not contains any special characters and numbers" });

        if (!isValid(skill))
            return res.status(400).send({ status: false, message: "skill must be present it cannot remain empty" })
        if (skill != 'nodejs' && skill != 'express' && skill != 'MongoDb' && skill != 'JavaScript')
            return res.status(400).send({ status: false, message: "Please enter valid skill from these options only ['nodejs','express', 'MongoDb', 'JavaScript']" });

        if (!isValid(minEducation))
            return res.status(400).send({ status: false, message: "minEducation must be present it cannot remain empty" })
        if (minEducation != 'B.E' && minEducation != 'B.Tech' && minEducation != 'Diploma')
            return res.status(400).send({ status: false, message: "Please enter valid minEducation from these options only ['B.E/B.Tech', 'Diploma']" });

        // if (!isValid(email))
        //     return res.status(400).send({ status: false, message: "EmailId must be present" });
        // if (!mailRegex(email))
        //     return res.status(400).send({ status: false, message: "Please enter valid email" });

        // const checkUser = await UserModel.findOne({ email: email });
        // if (checkUser) {
        //     return res.status(409).send({ status: false, message: "EmailId already taken" });
        // }

        // if (!isValid(password))
        //     return res.status(400).send({ status: false, message: "Password must be present" });
        // if (!passwordRegex(password))
        //     return res.status(400).send({ status: false, message: "Please enter a password which contains min 8 letters & max 15 letters, at least a symbol, upper and lower case letters and a number" });


        if (!isValid(contact))
            return res.status(400).send({ status: false, message: "Contact number must be present" });
        if (!mobileRegex(contact))
            return res.status(400).send({ status: false, message: "Please provide valid contact number" });

        const checkContact = await CompanyModel.findOne({ contact: contact });
        if (checkContact)
            return res.status(409).send({ status: false, message: "Contact number is already present" });


        const checkName = await CompanyModel.findOne({ companyName: companyName });
        if (checkName)
            return res.status(409).send({ status: false, message: "Comapny Name is already present" });

        const savedData = await CompanyModel.create(data)
        res.status(201).send({ status: true, message: savedData });

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}

const getDetails = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')

        let data = req.query
        let { skill } = data;
        if (Object.keys(data).length !== 0) {

            const findData1 = await UserModel.find({ skill: skill })
            if (findData1.length == 0)
                return res.status(404).send({ status: false, message: "Your skills are not matching with the given skill" })

            let skills = findData1[0].skill

            const findData2 = await CompanyModel.find({ skill: skills, isDeleted: false })
            if (findData2.length == 0)
                return res.status(404).send({ status: false, message: "Your skills are not matching with the company requirement" })

            return res.status(200).send({ status: true, message: 'Companies Details', data: findData2 })

        } else {
            const findData = await CompanyModel.find({ isDeleted: false })
            if (findData.length == 0)
                return res.status(404).send({ status: false, message: "NO data found" })

            return res.status(200).send({ status: true, message: "Companies Details", data: findData })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }

}


module.exports = { createCompany, getDetails }




// const companyLogin = async (req, res) => {
//     try {

//         if (!isValidRequest(req.body))
//             return res.status(400).send({ status: false, message: "Request body cannot remain empty" });

//         const { email, password } = req.body;

//         if (!isValid(email) || !isValid(password))
//             return res.status(400).send({ status: false, message: "Credential must be present" });


//         let user = await CompanyModel.findOne({ email: email, password: password });
//         if (!user)
//             return res.status(400).send({ status: false, message: "Credential is not correct", });

//         let token = jwt.sign(
//             {
//                 companyId: user._id.toString(),
//             },
//             "JobSeeker",
//             {
//                 expiresIn: '72h'
//             }
//         );
//         res.setHeader("x-api-key", token);
//         const finalData = {};
//         finalData.CompanyUserId = user._id;
//         finalData.CompanyToken = token
//         res.status(200).send({ status: true, message: "User login successfull", data: finalData });

//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message });
//     }
// }