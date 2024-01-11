const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

//@desc Register a user
//@route GET /api/user/register
//@access public
const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All field are mandatory!")
    }
    //If we already have an existing email address
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error({ msg:"User already registered"}) 
    }
    //Hash pasword
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashedPassword);
     const user = await User.create({
        username, email, password: hashedPassword
    })
    console.log(`User created ${user}`)
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data not valid")
    }
    res.json({msg: "Register the user"})
});

//@desc Login the user
//@route GET /api/user/login
//@access public
const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400);
        throw new Error("All field are mandatory")
    }
    //If User is in the database or not
    const user = await User.findOne({ email })
    //Compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign({
            //JWT Payload
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECERIT, { expiresIn: "15m"});
        res.status(201).json({ accesstoken })
    } else {
        res.status(401);
        throw new Error({msg: "email or password is not valid"})
    }
});
//@desc Get current user info 
//@route GET /api/user/current
//@access public
const CurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user)// fetching the date with validateToken from the mongodb
});

module.exports = {
    RegisterUser,
    LoginUser,
    CurrentUser
}
