const express = require('express')
const router = express.Router()

const { creatUser, loginUser, getDetailsForUser } = require('../controllers/userController.js')
const { createCompany, getDetails } = require('../controllers/jobController.js')
const { authentication, authorization } = require('../middleware/auth.js');

router.post('/register', creatUser);
router.post('/login', loginUser);
router.get('/getDetailsForUser', authentication, getDetailsForUser);

router.post('/company', createCompany);
router.get('/getDetails/:userId', authentication, authorization, getDetails);


module.exports = router;