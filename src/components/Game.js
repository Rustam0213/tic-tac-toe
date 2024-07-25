import React, { useState, useEffect } from 'react';
import Board from './Board';
import Tic from './Tic';
import Tac from './Tac';
import confetti from 'canvas-confetti';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];

  useEffect(() => {
    if (calculateWinner(current.squares)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [current.squares]);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? <Tic /> : <Tac />;
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const winner = calculateWinner(current.squares);
  const status = winner
    ? `Winner: ${winner === Tic ? '✖' : '◯'}`
    : `Next player: ${xIsNext ? '✖' : '◯'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="reset-button" onClick={resetGame}>
          Restart Game
        </div>
      </div>
      <a href='https://www.instagram.com/_rustam335_?igsh=MWl0dnE5dHY0eGE4aQ=='>Created by @_rustam335_</a>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a].type && squares[a].type === squares[b]?.type && squares[a].type === squares[c]?.type) {
      return squares[a].type;
    }
  }

  return null;
};

export default Game;
