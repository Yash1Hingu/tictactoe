import { useState } from 'react';
export default function Player({ initalName, symbol, isActive, onNameChange }) {
    const [isPlayerName, setPlayerName] = useState(initalName);
    const [isEditing, setEditing] = useState(false);

    function handlerEditClick() {
        setEditing(editing => !isEditing);
        if(isEditing) {
            onNameChange(symbol,isPlayerName);
        }
    }

    function handlerChange(event) {
        setPlayerName(event.target.value);
    }

    let editableName = <span className="player-name">{isPlayerName}</span>;
    if (isEditing) {
        editableName = <input type="text" value={isPlayerName} onChange={handlerChange} required />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editableName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handlerEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}