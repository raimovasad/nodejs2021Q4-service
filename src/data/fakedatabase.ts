interface IfakeDB {
    users: Array<{id:'',name:'',login:'', password: ''}>;
    boards: Array<object>;
    tasks: Array<{id: string,title: string,order: number,description: string,userId: string,boardId: string,columnId: string}>;
}
const fakeDB: IfakeDB ={
    users:[{id:'',name:'',login:'', password: ''}],
    boards:[{id:'',title:'',order:0,description: '',userId:'',boardId:'',columnId:''}],
    tasks:[{id:'',title:'',order:0,description: '',userId:'',boardId:'',columnId:''}]
}
export default fakeDB