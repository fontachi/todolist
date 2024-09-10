import React, {ChangeEvent, useState} from "react";

type addItemFormProps = {
    addItem:(title:string)=>void,
}

export function AddItemForm(props: addItemFormProps): JSX.Element {
    let [newTitle, setNewTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addingTask();
        }
    }
    const addingTask = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle);
            setNewTitle('');
        } else {
            setError("Title is required");
        }

    }
    return (
        <div>
            <input type={"text"} value={newTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addingTask}>+</button>
            {error ? <div className="error-message">{error}</div> : null}
        </div>

    )
}