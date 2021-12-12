import {v4 as uuidM} from "uuid"
import fakeDB from '../data/fakedatabase';

const {boards} = fakeDB



interface IColumn {
  id: string;
  title: string;
  order: number;
}
interface IBoard {
  id: string;
  title: string;
  columns: Array<{id:string;title:string;order:number}>;
}

class Board {

  public id: string;

  public title: string;

  public columns: Array<{id:string;title:string;order:number}>;
  
  constructor({
    id = uuidM.v4(),
    title = 'REST',
    columns = [{id:'dasdasd',title: 'do smth', order: 12}]
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
    const cols = this.columns.map((col:IColumn) => {
        const {title,order} = col;
        const column ={id: uuidM.v4(),title,order}
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
    const newBoard: IBoard = {id:'',title:'',columns:[{id:'',title:'',order:0}]}
    newBoard.id =  id;
    newBoard.title = board.title;
    newBoard.columns = board.columns.map((col:IColumn)=> ({id:col.id,title:col.title,order:col.order}));

    boards[index] = newBoard;
    return boards[index];
  }
 


  static getAll(){
    return boards
  }



  static getById(id:  string){
    const boardsDB = boards
    const board = boardsDB.find((c:IBoard) => c.id === id)
    return board;
  }

  static remove(id: string){
    const index = boards.findIndex( (c: IBoard) => c.id === id)
    if(index === -1){
      throw Error(`Board with id ${id} doesn't exist!`)
    }
    else{
        boards.splice(index,1)
        return boards;

    }

  }

  
}

export default Board;
