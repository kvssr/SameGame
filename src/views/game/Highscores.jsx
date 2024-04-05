import React from "react";

const Highscores = ({ dataAll, dataDay }) => {
  console.log("🚀 ~ Highscores ~ dataAll:", dataAll);
  return (
    <div className="highscore-container">
      <div className="highscore-col">
        <h1>Overall Highscores</h1>
        <ul>
          {dataAll.map((row, i) => {
            console.log("🚀 ~ {dataAll.map ~ row:", row);
            return (
              <li key={`h-a-${i}`}>
                <p>
                  {i + 1}. {row.username}
                </p>
                <p>{row.score}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="highscore-col">
        <h1>Daily Highscores</h1>
        <ul>
          {dataDay.map((row, i) => {
            return (
              <li key={`h-d-${i}`}>
                <p>
                  {i + 1}. {row.username}
                </p>
                <p>{row.score}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Highscores;
