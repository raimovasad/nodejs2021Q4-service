const Board = require('../models/board.model');

function getAllBoards(req,res){
    const boards = Board.getAll()
    res.send(boards)
};

function getBoardById(req,res){
    const {id} = req.params;
    try{
        const user = Board.getById(id);
        res.send(user);

    }catch(error){
        res.statusCode = 404
        res.send(`${error.message}`)
    }

};

function updateBoard(req,res){
    const {id} = req.params;
    const {title,columns} = req.body;
    const board = {
        title,
        columns,
    }

    req.log.info(columns[0])
    const updated = Board.update(id,board)
    res.send(updated);
};

function addBoard(req,res) { 
    const {title,columns} = req.body
    if(!title || !columns){
        res.send({message:'Not entered the required field!'});
    }
    else{
        const board = new Board({title,columns})
        try{
           const newBoard = board.save()
           res.statusCode = 201
           res.send(newBoard)
        }
        catch(err){
            res.send({message: `${err.message}`})
        }
    }
 }

 function removeBoard(req,res) { 
    const {id} = req.params;
    try{
         Board.remove(id)
        res.statusCode =204
        res.send()
    }catch(err){
        res.send(`${err}`)
    }
  }

module.exports = {
    getAllBoards,
    getBoardById,
    updateBoard,
    addBoard,
    removeBoard
} 