import React from "react";

function Input (props) {
    return (
        <div className="input">
            <input type="text" placeholder={props.placeholder} onChange={props.handleChange} />
            <button onClick={props.handleClick}>{props.text}</button>
        </div>
    )
}

export default Input;