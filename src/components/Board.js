import React, { useState } from "react";
import Cell from "./Cell";

const Board = ({ rows, cols, mines }) => {
  const generateBoard = (rows, cols, mines) => {
    // Initialize board with empty cells
    let board = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols).fill({ value: 0, revealed: false, flagged: false })
      );

    // Place mines randomly
    let placedMines = 0;
    while (placedMines < mines) {
      let row = Math.floor(Math.random() * rows);
      let col = Math.floor(Math.random() * cols);

      if (board[row][col].value === 0) {
        board[row][col].value = "M";
        placedMines++;

        // Update the numbers around the mine
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (
              i >= 0 &&
              i < rows &&
              j >= 0 &&
              j < cols &&
              board[i][j].value !== "M"
            ) {
              board[i][j].value += 1;
            }
          }
        }
      }
    }

    return board;
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <Cell
            key={colIndex}
            value={cell.value}
            onClick={() => handleLeftClick(rowIndex, colIndex)}
            onRightClick={() => handleRightClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ));
  };

  const revealCell = (board, x, y, rows, cols) => {
    if (board[x][y].revealed || board[x][y].flagged) return;

    board[x][y].revealed = true;

    if (board[x][y].value === 0) {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (i >= 0 && i < rows && j >= 0 && j < cols) {
            revealCell(board, i, j, rows, cols);
          }
        }
      }
    }

    return board;
  };
  const handleLeftClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex].revealed || board[rowIndex][colIndex].flagged)
      return;

    if (board[rowIndex][colIndex].value === "M") {
      // Game over logic
      setGameOver(true);
      revealMines();
      return;
    }

    const newBoard = revealCell([...board], rowIndex, colIndex, rows, cols);
    setBoard(newBoard);

    // Check if the player has won
    if (checkWin(newBoard)) {
      setGameWon(true);
    }
  };

  const handleRightClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex].revealed) return;

    const newBoard = [...board];
    newBoard[rowIndex][colIndex].flagged =
      !newBoard[rowIndex][colIndex].flagged;
    setBoard(newBoard);
  };

  const checkWin = (board) => {
    for (let row of board) {
      for (let cell of row) {
        if (cell.value !== "M" && !cell.revealed) {
          return false;
        }
      }
    }
    return true;
  };
  const revealMines = () => {
    const newBoard = [...board];
    for (let row of newBoard) {
      for (let cell of row) {
        if (cell.value === "M") {
          cell.revealed = true;
        }
      }
    }
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(generateBoard(rows, cols, mines));
    setGameOver(false);
    setGameWon(false);
  };

  const [board, setBoard] = useState(generateBoard(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  return (
    <div>
      {gameWon && <div className="message">You Win!</div>}
      {gameOver && <div className="message">Game Over!</div>}
      {!gameOver && !gameWon && renderBoard()}
      <button onClick={resetGame}>New Game</button>
    </div>
  );
};

export default Board;
