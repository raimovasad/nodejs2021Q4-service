const User = require('../models/user.model');

function getAllUsers(req,res){
    const users = User.getAll()

    res.send(users.map(user => User.toResponse(user)))
};

function getUsersById(req,res){
    const {id} = req.params;
    const user = User.getById(id);
    res.send(User.toResponse(user));
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
            const newUser = user.save()
            res.statusCode =201;
            res.send(User.toResponse(newUser))
        }
        catch(err){
            res.send({message: `${err.message}`})
        }
    }
 }

 function removeUser(req,res) { 
    const {id} = req.params;
    try{
        User.remove(id);
        res.statusCode = 204;
        res.send();
    }catch(err){
        res.statusCode = 404
        res.send(`${err}`);
    }
  }

module.exports = {
    getAllUsers,
    getUsersById,
    addUser,
    updateUser,
    removeUser
}