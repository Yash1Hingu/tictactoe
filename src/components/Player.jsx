import { useState } from 'react';
export default function Player({ name , symbol }) {
    const [isEditing,setEditing] = useState(false);

    function handlerEditClick() {
        setEditing(isEditing ? false : true);
    }

    let playerName = <span className="player-name">{name}</span>;
    if(isEditing){
        playerName = <input type="text" required/>;
    }

    return (
        <li>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handlerEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}