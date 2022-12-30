import logo from "./logo.svg";
import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect } from "react";
import { makeWaveArray } from "./helpers";

function App() {
  const startingArray = makeWaveArray(20, 5, 0);

  useEffect(() => {
    console.log(startingArray);
  }, []);

  const [heights, setHeights] = useState({
    kite: 1,
    water: [...startingArray],
    location: 0,
  });

  const handleUserKeyPress = (e) => {
    let num = heights.kite;

    if (e.key === "ArrowUp") {
      num++;
    }

    if (e.key === "ArrowDown") {
      num--;
    }
    setHeights({ ...heights, kite: num });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  useEffect(() => {
    for (let i = 1; i < heights.water.length; i++) {
      setTimeout(() => {
        const newLoc = (heights.location += 1);
        setHeights((prev) => ({ ...prev, location: newLoc }));
      }, 1000 * i);
    }
  }, [heights]);

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
      <Kite height={heights.kite} />
      <Water heights={heights.water} />
    </div>
  );
}

export default App;
