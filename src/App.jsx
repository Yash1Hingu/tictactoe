import { useState } from 'react';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from './components/GameOver.jsx';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

const INITAL_GAMEBOARD = [
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

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSqureSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSqureSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSqureSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSqureSymbol &&
      firstSqureSymbol === secondSqureSymbol &&
      firstSqureSymbol === thirdSqureSymbol
    ) {
      winner = players[firstSqureSymbol];
    }
  }

  return winner;
}

function derivegameBoard(gameTurns) {
  let gameBoard = [...INITAL_GAMEBOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Deriving State from Props
    gameBoard[row][col] = player;
  }

  return gameBoard;

}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = derivegameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDrawn = gameTurns.length == 9 && !winner;

  function handlerSelectSqure(rowIndex, colIndex) {
    // setActivePlayer((perviousPlayer) => perviousPlayer === 'X' ? 'O' : 'X');

    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]
      return updatedTurns;
    });
  }

  function handlerRestart() {
    setGameTurns([]);
  }

  function handlerPlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player
            initalName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onNameChange={handlerPlayerNameChange}
          />
          <Player
            initalName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onNameChange={handlerPlayerNameChange}
          />
        </ol>
        {(winner || hasDrawn) && <GameOver winner={winner} onRestart={handlerRestart} />}
        <GameBoard
          onSelectSqure={handlerSelectSqure}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
