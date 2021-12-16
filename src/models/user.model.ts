import { v4 as uuid } from 'uuid';


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


 const users: IUser[] = []
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

  /**
   * Returns the user params as an object.
   *
   *
   * @returns The user object that is going to be save
   *
   */

  toSaveUser():IUser{
    return {
      id: this.id,
      name: this.name,
      login: this.login,
      password: this.password
    }
  }

    /**
   * Saves a new user in database.
   *
   *  
   * @returns The new user object that is saved
   * @throws An Error if there is no access to the database
   */

  save(){
    const usersDB = users || undefined
    if(!usersDB){
      throw new Error('Internal server error!')
    }
    users.push(this.toSaveUser())
    return this.toSaveUser();
  } 

   /**
   * Updates the user by in database.
   *
   *
   * @param id - The id of the user  
   * @param user - The object of the user  
   * @returns The new user object that is saved
   * @throws An Error id the user with that id doesn't exist
   */

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
    return this.toResponse(users[index]);
  }
 
   /**
   * Returns the user without password.
   *
   *
   * @param user - The object of the user  
   * @returns The user object without password 
   */

  static toResponse(user:IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }

   /**
   * Returns all users in database.
   *
   *
   * @returns All users in database
   */

  static getAll(){
    return users
  }

   /**
   * Returns the user by id.
   *
   *
   * @param id - The id of the user  
   * @returns The user object
   * @throws An Error if the user with that id doesn't exist
   */

  static getById(id: string){
    const usersDB = users
    const user = usersDB.find(c => c.id.toString() === id.toString())
    if(!user){
      throw new Error(`User with id ${id} doesn't exist!`)
    }else{
      return user;
    }
  }

   /**
   * Removes the user by id.
   *
   *
   * @param id - The id of the user  
   * @throws An Error if the user with that id doesn't exist
   */

  static remove(id: string){
    const index = users.findIndex( c=> c.id === id)
    if(index === -1){
      throw Error(`User with id ${id} doesn't exist!`)
    }
    else{
     users.splice(index,1)
    }

  }

  
}

export default User;
