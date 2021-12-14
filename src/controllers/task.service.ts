import { FastifyRequest, FastifyReply } from 'fastify';
import uuidTask from 'uuid';
import TaskMain from '../models/task.model';


type getAllReq = FastifyRequest<{
    Params: { boardId: string}
}>

async function getAllTasks(req: getAllReq,res: FastifyReply){
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

type getByIdReq = FastifyRequest<{
    Params:{id: string}
}>

async function getTaskById(req:getByIdReq,res: FastifyReply){
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
    
        }catch(error: unknown){
            if( error instanceof Error){
                res.statusCode = 404;
                res.send(`${error.message}`)
            }
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
         try{
            const updated = TaskMain.update(boardId,id,task)
              res.send(updated);
         }catch(error: unknown){
             if( error instanceof Error){
                res.send(`${error.message}`)
             }
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

type addReq = FastifyRequest<{
    Params: {boardId: string},
    Body:{title: string,order: number,description: string,userId: string,columnId: string}
}>

async function addTask(req: addReq,res: FastifyReply) { 
        const {boardId:boardIdReq} = req.params
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
                res.send({message: `${String(err)}`})
            } 
   
 }

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