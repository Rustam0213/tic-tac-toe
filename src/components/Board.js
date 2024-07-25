import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
  );

  return (
    <div>
      {[0, 3, 6].map((row) => (
        <div key={row} className="board-row">
          {renderSquare(row)}
          {renderSquare(row + 1)}
          {renderSquare(row + 2)}
        </div>
      ))}
    </div>
  );
};

export default Board;
