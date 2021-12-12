import { FastifyRequest, FastifyReply } from 'fastify';
import uuidTask from 'uuid';
import TaskMain from '../models/task.model';


function getAllTasks(req: FastifyRequest,res: FastifyReply){
    const {boardId} = req.params;
    const validId = uuidTask.validate(boardId);
    if(validId){
        const tasks = TaskMain.getAll();
        res.send(tasks);
    }
    else{
        res.statusCode = 400;
        res.send({message:'Your boardId is not valid!'})
    }
    
};



function getTaskById(req:FastifyRequest,res: FastifyReply){
    const {id} = req.params;
    // const validId = uuidTask.validate(boardId);
    // const validTaskId = uuidTask.validate(id);
    // if(validId && validTaskId){
        try{
            const task = TaskMain.getById(id);
            if(task){
                res.send(task);
            }
            else{
                res.statusCode = 404;
                res.send('No such task!')
            }
    
        }catch(error){
            res.statusCode = 404;
            res.send(`${error.message}`)
        }
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

function updateTask(req: FastifyRequest,res: FastifyReply){
    const {id} = req.params;
    // const validId = uuidTask.validate(boardId);
    // const validTaskId = uuidTask.validate(id);
    // if(validId && validTaskId){
        const {title,order,description,userId,columnId,boardId} = req.body;
        
        const task = {
            title,
            order,
            description,
            userId,
            boardId,
            columnId,
         };
         try{
            const updated = TaskMain.update(boardId,id,task)
            res.send(updated);
         }catch(error){
            res.send(`${error.message}`)
         }
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

function addTask(req: FastifyRequest,res: FastifyReply) { 
        const boardIdReq = req.params.boardId
        const {title,order,description,userId,columnId} = req.body
        
            const task = new TaskMain({
                title,
                order,
                description,
                userId,
                boardId: boardIdReq,
                columnId,
            })
            try{
               const newTask = task.save()
               res.statusCode = 201
               res.send(newTask)
            }
            catch(err){
                res.send({message: `${err.message}`})
            } 
   
 }

 function removeTask(req:FastifyRequest,res: FastifyReply) { 
    const {id} = req.params;
    // const validBoard = Board.getById(boardId)
    // const validId = uuidTask.validate(boardId);
    // const validTaskId = uuidTask.validate(boardId);

    // if(validTaskId){
        // if(!validBoard){
        //     res.statusCode = 404
        //      res.send('Invalid boardId!')
        // }else{
            try{
                const task = TaskMain.getById(id)
                if(!task){
                    res.statusCode = 404
                    res.send('No such task!')
                }
                TaskMain.remove(id)
                res.statusCode =204
                res.send()
            }catch(err){
                 res.send(`${err}`)
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