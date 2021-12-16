import { FastifyRequest, FastifyReply } from 'fastify';
import User from '../models/user.model';
import Task from '../models/task.model';



type getUserByIdReq = FastifyRequest<{
Params: { id: string}
}>

type updateUserReq = FastifyRequest<{
Params: { id: string},
Body:{name: string, login: string, password: string}
}>

type addUserReq = FastifyRequest<{
Body:{name: string, login: string, password: string}
}>

interface Iuser {
    id: string,
    name: string,
    login: string,
    password: string
}


/**
 * getAllUsers
 * This function gets ```All``` users and sends it to client
 * 
 * 
 * @param req 
 * @param res 
 */

async function getAllUsers(req: FastifyRequest,res: FastifyReply){
    const users: Array<Iuser> = User.getAll()

    res.send(users.map(user => User.toResponse(user)))
};

/**
 * getUsersById
 * This function gets the user by id and sends it to client
 * 
 * 
 * @param req 
 * @param res 
 */

async function getUsersById(req: getUserByIdReq,res: FastifyReply){
    const {id} = req.params;
    const user = User.getById(id);
    res.send(User.toResponse(user));
};

/**
 * updateUser
 * This function updates the user by id and sends it to client
 * 
 * 
 * @param req 
 * @param res 
 */

async function updateUser(req: updateUserReq,res: FastifyReply){
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

/**
 * addUser
 * This function adds new user and sends it to client
 * 
 * 
 * @param req 
 * @param res 
 */

async function addUser(req: addUserReq ,res: FastifyReply) { 
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
            res.send({message: `${String(err)}`})
        }
    }
 }


 
/**
 * removeUser
 * This function removes the user by id
 * 
 * @param req 
 * @param res 
 */

 async function removeUser(req: getUserByIdReq,res: FastifyReply) { 
    const {id} = req.params;
    try{
        User.remove(id);
        Task.removeUserId(id);
        res.statusCode = 204;
        res.send();
    }catch(err){
        res.statusCode = 404
        res.send(`${err}`);
    }
  }

export default {
    getAllUsers,
    getUsersById,
    addUser,
    updateUser,
    removeUser
}