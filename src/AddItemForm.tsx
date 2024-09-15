import {Button, IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {Add} from "@mui/icons-material";

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
            <TextField error={!!error}
                       size={"small"}
                       id="outlined-basic"
                       label="title value"
                       variant="standard" type={"text"}
                       value={newTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       helperText={error}/>
            <IconButton color={"primary"} onClick={addingTask}>
                <Add></Add>
            </IconButton>

        </div>

    )
}