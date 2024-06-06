const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwtHelpers = require('../utils/jwtHelpers')
const { asyncHandler } = require('../middlewares/asyncHandler')


// method   POST 
// route    api/users/register
// desc     Register new user
// access   Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        // Check if user exist
        if (user) {
            return res.status(400).json({errors: [{msg: 'User already exists'}]})
        }
        user = new User({
            name,
            email,
            password
        })
        // Encrypt Password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        res.send({
           data: {
                user,
                accessToken: jwtHelpers.sign({ sub: user.id })
            } ,
            msg: 'user created'
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// method   POST 
// route    api/users/login
// desc     Login user
// access   Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                id: user.id,
                name: user.name,
                accessToken: jwtHelpers.sign({ sub: user.id })
            })
        } else {
            return res.status(400).json({errors: [{msg: 'Invalid email or password'}]})
        }
        
    } catch (error) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// method   GET 
// route    api/users/me
// desc     User Authentication
// access   Private
const getMe = asyncHandler(async(req, res) => {
    const user = await User.findById(req.userId)
    res.json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}