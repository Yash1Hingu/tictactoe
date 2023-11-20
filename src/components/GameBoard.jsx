const initalGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]
export default function GameBoard({ onSelectSqure, turns }) {
    let gameBoard = initalGameBoard;

    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;

        // Deriving State from Props
        gameBoard[row][col] = player;
    }
    // const [gameBoard,setGameBoard] = useState(initalGameBoard);
    // function handlerClick (rowIndex,colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol ;
    //         return updatedBoard;
    //     })

    //     onSelectSqure();
    // }
    return (
        <ol id="game-board">    
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSqure(rowIndex, colIndex)} disabled={playerSymbol != null ? true : false}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}