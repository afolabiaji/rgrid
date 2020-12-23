const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

let nodemailer = require('nodemailer');

//email credentials to send verification email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//sign up handler
exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    //if passwords match then send token te email to verify on front-end
    if (password == confirmPassword) {
        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = await User.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                status: "pending"
            })
            const verifyToken = jwt.sign(
                {
                    email: newUser.email,
                    userId: newUser.id.toString()
                },
                process.env.EMAIL_VERIFY_SECRET,
                { expiresIn: '1h' }
            )
            let mailOptions = {
                to: newUser.email,
                from: "af.ajibade@gmail.com",
                subject: 'Please verify E-mail address',
                html: `<html>
                <h1>Please Verify Your E-mail</h1>
                <p>Click <a href="http://localhost:4200/post-verify/${newUser.id.toString()}/${verifyToken.toString()}">here</a> to verify your account</p>
                </html>
                `
            }
            transporter.sendMail(mailOptions)
            res.status(200).json({
                message: 'Success', user: {
                    email: newUser.email,
                    userId: newUser.id.toString(),
                    status: newUser.status
                }
            })

        } catch (error) {
            res.status(401).json({ error: "Something went wrong, please try again" });
            throw error
        }

    } else {
        res.status(406).json({ error: 'Passwords do not match' })
    }

}

//verify user from token sent from front-end
exports.postVerifyUser = async (req, res, next) => {
    const token = req.body.token;

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.EMAIL_VERIFY_SECRET)

    } catch (err) {
        err.statusCode = 500;
        res.status(500).json({ error: "Something was wrong please try resending your verification email." });
        throw err;
    }
    if (!decodedToken) {
        res.status(401).json({ error: "User could not be authenticated" });
    } else {
        User.update({
            status: "verified"
        }, {
            where: {
                id: +decodedToken.userId
            }
        })
        res.status(200).json({ verified: true, message: 'User Verified'})
    }
}

//send verification status from DB to frontend 
exports.postVerificationStatus = async (req, res, next) => {
    const id = req.body.userId
    const user = await User.findByPk(id)

    if (user.status == 'verified'){
        res.status(200).json({'message': 'user verified'})
    } else {
        let error = new Error('A user with this email could not be found.')
            res.status(401).json({ error: 'A user with this email could not be found.'});
            throw error
    }
}

//resend email if user has not recieved
exports.postResendVerificationEmail = async (req, res, next) => {
    try {
        const email = req.body.email;
        const userId = req.body.userId;

        const verifyToken = jwt.sign(
            {
                email: email,
                userId: userId.toString()
            },
            process.env.EMAIL_VERIFY_SECRET,
            { expiresIn: '5h' }
        )
        let mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Please verify E-mail address',
            html: `<html>
            <h1>Please Verify Your E-mail</h1>
            <p>Click <a href="http://localhost:4200/post-verify/${userId.toString()}/${verifyToken.toString()}">here</a> to verify your account</p>
            </html>
            `
        }
        transporter.sendMail(mailOptions)
        res.status(200).json({
            message: 'Email sent.'
        })
    } catch (err) {
        res.status(401).json({ message: "Something went wrong, please try again" });
        throw err
    }
}

//login and validate token sent from front-end
exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password

    try {
        const userObj = await User.findOne({ where: { email: email } })
        if (!userObj) {
            let error = new Error('A user with this email could not be found.')
            res.status(401).json({ error: 'A user with this email could not be found.'});
            throw error
        }
        const pwCompare = await bcrypt.compare(password, userObj.password)

        if (!pwCompare) {
            res.status(401).json({ message: "Email or Password was incorrect. Please try again later." });
        }else{
            const loginToken = jwt.sign(
                {
                    email: userObj.email,
                    userId: userObj.id.toString()
                },
                process.env.USER_LOGIN_SECRET,
                { expiresIn: '24h' }
            )
            res.status(200).json({ loginToken: loginToken, userId: userObj.id.toString(), email: userObj.email, status: userObj.status })
        }
        


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        throw err
    }

}

