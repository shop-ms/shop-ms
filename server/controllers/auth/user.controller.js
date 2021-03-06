const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../../models/auth/user.model');
const {secretOrKey} = require('./../../config/db.config');
const Messages = require('../../constants/messages');


const register = (req,res) => {
    let hash = bcrypt.hashSync(req.body.password,10);
    const user = new User({
        user_name:req.body.user_name,
        email: req.body.email,
        password:hash,
    });
    user.save().then((result) => {
        return jwt.sign({id:result._id},secretOrKey,{expiresIn:86400});
    }).then((token)=>{
        return res.status(200).json({token:token,success:Messages.message_200});
    }).catch(error => {
        res.status(500).json({error:Messages.message_500});
    });
};

const login = (req,res) => {
    User.findOne({email:req.body.email}, (err,user) => {
        if(err) return res.status(500).json({error:Messages.message_500});
        if(!user) return res.status(404).json({error:Messages.message_404});
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ token: null, error:Messages.message_401 + " user" });
        let token = jwt.sign({ id: user._id }, secretOrKey, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ token: token, success: Messages.message_200 });
    });
};

const getCurrentUser = (req,res) => {
    User.findById(req.userID,{password: 0}, (err,user) => {
        if(err) return res.status(500).json("There was a problem funding the user");
        if(!user) return res.status(404).json({error:"User "+Messages.message_404});
        res.status(200).json({result: user, success: Messages.message_200});
    });
};

module.exports = {
    register:register,
    login:login,
    getCurrentUser:getCurrentUser
};