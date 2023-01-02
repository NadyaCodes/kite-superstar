import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect, useCallback, useRef } from "react";
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
  const location = useRef(0);

  const [playing, setPlaying] = useState(false);
  const play = useRef(false);
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
    play.current === false ? (play.current = true) : (play.current = false);
  };

  const resetGame = () => {
    play.current = false;
    setWater(makeWaveArray(5, 5, 0));
    setWaterDisplay(water);
    setEnd(false);
    location.current = 0;
  };

  useEffect(() => {
    if (play.current === true) {
      const interval = setInterval(function () {
        if (play.current === false) {
          window.clearInterval(interval);
          setPlaying(false);
          play.current = false;
        }

        waterDisplay.shift();
        location.current = location.current + 1;
        console.log(location.current);
        setWaterDisplay([...waterDisplay]);

        if (waterDisplay.length <= 1) {
          window.clearInterval(interval);
          setPlaying(false);
          play.current = false;
        }

        return;
      }, 500);
    }
  }, [water, waterDisplay, play, playing, location]);

  return (
    <div className="App">
      {end === true && <h2>GAME OVER</h2>}
      <button onClick={() => runGame()}>
        {play.current === false ? "GO" : "Stop"}
      </button>
      <button onClick={() => resetGame()}>Reset</button>
      <Kite height={kite} />
      <Water heights={waterDisplay} />
      {/* {water[loc]} */}
      <p>Water location.current:{water[location.current]}</p>
      {/* {loc} */}
      <p>Water Display[0]: {waterDisplay[0]}</p>
      <p>Location.current: {location.current}</p>
    </div>
  );
}

export default App;
