import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect, useCallback } from "react";
import { makeWaveArray } from "./helpers";

function App() {
  const startingArray = makeWaveArray(5, 5, 0);

  const [gameState, setGameState] = useState({
    kite: 1,
    water: [...startingArray],
    location: 0,
    playing: false,
    end: false,
  });

  //SPLIT GAMESTATE INTO MULTIPLE FUNCTIONS?

  const handleUserKeyPress = (e) => {
    let num = gameState.kite;

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
        setGameState({ ...gameState, kite: num });
      }, 700);
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

  //maybe separate out the states so I don't need to put gamestate in the dependancy array?

  const progressGame = useCallback(() => {
    setGameState({ ...gameState, playing: false });
    console.log("still playing");
    let newWater = [...gameState.water];
    let newLocation = gameState.location;
    newWater.shift();
    newLocation++;
    if (gameState.kite <= gameState.water[0]) {
      setGameState({ ...gameState, end: true });
    }
    if (gameState.location >= startingArray.length - 1) {
      setGameState({ ...gameState, end: true });
    }
    setGameState((prev) => ({
      ...prev,
      location: newLocation,
      water: [...newWater],
    }));
    setTimeout(() => {
      setGameState({ ...gameState, playing: true });
    }, 1000);
  }, [gameState.playing, gameState.location, startingArray.length]);

  // useEffect(() => {
  //   console.log("inside useEffect");

  //   // if (gameState.playing === true) {

  //   // let count = gameState.water.length;
  //   // // setInterval(() => {
  //   // //   count--;
  //   // //   if (count <= 0) {
  //   // //     // clearInterval(interval);
  //   // //     setGameState({ ...gameState, end: true });
  //   // //   }
  //   // //   progressGame(gameState, setGameState);
  //   // // }, 1000);
  //   // // console.log("playing");
  //   // // let count = gameState.water.length;
  //   // const interval = setInterval(() => {
  //   //   count--;
  //   //   if (count <= 0) {
  //   //     clearInterval(interval);
  //   //   }
  //   //   // setInterval(progressGame, 1000);
  //   //   progressGame(gameState, setGameState);
  //   // }, 1000);
  //   // // console.log("gameState", gameState);
  //   // // return () => clearInterval(interval);
  //   // // while (gameState.water.length > 1) {
  //   // //   setInterval(progressGame, 1000);
  //   // //   setGameState((prev) => ({...prev, count: count++}))
  //   // // }
  //   // //       var myTimer = setInterval(...);
  //   // // clearInterval(myTimer);
  //   // // while (gameState.water.length > 1) {
  //   // //   setTimeout(() => {
  //   // //     gameState.water.shift();
  //   // //   }, 1000);
  //   // // }
  //   progressGame();

  //   // console.log(gameState);

  //   // } else {
  //   //   console.log("not playing");
  //   // }
  // }, [progressGame]);

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
      {gameState.end === true && <h2>GAME OVER</h2>}
      <button onClick={() => runGame()}>
        {gameState.playing === false ? "GO" : "Stop"}
      </button>
      <Kite height={gameState.kite} />
      <Water heights={gameState.water} />
    </div>
  );
}

export default App;
