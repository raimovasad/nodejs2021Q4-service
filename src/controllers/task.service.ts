import { FastifyRequest, FastifyReply } from 'fastify';
import {validate} from 'uuid';
import {Task} from '../models/task.model';


type getAllReq = FastifyRequest<{
    Params: { boardId: string}
}>

type getByIdReq = FastifyRequest<{
    Params:{id: string}
}>


type updateTaskReq = FastifyRequest<{
    Params:{id: string},
    Body:{
        title: string,
        order: number, 
        description: string,
        userId:string, 
        columnId: string, 
        boardId: string
    }
}>

interface Itask {
    title: string,
    order: number,
    description: string,
    userId: string,
    boardId: string,
    columnId: string, 
}

type addReq = FastifyRequest<{
    Params: {boardId: string},
    Body:{title: string,order: number,description: string,userId: string,columnId: string}
}>


/**
 * This funtion sends all tasks
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function getAllTasks(req: getAllReq,res: FastifyReply){
    const {boardId} = req.params;
    const validId = validate(boardId);
    if(validId){
        const tasks = Task.find();
        res.send(tasks);
    }
    else{
        res.statusCode = 400;
        res.send({message:'Your boardId is not valid!'})
    }
    
};

/**
 * This function get the task by id and sends it to client
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */


async function getTaskById(req:getByIdReq,res: FastifyReply): Promise<void>{
    const {id} = req.params;
    // const validId = uuidTask.validate(boardId);
    // const validTaskId = uuidTask.validate(id);
    // if(validId && validTaskId){
        const task = Task.findOne({id});
        res.send(task);
       
    // }
    // else{
    //     res.statusCode = 400;
    //     if(!validId){
    //      res.send({message:'Your boardId is not valid!'})
    //     }
    //     else{
    //         res.send({message:'Your task id is not valid!'})
    //     }
    // }
    

};

/**
 * This function updates the task by id and sends it to client
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function updateTask(req: updateTaskReq,res: FastifyReply){
    // const validId = uuidTask.validate(boardId);
    // const validTaskId = uuidTask.validate(id);
    // if(validId && validTaskId){
        const {id} = req.params;
        const {title,order,description,userId,columnId,boardId} = req.body;
        
        const task:Itask = {
            title,
            order,
            description,
            userId,
            boardId,
            columnId,
         };
        const updated = Task.update(id,task)
        res.send(updated);
        
    // }
    // else{
    //     res.statusCode = 400;
        // if(!validId){
        //  res.send({message:'Your boardId is not valid!'})
        // }
        // else{
        //     res.send({message:'Your task id is not valid!'})
        // }
    // }
   
};


/**
 * This function adds new task and sends it to client
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function addTask(req: addReq,res: FastifyReply) { 
        const {boardId:boardIdReq} = req.params
        const {title,order,description,userId,columnId} = req.body
        
            const task = new Task({
                title,
                order,
                description,
                userId,
                boardId: boardIdReq,
                columnId,
            })
               const newTask = task.save()
               res.statusCode = 201
               res.send(newTask)
            
   
 }


 /**
 * This function removes the task by id
 * 
 * 
 * @param req - fastify request
 * @param res - fastify reply
 */

async function removeTask(req:getByIdReq,res: FastifyReply) { 
    const {id} = req.params;
    // const validBoard = Board.getById(boardId)
    // const validId = uuidTask.validate(boardId);
    // const validTaskId = uuidTask.validate(boardId);

    // if(validTaskId){
        // if(!validBoard){
        //     res.statusCode = 404
        //      res.send('Invalid boardId!')
        // }else{
                const task = await Task.findOne({id})
                if(!task){
                    res.statusCode = 404
                    res.send('No such task!')
                }
                else
                {
                    await Task.remove(task)
                    res.statusCode =204
                    res.send()
                }
               
            
        // }
        
    // }
    // else{
    //     res.statusCode = 400;
    //     if(!validId){
    //         res.send({message:"Your boardId is not valid!"})
    //     }
    //     else{
    //         res.send({message:"Your task id is not valid!"})
    //     }
    // }
   
  }

export default {
    getAllTasks,
    updateTask,
    getTaskById,
    addTask,
    removeTask
} 