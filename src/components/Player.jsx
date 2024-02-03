import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(name)
    const [isClicked, setIsClicked] = useState(false);


    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    function handleClick() {
        setIsClicked((editing) => !editing)
    }

    let editablePlayerName = <span className="player-name"> {playerName} </span>
    
    if(isClicked) {
        editablePlayerName = <input type="text" value={playerName} onChange={handleChange}/>
    }

    return (
        <li className={isActive? 'active': undefined}>
            <span className="player">
                {/* {!isClicked && (
                    <span className="player-name"> {name}</span>
                )} */}
                
                {editablePlayerName}

                {/* {isClicked && (
                    <input type="text" />
                )} */}
                <span className="player-symbol">{symbol}</span>
            </span>


            {!isClicked && (
                <button onClick={handleClick}>Edit</button>
            )}
            {isClicked && (
                <button onClick={handleClick}>Save</button>
            )}
        </li>

    );
}