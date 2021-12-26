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
 * This function gets All users and sends it to client
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function getAllUsers(req: FastifyRequest,res: FastifyReply): Promise<void>{
    const users: Array<Iuser> = User.getAll()

    res.send(users.map(user => User.toResponse(user)))
};

/**
 * This function gets the user by id and sends it to client
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function getUsersById(req: getUserByIdReq,res: FastifyReply): Promise<void>{
    const {id} = req.params;
    const user = User.getById(id);
    res.send(User.toResponse(user));
};

/**
 * This function updates the user by id and sends it to client
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function updateUser(req: updateUserReq,res: FastifyReply): Promise<void>{
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
 * This function adds new user and sends it to client
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function addUser(req: addUserReq ,res: FastifyReply): Promise<void> { 
    const {name,login,password} = req.body
    if(!name || !login || !password){
        res.send({message:'Not entered the required field!'});
    }
    else{
        const user = new User({name,login,password})
            const newUser = user.save()
            res.statusCode =201;
            res.send(User.toResponse(newUser))
        
    }
 }


 
/**
 * This function removes the user by id
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

 async function removeUser(req: getUserByIdReq,res: FastifyReply): Promise<void> { 
    const {id} = req.params;
        User.remove(id);
        Task.removeUserId(id);
        res.statusCode = 204;
        res.send();
    
  }

export default {
    getAllUsers,
    getUsersById,
    addUser,
    updateUser,
    removeUser
}