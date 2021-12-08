const {v4:uuid} = require('uuid');
const {users} = require('../data/fakedatabase')

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
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
    const usersDB = users || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    users.push(this.toSaveUser())
    return this.toSaveUser();
  } 

  static update(id,user){
    const usersDB = users || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    const index = users.findIndex( c=> c.id.toString() === id.toString())
    if(index === -1){
      throw new Error(`User with id ${id} doesn't exist!`)
    }
    users[index] = {
      id,
      ...user
    }
    return users[index];
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

module.exports = User;
