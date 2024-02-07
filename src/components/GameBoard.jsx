

export default function GameBoard({ onSelectSquare, board}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>  <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                    </li>)} 
                </ol>
                
                </li>)}
        </ol>
    );
}



    // const [gameBoard, setGaneBoard] = useState(initialGameBoard)

    // function handlePlayerTurn(rowIndex, colIndex) {
    //     setGaneBoard((previousGameBoard) => {
    //         const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     })
    //     onSelectSquare();
    // }
    
