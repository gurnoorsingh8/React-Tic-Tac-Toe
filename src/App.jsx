import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"

function App() {

  const [gameTurns, setGameTurn] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleOnPlayerChange(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurn((prevTurns) => {

      let currentPlayer = 'X';

      if(prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        {
          square : {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer
        }, ...prevTurns,
      ];

        return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
          name='Player 1'
          symbol='X'
          isActive={activePlayer === 'X'}
          />
          <Player
          name='Player 2'
          symbol='O'
          isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard onSelectSquare={handleOnPlayerChange} turns = {gameTurns} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
