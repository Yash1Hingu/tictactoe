const initalGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
export default function GameBoard ( { onSelectSqure } ) {
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
            {gameBoard.map((row,rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => <li key={colIndex}>
                        <button onClick={ onSelectSqure }>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}