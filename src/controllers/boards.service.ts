import { FastifyRequest, FastifyReply } from "fastify";

import {Board} from '../models/board.model';
// import {Task} from '../models/task.model';


type CustomUpdateReq = FastifyRequest<{
    Params:{id: string};
    Body:{title: string, columns: Array<{id: string, title: string, order: number}>}
}>

interface IBoard{
    id?: string;
    title: string;
    columns: Array<{id: string, title: string, order: number}> 
}

type CustomAddReq = FastifyRequest<{
    Body:{title: string, columns: Array<{id: string, title: string, order: number}>}
}>

type CustomGetByIdReq = FastifyRequest<{
    Params:{id: string}
}>



/**
 * This function sends All boards to the client
 * 
 * 
 * @param req - fastify request 
 * @param res - fastify response
 */

async function getAllBoards(req: FastifyRequest,res: FastifyReply): Promise<void>{
    const boards = await Board.find()
    res.send(boards)
};


/**
 * This function sends board by id to the client
 * 
 * 
 * @param req - fastify request 
 * @param res - fastify response
 */

async function getBoardById(req: CustomGetByIdReq,res: FastifyReply): Promise<void>{
    const {id} = req.params;
    // try{
    const board = Board.findOne(id);
    res.send(board);
    // }catch(e){
    //    if(e instanceof Error){
    //     res.statusCode = 404
    //     res.send(`${e.message}`)
    //    }
    // }
    
    
       

};

/**
 * This function updates board by id and send the updated board to the client
 * 
 * 
 * @param req - fastify request 
 * @param res - fastify response
 */

async function updateBoard(req: CustomUpdateReq,res: FastifyReply): Promise<void>{
    const {id} = req.params;
    const {title,columns} = req.body;
    const board:IBoard = {
        title,
        columns,
    }

    const updated = Board.update(id, board)
    res.send(updated);
};

/**
 * This function adds new board and send the board to the client
 * 
 * 
 * @param req - fastify request 
 * @param res - fastify response
 */

async function addBoard(req: CustomAddReq,res: FastifyReply): Promise<void> { 
    const {title,columns} = req.body
    if(!title || !columns){
        res.send({message:'Not entered the required field!'});
    }
    else{
        const board = new Board({title,columns})
           const newBoard = board.save()
           res.statusCode = 201
           res.send(newBoard)
    }
 }

 /**
 * This function removes board by id 
 * 
 * 
 * @param req - fastify request 
 * @param res - fastify response
 */

async function removeBoard(req: CustomGetByIdReq,res: FastifyReply): Promise<void> { 
    const {id} = req.params;
        Board.delete(id)
        //  Task.removeByBoard(id)

        res.statusCode =204
        res.send()
    
  }

export default {
    getAllBoards,
    getBoardById,
    updateBoard,
    addBoard,
    removeBoard
} 