import logo from "./logo.svg";
import "./App.css";
import Kite from "./Kite";
import Water from "./Water";
import { useState, useEffect } from "react";
import { makeNumArray } from "./helpers";

function App() {
  const startingArray = makeNumArray(10, 5);

  const [heights, setHeights] = useState({
    kite: 1,
    water: [0, ...startingArray],
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
  }, []);

  useEffect(() => {
    if (heights.water[heights.location] > heights.kite) {
      alert("You lose");
    }
  }, [heights]);

  return (
    <div className="App">
      <Kite height={heights.kite} />
      <Water heights={heights.water} />
    </div>
  );
}

export default App;
