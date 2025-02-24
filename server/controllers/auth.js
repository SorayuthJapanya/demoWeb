const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Step 1 Validate body
        if (!username) {
            return res.statud(400).send('Username is required!!')
        }
        if (!email) {
            return res.statud(400).send('Emal is required!!')
        }
        if (!password) {
            return res.statud(400).send('Password is required!!')
        }


        // Step 2 Check User 
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).send('User Already Exists!!!');
        }

        // Step 3 HashPassword
        const hashPassword = await bcrypt.hash(password, 10)

        // Step 4 Register
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        // Step 5 Save into DB
        await newUser.save()

        res.status(201).send('User Registered Successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    try {
        // Step 1 Check User
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).send('User not found!!!')
        }

        // Step 2 Compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).send('Password Invalid!!!')
        }
        
        // Step 3 Payload
        const payload = { username: user.username }

        // Step 4 Gen WebToken
        const token = jwt.sign(payload, 'jwtsecret', { expiresIn: '1h' })

        // Step 5 Sent response
        res.json({
            message: 'Login Successful!',
            token,
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}