interface IUserDB {
    id: string,name: string,login: string, password: string
}

interface IBoardDB {
    id: string,
    title: string,
    columns: Array<{id: string,title: string,order: number}>
}

interface ITaskDB {
    id?: string,
    title: string,
    order: number,
    description: string,
    userId: string | null,
    boardId: string | null,
    columnId: string | null
}

type UserDB = Array<IUserDB>
type BoardDB = Array<IBoardDB>
type TaskDB = Array<ITaskDB>



declare const users: UserDB


declare const boards: BoardDB

declare const tasks: TaskDB


export default {
    users,
    boards,
    tasks,
}