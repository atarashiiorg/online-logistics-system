const Employee = require("../models/employee")
const bcrypt = require("bcrypt")

async function updatePassword (req,res){
    const {currPass, newPass} = req.body
    const user = await Employee.findOne({_id:req.token._id})
    const match = await bcrypt.compare(currPass, user.password);
    if(!match){
        res.status(402).json({msg:"Current password is wrong"})
        return
    }
    bcrypt.hash(newPass, 10)
    .then(async function (hash) {
        user.password = hash
        await user.save()
        res.status(200).json({ 'msg': 'success' })
        return
    })
    .catch(err=>{
        res.status(500).json({err:"Internal server error occured while updating password"})
        return
    })
}

module.exports = {
    updatePassword
}