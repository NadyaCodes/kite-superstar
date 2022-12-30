import logo from "./logo.svg";
import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect } from "react";
import { makeWaveArray } from "./helpers";

function App() {
  const startingArray = makeWaveArray(40, 5, 0);

  const [gameState, setGameState] = useState({
    kite: 1,
    water: [...startingArray],
    location: 0,
    playing: false,
  });

  const handleUserKeyPress = (e) => {
    let num = gameState.kite;

    if (e.key === "ArrowUp") {
      num++;
    }

    if (e.key === "ArrowDown") {
      num--;
    }
    setGameState({ ...gameState, kite: num });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  useEffect(() => {
    for (let i = 1; i < gameState.water.length; i++) {
      setTimeout(() => {
        const newLoc = (gameState.location += 1);
        setGameState((prev) => ({ ...prev, location: newLoc }));
      }, 1000 * i);
    }
  }, [gameState]);

  const runGame = () => {
    gameState.playing === false
      ? setGameState({ ...gameState, playing: true })
      : setGameState({ ...gameState, playing: false });
  };

  useEffect(() => {
    console.log(gameState.playing);
  }, [gameState.playing]);

  // useEffect(() => {
  //   if (gameState.playing === true) {
  //     // console.log("gameState.water", gameState.water);
  //     // console.log(gameState);
  //     let newWave = gameState.water.shift();
  //     console.log(gameState);
  //     setGameState((prev) => ({ ...prev, water: newWave }));
  //     console.log(gameState);
  //     // console.log("gameState.water", gameState.water);
  //     // while (gameState.wave.length >= 1) {
  //     //   setTimeout(() => {
  //     //     let newWave = gameState.wave.slice(0, 1);
  //     //     setGameState({ ...gameState, wave: newWave });
  //     //   }, 1000);
  //     // }
  //   }
  //   // console.log(gameState);
  //   // return gameState;
  // }, [gameState]);

  // useEffect(() => {
  //   while (gameState.water.length !== 0) {
  //     setTimeout(() => {
  //       let newWaveArray = [...gameState.water];
  //       newWaveArray.splice(0, 1);
  //       setGameState({ ...gameState, wave: newWaveArray });
  //     }, 1000);
  //   }
  // }, [gameState]);

  // useEffect(() => {
  //   // if (heights.water[heights.location] > heights.kite) {
  //   //   alert("You lose");
  //   // }
  //   //if you're too high, you should also lose
  //   // if (heights.water[heights.location] + 3 === heights.kite) {
  //   //   let num = heights.kite - 1;
  //   //   setHeights({ ...heights, kite: num });
  //   // }
  // }, [heights]);

  return (
    <div className="App">
      <button onClick={() => runGame()}>
        {gameState.playing === false ? "GO" : "Stop"}
      </button>
      <Kite height={gameState.kite} />
      <Water heights={gameState.water} />
    </div>
  );
}

export default App;
