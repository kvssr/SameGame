import React, { useEffect, useState } from "react";
import Cell from "../../components/Cell";
import "../../assets/game.css";
import {
  generateBoard,
  getShape,
  removeShape,
} from "../../components/GameManager";
import UsernameInput from "../../components/UsernameInput";

const GameView = () => {
  const [board, setBoard] = useState(generateBoard());
  const [hoverShape, setHoverShape] = useState([]);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState();

  const handleOnClick = (e) => {
    let id = e.target.id.split("-");
    let y = Number(id[0]);
    let x = Number(id[1]);
    console.log(`onClick`, board[y][x]);
    if (board[y][x].isEmpty) return;
    let shape = getShape(board, x, y, []);
    if (shape.length > 2) {
      setBoard([...removeShape(board, shape)]);
      setScore(score + Math.pow(shape.length - 2, 2));
    }
  };

  const handleOnMouseOver = (e) => {
    let id = e.target.id.split("-");
    let y = Number(id[0]);
    let x = Number(id[1]);
    let cellList = getShape(board, x, y, []);
    setHoverShape(cellList);
    toggleHightlight(cellList);
  };

  const toggleHightlight = (shape) => {
    shape.forEach((cell) => {
      cell.highlight = !cell.highlight;
      cell.visited = false;
    });
  };

  const handleNewGameClick = (e) => {
    setBoard(generateBoard());
    setScore(0);
  };

  const handleOnMouseLeave = (e) => {
    toggleHightlight(hoverShape);
  };

  const handleSetUsername = (username) => {
    console.log("setUsername", username);
    if (username === undefined) return;
    setUsername(username);
  };

  return (
    <div className="container">
      <div className="score-board">
        <button
          className="newGameBtn"
          onClick={handleNewGameClick}
        >
          <p>+</p>
        </button>
        <div className="usernameDiv">
          <p>{username}</p>
        </div>
        <div className="scoreDiv">
          <p>{score}</p>
        </div>
      </div>
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
        {!username && <UsernameInput setUsername={handleSetUsername} />}
      </div>
    </div>
  );
};

export default GameView;
