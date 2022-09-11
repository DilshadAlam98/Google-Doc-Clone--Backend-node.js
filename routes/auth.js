const express = require("express");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const cors = require("cors");
const auth = require("../middleware/auth");


const authRouter = express.Router();


authRouter.post("/api/signup",async(req,res)=>{
    try{
const {name, email, profilePic} =req.body;

/// Email or user already exist in database

let user = await User.findOne({email:email});

/// if not exist store it into database
if(!user){
      user =new User({
    email:email,
    profilePic:profilePic,
    name:name
     });

    user = await user.save()
}
        const token = jwt.sign({id:user._id },"passwordKey");
          res.json({user:user,token})
    }catch(e){
     res.status(500).json({error:e.message});
    }
})


authRouter.get("/api/get_users", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ user, token: req.token })
});


module.exports = authRouter;
