import { useState } from 'react';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from './components/GameOver.jsx';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initalGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Deriving State from Props
    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSqureSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSqureSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSqureSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSqureSymbol &&
      firstSqureSymbol === secondSqureSymbol &&
      firstSqureSymbol === thirdSqureSymbol
    ) {
      winner = firstSqureSymbol;
    }
  }

  const hasDrawn = gameTurns.length == 9 && !winner;

  function handlerSelectSqure(rowIndex, colIndex) {
    // setActivePlayer((perviousPlayer) => perviousPlayer === 'X' ? 'O' : 'X');

    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initalName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player initalName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDrawn) && <GameOver winner={winner} />}
        <GameBoard
          onSelectSqure={handlerSelectSqure}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
