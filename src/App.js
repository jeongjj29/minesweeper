import "./App.css";
import { useState } from "react";
import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState({});
  const boardSizes = {
    beginner: {
      difficulty: "beginner",
      x: 9,
      y: 9,
      mines: 10,
    },
    intermediate: {
      difficulty: "intermediate",
      x: 16,
      y: 16,
      mines: 40,
    },
    expert: {
      difficulty: "expert",
      x: 30,
      y: 16,
      mines: 99,
    },
  };

  const handleClick = (boardSize) => {
    setBoard(boardSize);
  };

  return (
    <div className="App">
      <h1>Mine Sweeper</h1>
      <ul>
        <li onClick={() => handleClick(boardSizes.beginner)}>
          Beginner (9 x 9)
        </li>
        <li onClick={() => handleClick(boardSizes.intermediate)}>
          Intermediate (16 x 16)
        </li>
        <li onClick={() => handleClick(boardSizes.expert)}>Expert (30 x 16)</li>
      </ul>
      <div>
        <Board rows={board.x} cols={board.y} mines={board.mines} />
      </div>
    </div>
  );
}

export default App;
