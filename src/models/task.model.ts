import { v4 as uuidV4 } from 'uuid';




interface ITask{
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}


 const tasks: ITask[] = []

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

 

     /**
   * Returns the user params as an object.
   *
   *
   * @returns The user object that is going to be save
   *
   */
  toSaveTask(): ITask{
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

  /**
   * Saves the task in the database
   * 
   * @returns Just saved task
   * @throws Throws new Error if cannot access to database
   */

  save(): ITask{
    const tasksDB: Array<ITask> = tasks || undefined
    if(!tasksDB){
      throw new Error('Internal server error!')
    }
    tasks.push(this.toSaveTask())
    return tasks[tasks.length-1];
  } 

   /**
   * Updates the user by in database.
   *
   *
   * @param id - The id of the task  
   * @param task - The object of the task  
   * @returns The new task object that is saved
   * @throws An Error if there is no access to database
   */

  static update(id: string,task:ITask): ITask{
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
 
   /**
   * Returns all tasks in database.
   *
   *
   * @returns All tasks in database
   */

  static getAll(): ITask[]{
      return tasks;
    // const boardTasks = tasks.filter(c=> c.boardId === boardId.toString());
    // return boardTasks;
  }

  /**
   * Returns the user by id.
   *
   *
   * @param id - The id of the user  
   * @returns The user object
   * @throws Throws new Error if the user with that id doesn't exist
   */

  static getById(id: string): ITask{
    const tasksDB = tasks
    const task = tasksDB.find(c => c.id === id)
    if(!task){
      throw new Error(`There is no such task with the id ${id}`)
    }
      return task;
  }

  /**
   * Removes the task by id.
   *
   *
   * @param id - The id of the task  
   * @throws Throws new Error if the task with that id doesn't exist
   */


  static remove(id: string):void{
    const index = tasks.findIndex( c=> c.id === id)
    if(index === -1){
      throw Error(`Task with id ${id} doesn't exist!`)
    }
    else{
      tasks.splice(index,1)
    }
  }

  /**
   * Removes the task by boardId when the board is removed.
   *
   *
   * @param boardId - The id of the board of the task  
   */

  static removeByBoard(boardId: string): void{
    const index = tasks.findIndex( c=> c.boardId === boardId)
    const array = tasks.filter(c=> c.boardId === boardId)
    if(index !== -1){
      tasks.splice(index,array.length)
    }
  }

  /**
   * Removes the feature userId in the task when the user is removed.
   *
   *
   * @param userId - The id of the user of the task  
   */

  static removeUserId(userId: string): void{
      tasks.forEach(task => {
        if(task.userId === userId){
          Object.assign(task,{userId : null})
        }
      })
  }
  
}

export default Task;
