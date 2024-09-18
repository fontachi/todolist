import {userReducer} from "./user-reducer";
import {StateType} from "./user-reducer";

test("user reducer", () => {
    const startState:StateType = {age: 36, childrenCount: 1, name: "Igor"};
    const endState = userReducer(startState, {type: "INCREMENT-AGE"});

    expect(endState.age).toBe(37);
    expect(endState.childrenCount).toBe(1);
});

test("user reducer should increment only children", () => {
    const startState:StateType = {age: 36, childrenCount: 1, name: "Igor"};
    const endState = userReducer(startState, {type: "INCRENT-CHILDREN-COUNT"});

    expect(endState.age).toBe(36);
    expect(endState.childrenCount).toBe(2);
});

test("user reducer should change name", () => {
    const newName = "Basy";
    const startState:StateType = {age: 36, childrenCount: 1, name: "Igor"};
    const endState = userReducer(startState, {type: "CHANGE-NAME",name:newName});

    expect(endState.name).toBe("Basy");
    expect(endState.age).toBe(36);
    expect(endState.childrenCount).toBe(1);
});
