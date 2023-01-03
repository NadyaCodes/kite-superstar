import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect, useCallback, useRef } from "react";
import { makeWaveArray } from "./helpers";

function App() {
  const startingArray = makeWaveArray(10, 5, 0);

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

  const [playing, setPlaying] = useState(false);
  const play = useRef(false);
  const [advanceWave, setAdvancewave] = useState(true);
  const [end, setEnd] = useState(false);

  const moveKite = (e) => {
    let num = kite;

    if (e.key === "ArrowUp") {
      num++;
    }

    if (e.key === "ArrowDown") {
      num--;
    }

    if (num > waterDisplay[0] + 2) {
      num = waterDisplay[0] + 2;
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
    setWater(makeWaveArray(10, 5, 0));
    setWaterDisplay(water);
    setEnd(false);
    setKite(1);
  };

  useEffect(() => {
    if (play.current === true) {
      if (advanceWave === true) {
        setAdvancewave(false);
        waterDisplay.shift();
        setWaterDisplay([...waterDisplay]);

        if (waterDisplay.length <= 1) {
          setPlaying(false);
          play.current = false;
        }
        setTimeout(() => {
          setAdvancewave(true);
        }, 500);
      }
    }
  }, [waterDisplay, play, advanceWave, water, playing]);

  useEffect(() => {
    if (kite === waterDisplay[0] - 1) {
      setEnd(true);
      setPlaying(false);
      play.current = false;
    }
  }, [kite, waterDisplay]);

  return (
    <div className="App">
      {end === true && <h2>GAME OVER</h2>}
      <button onClick={() => runGame()}>
        {play.current === false ? "GO" : "Stop"}
      </button>
      <button onClick={() => resetGame()}>Reset</button>
      <Kite height={kite} />
      <Water heights={waterDisplay} />
      <p>Kite: {kite}</p>
      <p>Water Display[0]: {waterDisplay[0]}</p>
    </div>
  );
}

export default App;
