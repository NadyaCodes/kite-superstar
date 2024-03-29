import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import ColorBar from "./ColorBar";
import { useState, useEffect, useRef } from "react";
import { makeWaveArray } from "./helpers";
import Directions from "./Directions";
import GameOver from "./GameOver";
import Winner from "./Winner";

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
  const [lose, setLose] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [color, setColor] = useState("blue");

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

    if (e.key === "k") {
      num++;
      newPoints++;
    }

    if (e.key === "m") {
      num--;
      newPoints++;
    }

    if (e.key === "j") {
      if (jump === false) {
        setJump(true);
        num += 10;
        newPoints += 10;
        setTimeout(() => {
          num -= 4;
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
    setLose(false);
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
          setEnd(true);
        }
        setTimeout(() => {
          setAdvancewave(true);
        }, 300);
      }
    }
  }, [waterDisplay, play, advanceWave, water, playing, score, end]);

  useEffect(() => {
    if (kite <= waterDisplay[0] - 1) {
      setLose(true);
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
      <div className="menu">
        {" "}
        <ColorBar setColor={setColor} />
        <Directions />
      </div>

      {end === true &&
        (lose === false ? (
          <Winner points={score} highScore={score >= highScore} />
        ) : (
          <GameOver resetGame={resetGame} />
        ))}

      <div className="playing-area">
        {end === false ? (
          play.current === false ? (
            <button onClick={() => runGame()} className="big-button">
              GO
            </button>
          ) : (
            <button onClick={() => resetGame()} className="big-button">
              Reset
            </button>
          )
        ) : (
          <button onClick={() => resetGame()} className="big-button">
            Reset
          </button>
        )}

        {/* {score >= highScore && score > 0 && playing === true && (
        <h2>
          New High Score: <section className="superstar">{score}</section>
        </h2>
      )} */}
        <div
          className={
            score >= highScore && score > 0 && playing === true
              ? "score superstar"
              : "score"
          }
        >
          Score: {score}
        </div>
        <div className="score">High Score: {highScore}</div>
        <div className="play-container">
          <Kite height={kite} jump={jump} lose={lose} color={color} />
          <Water heights={waterDisplay} />
          <div className="vector-link">
            <a href="https://www.vecteezy.com/free-vector/water">
              Kitesurfing Vectors by Vecteezy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
