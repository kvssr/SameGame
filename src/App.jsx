import GameView from "./views/game";
import "./assets/shared.css";

function App() {
  return (
    <div className="App">
      <header>
        <h2> SameGame </h2>
      </header>
      <div>
        <GameView />
      </div>
    </div>
  );
}

export default App;
