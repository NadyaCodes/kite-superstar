import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect, useCallback } from "react";
import { makeWaveArray } from "./helpers";

function App() {
  const startingArray = makeWaveArray(20, 5, 0);

  // const [gameState, setGameState] = useState({
  //   kite: 1,
  //   water: [...startingArray],
  //   location: 0,
  //   playing: false,
  //   end: false,
  // });

  const [kite, setKite] = useState(1);
  const [water, setWater] = useState([...startingArray]);
  const [location, setLocation] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [end, setEnd] = useState(false);

  const moveKite = (e) => {
    let num = kite;

    if (e.key === "ArrowUp") {
      num++;
    }

    if (e.key === "ArrowDown") {
      num--;
    }

    if (e.key === " ") {
      num += 10;
      setTimeout(() => {
        num -= 10;
        setKite(num);
      }, 700);
    }
    setKite(num);
  };

  useEffect(() => {
    window.addEventListener("keydown", moveKite);

    return () => {
      window.removeEventListener("keydown", moveKite);
    };
  });

  const runGame = () => {
    playing === false ? setPlaying(true) : setPlaying(false);
  };

  useEffect(() => {
    if (playing === true) {
      let currentWater = [...water];

      const interval = setInterval(function () {
        currentWater.shift();
        setWater([...currentWater]);

        if (water.length <= 1) {
          console.log("clear is fired");
          window.clearInterval(interval);
          setPlaying(false);
        }
        return;
      }, 500);
    }
  }, [playing, water]);

  return (
    <div className="App">
      {end === true && <h2>GAME OVER</h2>}
      <button onClick={() => runGame()}>
        {playing === false ? "GO" : "Stop"}
      </button>
      <Kite height={kite} />
      <Water heights={water} />
    </div>
  );
}

export default App;
