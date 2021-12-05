const {v4:uuid} = require('uuid');
const {boards} = require('../data/fakedatabase')

class Board {
  constructor({
    id = uuid(),
    title = 'REST',
    columns = [{id:'dasdasd'}]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  

  toSaveBoard(){
    return {
      id: this.id,
      title: this.title,
      columns: this.parseColumns()
    }
  }

   parseColumns(){
    const cols = this.columns.map(col => {
        const {title,order} = col;
        const column ={id: uuid(),title,order}
        return column
    })
     return cols;
  }

  save(){
    const boardsDB = boards || undefined
    if(!boardsDB){
      throw new Error('Internal server error!')
    }
    boards.push(this.toSaveBoard())
    return boards[boards.length-1];
  } 

  static update(id,board){
    const usersDB = boards || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    const index = boards.findIndex( c=> c.id.toString() === id.toString())
    if(index === -1){
      throw new Error(`Board with id ${id} doesn't exist!`)
    }
    const newBoard = {};
    newBoard.id =  id;
    newBoard.title = board.title;
    newBoard.columns = board.columns.map(col=> ({id:col.id,title:col.title,order:col.order}));

    boards[index] = newBoard;
    return boards[index];
  }
 


  static getAll(){
    return boards
  }



  static getById(id){
    const boardsDB = boards
    const board = boardsDB.find(c => c.id.toString() === id.toString())
    return board;
  }

  static remove(id){
    const index = boards.findIndex( c=> c.id === id)
    if(index === -1){
      throw Error(`Board with id ${id} doesn't exist!`)
    }
    else{
        boards.splice(index,1)
        return boards;

    }

  }

  
}

module.exports = Board;
