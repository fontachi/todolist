export type StateType = {
    age: number
    childrenCount: number
    name: string
}

export type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: any, action: any): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let copyStateForIncrementAge = {...state}
            copyStateForIncrementAge.age = copyStateForIncrementAge.age + 1;
            return copyStateForIncrementAge;
        case "INCRENT-CHILDREN-COUNT":
            let copyStateForChildrenCount = {...state}
            copyStateForChildrenCount.childrenCount = copyStateForChildrenCount.childrenCount + 1;
            return copyStateForChildrenCount
        case "CHANGE-NAME":
            let copyStateForChangeName = {...state};
             copyStateForChangeName.name = action.name;
            return copyStateForChangeName;
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}