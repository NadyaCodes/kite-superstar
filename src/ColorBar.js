import React from "react";

export default function colorBar(props) {
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
  return <div className="colorBar">{colorDisplay}</div>;
}
