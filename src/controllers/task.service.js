const uuid = require('uuid');
const Task = require('../models/task.model');


function getAllTasks(req,res){
    const {boardId} = req.params;
    const validId = uuid.validate(boardId);
    if(validId){
        const tasks = Task.getAll();
        res.send(tasks);
    }
    else{
        res.statusCode = 400;
        res.send({message:'Your boardId is not valid!'})
    }
    
};

function getTaskById(req,res){
    const {id,boardId} = req.params;
    const validId = uuid.validate(boardId);
    const validTaskId = uuid.validate(id);
    if(validId && validTaskId){
        try{
            const task = Task.getById(id);
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
    }
    else{
        res.statusCode = 400;
        if(!validId){
         res.send({message:'Your boardId is not valid!'})
        }
        else{
            res.send({message:'Your task id is not valid!'})
        }
    }
    

};

function updateTask(req,res){
    const {id} = req.params;
    // const validId = uuid.validate(boardId);
    // const validTaskId = uuid.validate(id);
    // if(validId && validTaskId){
        const {title,order,description,userId,columnId,boardId} = req.body;
        if(!title && !order && !description){
            res.statusCode = 400;
            res.send({message: 'Missed required field!'})
        }
    const task = {
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
    };
        try{
            const updated = Task.update(boardId,id,task)
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

function addTask(req,res) { 
        const {title,order,description,userId,boardId,columnId} = req.body
        if(!title || !order || !description){
            res.send({message:'Missed required field!'});
        }
        else{
            const task = new Task({
                title,
                order,
                description,
                userId,
                boardId,
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
   
 }

 function removeTask(req,res) { 
    const {id} = req.params;
    // const validBoard = Board.getById(boardId)
    // const validId = uuid.validate(boardId);
    // const validTaskId = uuid.validate(boardId);

    // if(validTaskId){
        // if(!validBoard){
        //     res.statusCode = 404
        //      res.send('Invalid boardId!')
        // }else{
            try{
                const task = Task.getById(id)
                if(!task){
                    res.statusCode = 404
                    res.send('No such task!')
                }
                Task.remove(id)
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

module.exports = {
    getAllTasks,
    updateTask,
    getTaskById,
    addTask,
    removeTask
} 