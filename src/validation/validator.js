const mongoose = require('mongoose');


const isValidObjectId = (objectId) => {
    if (mongoose.Types.ObjectId.isValid(objectId)) return true;
    return false;
};

const isValid = (value) => {
    if (typeof (value) === 'undefined' || value === null) return false
    if (typeof (value) === "string" && value.trim().length === 0) return false
    return true;
};

const isValidRequest = (value) => {
    if (Object.keys(value).length === 0) return false;
    return true;
};

const nameRegex = (value) => {
    let nameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
    if (nameRegex.test(value))
        return true;
}

const mobileRegex = (value) => {
    let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
    if (phoneRegex.test(value))
        return true;
}

const mailRegex = (value) => {
    let mailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (mailRegex.test(value))
        return true;
}

const passwordRegex = (value) => {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (passwordRegex.test(value))
        return true;
}



module.exports = { isValidObjectId, isValid, isValidRequest, nameRegex, mailRegex, mobileRegex, passwordRegex}