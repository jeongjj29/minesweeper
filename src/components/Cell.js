import React from "react";
import "./Cell.css";

const Cell = ({ value, onClick, onRightClick }) => {
  return (
    <div
      className="cell"
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {value}
    </div>
  );
};

export default Cell;
