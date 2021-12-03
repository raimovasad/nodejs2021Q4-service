const {v4:uuid} = require('uuid');
const {tasks} = require('../data/fakedatabase')

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

  toSaveUser(){
    return {
      id: this.id,
      name: this.name,
      login: this.login,
      password: this.password
    }
  }

  save(){
    const usersDB = tasks || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    tasks.push(this.toSaveUser())
    return this.toSaveUser();
  } 

  static update(id,user){
    const usersDB = tasks || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    const index = tasks.findIndex( c=> c.id.toString() === id.toString())
    if(index === -1){
      throw new Error(`User with id ${id} doesn't exist!`)
    }
    tasks[index] = {
      id,
      ...user
    }
    return tasks[index];
  }
 
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }


  static getAll(){
    return users
  }



  static getById(id){
    const usersDB = users
    const user = usersDB.find(c => c.id.toString() === id.toString())
    if(!user){
      throw new Error(`User with id ${id} doesn't exist!`)
    }else{
      return user;
    }
  }

  static remove(id){
    const index = users.findIndex( c=> c.id === id)
    if(index === -1){
      throw Error(`User with id ${id} doesn't exist!`)
    }
    else{
     users.splice(index,1)
    }
    return users;

  }

  
}

module.exports = Task;
