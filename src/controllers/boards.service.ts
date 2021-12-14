import { FastifyRequest, FastifyReply } from "fastify";

import BoardModel from '../models/board.model';
import TaskModel from '../models/task.model';


async function getAllBoards(req: FastifyRequest,res: FastifyReply){
    const boards = BoardModel.getAll()
    res.send(boards)
};

type CustomGetByIdReq = FastifyRequest<{
    Params:{id: string}
}>

async function getBoardById(req: CustomGetByIdReq,res: FastifyReply){
    const {id} = req.params;
    const board = BoardModel.getById(id);
    if(board){
        res.send(board);
    }
    else{
    res.statusCode = 404
    res.send(`No such board!`)
    }
       

};

type CustomUpdateReq = FastifyRequest<{
    Params:{id: string};
    Body:{title: string, columns: Array<{id: string, title: string, order: number}>}
}>

interface Board{
    id?: string;
    title: string;
    columns: Array<{id: string, title: string, order: number}> 
}

async function updateBoard(req: CustomUpdateReq,res: FastifyReply){
    const {id} = req.params;
    const {title,columns} = req.body;
    const board:Board = {
        title,
        columns,
    }

    const updated = BoardModel.update(id, board)
    res.send(updated);
};

type CustomAddReq = FastifyRequest<{
    Body:{title: string, columns: Array<{id: string, title: string, order: number}>}
}>

async function addBoard(req: CustomAddReq,res: FastifyReply) { 
    const {title,columns} = req.body
    if(!title || !columns){
        res.send({message:'Not entered the required field!'});
    }
    else{
        const board = new BoardModel({title,columns})
           const newBoard = board.save()
           res.statusCode = 201
           res.send(newBoard)
    }
 }

async function removeBoard(req: CustomGetByIdReq,res: FastifyReply) { 
    const {id} = req.params;
    try{
        BoardModel.remove(id)
         TaskModel.removeByBoard(id)

        res.statusCode =204
        res.send()
    }catch(err){
        res.send(`${err}`)
    }
  }

export default {
    getAllBoards,
    getBoardById,
    updateBoard,
    addBoard,
    removeBoard
} 