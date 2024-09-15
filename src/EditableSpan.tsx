import React, {ChangeEvent} from "react";
import {useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string;
    onChangeItemTitle: (title: string) => void;
}

export function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    function activeEditMode() {
        setEditMode(true);
        setTitle(props.title);
    }

    function activeViewMode() {
        setEditMode(false);
        props.onChangeItemTitle(title);
    }

    function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        if ((e.currentTarget.value).trim() !== "") {
            setTitle((e.currentTarget.value).trim());
        }
    }

    // <input type={"text"} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
    return (
        editMode
            ? <TextField size={"small"} id="outlined-basic" label="Standart" variant="standard" onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}