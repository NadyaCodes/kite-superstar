import React from "react";
import { useState } from "react";

export default function ColorBar(props) {
  const [showBar, setShowBar] = useState(true);
  const colorArray = [
    "blue",
    "red",
    "orange",
    "purple",
    "pink",
    "green",
    "teal",
  ];
  const colorDisplay = colorArray.map((color, index) => (
    <button className={color} key={index} onClick={() => props.setColor(color)}>
      {color}
    </button>
  ));

  return (
    <div className="colorBar">
      {showBar === true ? (
        <button onClick={() => setShowBar(false)}>Open</button>
      ) : (
        <span>
          {colorDisplay}
          <button onClick={() => setShowBar(true)}>Close</button>
        </span>
      )}
    </div>
  );
}
