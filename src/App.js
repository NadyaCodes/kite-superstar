import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect, useCallback } from "react";
import { makeWaveArray } from "./helpers";

function App() {
  const startingArray = makeWaveArray(5, 5, 0);

  // const [gameState, setGameState] = useState({
  //   kite: 1,
  //   water: [...startingArray],
  //   location: 0,
  //   playing: false,
  //   end: false,
  // });

  const [kite, setKite] = useState(1);
  const [water, setWater] = useState([...startingArray]);
  const [waterDisplay, setWaterDisplay] = useState([...water]);
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

  const resetGame = () => {
    setPlaying(false);
    setWaterDisplay(makeWaveArray(5, 5, 0));
    setEnd(false);
  };

  useEffect(() => {
    if (playing === true) {
      // let currentWater = [...water];

      const interval = setInterval(function () {
        if (playing === false) {
          console.log("false is fired");
          window.clearInterval(interval);
          setPlaying(false);
        }

        waterDisplay.shift();
        setWaterDisplay([...waterDisplay]);

        if (waterDisplay.length <= 1) {
          console.log("clear is fired");
          window.clearInterval(interval);
          setPlaying(false);
        }

        return;
      }, 500);
    }
  }, [playing, water, waterDisplay]);

  return (
    <div className="App">
      {end === true && <h2>GAME OVER</h2>}
      <button onClick={() => runGame()}>
        {playing === false ? "GO" : "Stop"}
      </button>
      <button onClick={() => resetGame()}>Reset</button>
      <Kite height={kite} />
      <Water heights={waterDisplay} />
    </div>
  );
}

export default App;
