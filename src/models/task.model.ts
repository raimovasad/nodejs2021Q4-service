import { v4 as uuidV4 } from 'uuid';
import fakeDB from '../data/fakedatabase';


const {tasks} = fakeDB


interface ITask{
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

class Task {

  public id: string;

  public title: string;

  public order: number;

  public description: string;

  public userId: string | null;

  public boardId: string | null;

  public columnId: string | null;

  constructor({
    id = uuidV4(),
    title = 'Write essay',
    order = 3,
    description = 'There is 5 essays to write for you',
    userId='sdsafdsgfdg',
    boardId= "aasdasdasd",
    columnId="sdf34rfefwefwe"
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  toSaveTask(){
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId,
    }
  }

  save(){
    const tasksDB = tasks || undefined
    if(!tasksDB){
      throw new Error('Internal server error!')
    }
    tasks.push(this.toSaveTask())
    return tasks[tasks.length-1];
  } 

  static update(boardId: string,id: string,task:ITask){
    const tasksDB = tasks || undefined
    if(!tasksDB){
      throw new Error('Internal server error!')
    }
    // const validBoard = boards.find(c=> c.id.toString() === boardId.toString())
    // if(validBoard){
    //   throw new Error('Invalid boardId. No such board!')
    // }
    // const validUser = users.find(c=> c.id.toString() === task.userId.toString())
    // if(validUser){
    //   throw new Error('Invalid userId. No such user!')
    // }
    const index = tasks.findIndex( (c: ITask)=> c.id === id)
    // if(index === -1){
    //   throw new Error(`User with id ${id} doesn't exist!`)
    // }
    const newTask : ITask= {
      id,
      ...task
    };

    tasks[index] = newTask;
    return tasks[index];
    
  }
 
  

  static getAll(){
      return tasks;
    // const boardTasks = tasks.filter(c=> c.boardId === boardId.toString());
    // return boardTasks;
  }



  static getById(id: string){
    const tasksDB = tasks
    const task = tasksDB.find(c => c.id.toString() === id.toString())
      return task;
  }

  static remove(id: string){
    const index = tasks.findIndex( c=> c.id === id)
    if(index === -1){
      throw Error(`Task with id ${id} doesn't exist!`)
    }
    else{
      tasks.splice(index,1)
    }
    return tasks;

  }

  static removeByBoard(boardId: string){
    const index = tasks.findIndex( c=> c.boardId === boardId)
    const array = tasks.filter(c=> c.boardId === boardId)
    if(index !== -1){
      tasks.splice(index,array.length)
    }
  }

  static removeUserId(userId: string){
      tasks.forEach(task => {
        if(task.userId === userId){
          Object.assign(task,{userId : null})
        }
      })
  }
  
}

export default Task;
