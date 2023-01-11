import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect, useCallback, useRef } from "react";
import { makeWaveArray } from "./helpers";

function App() {
  const waveNum = 50;
  const startingArray = makeWaveArray(waveNum, 5, 0);

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
  const [jump, setJump] = useState(false);
  const [playing, setPlaying] = useState(false);
  const play = useRef(false);
  const [advanceWave, setAdvancewave] = useState(true);
  const [end, setEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const runGame = () => {
    playing === false ? setPlaying(true) : setPlaying(false);
    play.current === false ? (play.current = true) : (play.current = false);
  };

  const moveKite = (e) => {
    let newPoints = score;
    if (end === true) {
      return;
    }

    if (playing === false) {
      return;
    }

    if (play.current === false) {
      return;
    }
    let num = kite;

    if (e.key === "ArrowUp") {
      num++;
      newPoints++;
    }

    if (e.key === "ArrowDown") {
      num--;
      newPoints++;
    }

    if (e.key === " ") {
      if (jump === false) {
        setJump(true);
        runGame();
        num += 10;
        newPoints += 10;
        setTimeout(() => {
          num -= 5;
          setKite(num);
          setJump(false);
        }, 1000);
      }
    }
    setKite(num);
    setScore(newPoints);
  };

  useEffect(() => {
    window.addEventListener("keydown", moveKite);

    return () => {
      window.removeEventListener("keydown", moveKite);
    };
  });

  const resetGame = () => {
    play.current = false;
    setWater(startingArray);
    setWaterDisplay(makeWaveArray(waveNum, 5, 0));
    setEnd(false);
    setKite(1);
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
  };

  useEffect(() => {
    if (end === true) {
      return;
    }
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
  }, [waterDisplay, play, advanceWave, water, playing, score]);

  useEffect(() => {
    if (kite <= waterDisplay[0] - 1) {
      setEnd(true);
      setPlaying(false);
      play.current = false;
      if (score > highScore) {
        setHighScore(score);
      }
    }
    if (kite > waterDisplay[0] + 2 && jump !== true) {
      setKite(waterDisplay[0] + 2);
    }
  }, [kite, waterDisplay, jump, highScore, score]);

  return (
    <div className="App">
      {end === true && <h2>GAME OVER</h2>}
      {score >= highScore && score > 0 && playing === true && (
        <h2 className="superstar">New High Score: {score}</h2>
      )}
      <button onClick={() => runGame()}>
        {play.current === false ? "GO" : "Stop"}
      </button>
      <button onClick={() => resetGame()}>Reset</button>
      <div className="score">Score: {score}</div>
      <div className="score">High Score: {highScore}</div>
      <div className="play-container">
        <Kite height={kite} />
        <Water heights={waterDisplay} />
      </div>
    </div>
  );
}

export default App;
