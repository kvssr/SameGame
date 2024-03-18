import React, { useEffect, useState } from "react";
import Cell from "../../components/Cell";
import "../../assets/game.css";
import {
  generateBoard,
  getHoverShape,
  removeShape,
} from "../../components/GameManager";

const GameView = () => {
  const [board, setBoard] = useState(generateBoard());
  const [hoverShape, setHoverShape] = useState([]);

  const handleOnClick = (e) => {
    let id = e.target.id.split("-");
    let x = Number(id[0]);
    let y = Number(id[1]);
    if (hoverShape.length > 2) removeShape(board, hoverShape);
  };

  const handleOnMouseOver = (e) => {
    let id = e.target.id.split("-");
    let y = Number(id[0]);
    let x = Number(id[1]);
    let cellList = getHoverShape(board, x, y, []);
    setHoverShape(cellList);
    toggleHightlight(cellList);
  };

  //   useEffect(() => {
  //     hoverShape.forEach((cell) => {
  //       cell.highlight = true;
  //     });
  //     setBoard([...board]);
  //     return () => {
  //       hoverShape.forEach((cell) => {
  //         cell.highlight = false;
  //         cell.visited = false;
  //       });
  //     };
  //   }, [hoverShape]);

  const toggleHightlight = (shape) => {
    shape.forEach((cell) => {
      cell.highlight = !cell.highlight;
      cell.visited = false;
    });
  };

  const handleOnMouseLeave = (e) => {
    toggleHightlight(hoverShape);
  };

  return (
    <div className="container">
      <div className="board">
        {board.map((row, i) => {
          return (
            <div
              className="board-row"
              key={`b-row-${i}`}
            >
              {row.map((cell, j) => {
                return (
                  <Cell
                    cell={cell}
                    handleOnClick={handleOnClick}
                    handleOnMouseOver={handleOnMouseOver}
                    handleOnMouseLeave={handleOnMouseLeave}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameView;
