
import {userReducer} from "./user-reducer";

test("user reducer", ()=>{

    const startState = {age:36,childrenCount:1, name:"Igor"};

    const endState = userReducer(startState,{type:"INCREMENT-AGE"});

    expect(endState.age).toBe(37);
    expect(endState.childrenCount).toBe(2);
})

