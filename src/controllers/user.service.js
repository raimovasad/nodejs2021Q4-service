const User = require('../models/user.model');

function getAllUsers(req,res){
    const users = User.getAll()
    res.send(users)
};

function getUsersById(req,res){
    const {id} = req.params;
    const users = User.getById(id);
    res.send(users);
};

function updateUser(req,res){
    const {id} = req.params;
    const {name,login,password} = req.body;
    const user = {
        name,
        login,
        password
    }
    const updated = User.update(id,user)
    res.send(updated);
};

function addUser(req,res) { 
    const {name,login,password} = req.body
    if(!name || !login || !password){
        res.send({message:'Not entered the required field!'});
    }
    else{
        const user = new User({name,login,password})
        try{
            user.save()
        }
        catch(err){
            res.send({message: `${err.message}`})
        }
        res.send(user)
    }
 }


module.exports = {
    getAllUsers,
    getUsersById,
    addUser,
    updateUser
}