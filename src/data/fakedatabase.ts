interface IfakeDB {
    users: Array<string>;
    boards: Array<object>;
    tasks: Array<object>;
}
const fakeDB: IfakeDB ={
    users:[],
    boards:[],
    tasks:[]
}
export default fakeDB