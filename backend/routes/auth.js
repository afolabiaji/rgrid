const authController = require('../controllers/auth')
const express = require('express')
const router = express.Router();

router.post('/signup', authController.postSignup)

router.post('/login', authController.postLogin)

router.post('/verify-user', authController.postVerifyUser)

router.post('/verification-status', authController.postVerificationStatus)

router.post('/resend-verify-email', authController.postResendVerificationEmail)



module.exports = router;