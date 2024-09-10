import React, {ChangeEvent} from "react";
import {useState} from "react";

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

    return (
            editMode
            ? <input type={"text"} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>

    )
}