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
    return this.toSaveBoard();
  } 

  static update(id,board){
    const usersDB = boards || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    const index = boards.findIndex( c=> c.id.toString() === id.toString())
    if(index === -1){
      throw new Error(`User with id ${id} doesn't exist!`)
    }
    boards[index] = {
      id,
      ...board
    }
    return boards[index];
  }
 


  static getAll(){
    return boards
  }



  static getById(id){
    const boardsDB = boards
    const board = boardsDB.find(c => c.id.toString() === id.toString())
    if(!board){
      throw new Error(`User with id ${id} doesn't exist!`)
    }else{
      return board;
    }
  }

  static remove(id){
    const index = boards.findIndex( c=> c.id === id)
    if(index === -1){
      throw Error(`User with id ${id} doesn't exist!`)
    }
    else{
        boards.splice(index,1)
    }
    return boards;

  }

  
}

module.exports = Board;
