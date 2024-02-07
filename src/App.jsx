import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
  for(const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard) {
  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSymbol && firstSymbol === secondSymbol && secondSymbol === thirdSymbol) {
      winner = firstSymbol;
    }
  }
  return winner;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner

  function handleOnPlayerChange(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurn((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
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

  function handleRematch() {
    setGameTurn([]);
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
        {(winner || hasDraw) && <GameOver winner={winner} rematch = {handleRematch}/>}
        <GameBoard onSelectSquare={handleOnPlayerChange} board = {gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
