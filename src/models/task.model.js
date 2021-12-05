const {v4:uuid} = require('uuid');
const {tasks,boards,users} = require('../data/fakedatabase')

class Task {
  constructor({
    id = uuid(),
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

  static update(boardId,id,task){
    const tasksDB = tasks || undefined
    if(!tasksDB){
      throw new Error('Internal server error!')
    }
    const validBoard = boards.find(c=> c.id.toString() === boardId.toString())
    if(validBoard){
      throw new Error('Invalid boardId. No such board!')
    }
    const validUser = users.find(c=> c.id.toString() === task.userId.toString())
    if(validUser){
      throw new Error('Invalid userId. No such user!')
    }
    const index = tasks.findIndex( c=> c.id.toString() === id.toString())
    if(index === -1){
      throw new Error(`User with id ${id} doesn't exist!`)
    }
    tasks[index] = {
      id,
      ...task
    }
    return tasks[index];
  }
 
  

  static getAll(){
      return tasks;
    // const boardTasks = tasks.filter(c=> c.boardId === boardId.toString());
    // return boardTasks;
  }



  static getById(boardId,id){
    const tasksDB = tasks
    const task = tasksDB.find(c => c.id.toString() === id.toString())
    if(!task){
      throw new Error(`Task with id ${id} doesn't exist!`)
    }else{
      return task;
    }
  }

  static remove(id){
    const index = tasks.findIndex( c=> c.id === id)
    if(index === -1){
      throw Error(`Task with id ${id} doesn't exist!`)
    }
    else{
      tasks.splice(index,1)
    }
    return tasks;

  }

  static removeByBoard(boardId){
    const index = tasks.findIndex( c=> c.boardId === boardId)
    if(index === -1){
      throw Error(`Task with boarId ${boardId} doesn't exist!`)
    }
    else{
      tasks.splice(index,1)
    }
  }

  static removeUserId(userId){
      tasks.forEach(task => {
        if(task.userId === userId){
          task[''] = null
        }
      })
  }
  
}

module.exports = Task;
