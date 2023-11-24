export default function GameBoard({ onSelectSqure, board }) {

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
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSqure(rowIndex, colIndex)} disabled={playerSymbol != null ? true : false}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}