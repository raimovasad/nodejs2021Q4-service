import { v4 as uuid } from 'uuid';
import FakeDB from '../data/fakedatabase';

const { users } = FakeDB

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
interface IUserNoId {
  name: string;
  login: string;
  password: string;
}

class User {

public id: string;

public name: string;

public login: string;

public password: string;


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

  toSaveUser():IUser{
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

  static update(id: string,user: IUserNoId){
    const usersDB = users || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    const index = users.findIndex( (c: IUser)=> c.id === id)
    if(index === -1){
      throw new Error(`User with id ${id} doesn't exist!`)
    }
    users[index] = {
      id,
      ...user
    }
    return users[index];
  }
 
  static toResponse(user:IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }


  static getAll(){
    return users
  }



  static getById(id: string){
    const usersDB = users
    const user = usersDB.find(c => c.id.toString() === id.toString())
    if(!user){
      throw new Error(`User with id ${id} doesn't exist!`)
    }else{
      return user;
    }
  }

  static remove(id: string){
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

export default User;
