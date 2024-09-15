type StateType = {
    age:number
    cildrenCount:number
    name:string
}

type ActionType = {
    type:string
    [key:string]:any
}

export const userReducer =(state:any,action:any)=>{
    switch (action.type){
        case 'INCREMENT-AGE':
            state.age = action.age+1;
            return state;
        case "INCRENT-CHILDREN-COUNT":
            state.cildrenCount = action.cildrenCount+1;
            return state
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}