const Board = require('../models/board.model');

function getAllBoards(req,res){
    const boards = Board.getAll()
    res.send(boards)
};

function getBoardById(req,res){
    const {id} = req.params;
    const user = Board.getById(id);
    res.send(user);
};

function updateBoard(req,res){
    const {id} = req.params;
    const {title,columns} = req.body;
    const board = {
        title,
        columns,
    }
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
        const updatedBoards = Board.remove(id)
        res.send(updatedBoards)
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