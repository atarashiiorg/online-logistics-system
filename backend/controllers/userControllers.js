const User = require("../models/user")
const jwt = require("jsonwebtoken")

async function loginUser(req,res){
    try {
        const user = await User.findOne({username:req.body.username})
        console.log("user",user);
        if(!user){
            res.status(404).end()
            return
        }
        if(user.password == req.body.password){
            const token = jwt.sign({_id:user._id},process.env.JWT_KEY)
            const nuser = {...user._doc}
            delete nuser.password
            res.status(200).json({user:nuser, token:token})
        } else {
            res.status(401).end()
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports = {
    loginUser
}