import React from "react";
import WaterDrop from "./WaterDrop";

export default function Water(props) {
  const waterDisplay = props.heights.map((height, index) => {
    return <WaterDrop height={height} index={index} />;
  });
  return <div className="water">{waterDisplay}</div>;
}
