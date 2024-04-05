import React, { useEffect, useState } from "react";
import Cell from "../../components/Cell";
import "../../assets/game.css";
import {
  checkAnyMoveAvailable,
  generateBoard,
  getShape,
  removeShape,
  resetVisited,
} from "../../components/GameManager";
import UsernameInput from "../../components/UsernameInput";
import Highscores from "./Highscores";

const fetchHighscores = async (days = 0, limit = 5, setData) => {
  const res = await fetch(
    "http://localhost:3000/server/samegame/highscores?" +
      new URLSearchParams({
        days: days,
        limit: limit,
      }),
    {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error: Status ${res.status}`);
  }
  const data = await res.json();
  console.log("🚀 ~ fetchHighscores ~ data:", data);
  setData(data);
};

const GameView = () => {
  const [board, setBoard] = useState(generateBoard());
  const [hoverShape, setHoverShape] = useState([]);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState();
  const [canMove, setCanMove] = useState(true);
  const [highscoresAll, setHighscoresAll] = useState([]);
  const [highscoresDay, setHighscoresDay] = useState([]);

  useEffect(() => {
    console.log("use");
    fetchHighscores(0, 5, setHighscoresAll);
    fetchHighscores(1, 5, setHighscoresDay);
  }, [username]);

  const handleOnClick = (e) => {
    let id = e.target.id.split("-");
    let y = Number(id[0]);
    let x = Number(id[1]);
    console.log(`onClick`, board[y][x]);
    if (board[y][x].isEmpty) return;
    let shape = getShape(board, x, y, []);
    if (shape.length > 2) {
      let newBoard = removeShape(board, shape);
      console.log("🚀 ~ handleOnClick ~ newBoard:", newBoard);
      setScore(score + Math.pow(shape.length - 2, 2));
      setCanMove(checkAnyMoveAvailable(board));
      newBoard = resetVisited(newBoard);
      setBoard([...newBoard]);
    }
  };

  const handleSubmitScore = (username) => {
    fetch("http://localhost:3000/server/samegame/highscore", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        value: score,
      }),
    });
    console.log("setUsername", username);
    if (username === undefined) return;
    setUsername(username);
    generateNewGame();
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

  const generateNewGame = () => {
    setBoard(generateBoard());
    setScore(0);
    setCanMove(true);
  };

  const handleNewGameClick = (e) => {
    generateNewGame();
  };

  const handleOnMouseLeave = (e) => {
    toggleHightlight(hoverShape);
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
        {!canMove && <UsernameInput submitScore={handleSubmitScore} />}
      </div>
      <Highscores
        dataAll={highscoresAll}
        dataDay={highscoresDay}
      />
    </div>
  );
};

export default GameView;
