import React from "react";
import WaterDrop from "./WaterDrop";

// const waterDisplay = waterArray.map((drop, index) => {
//   return drop;
// });

export default function Water(props) {
  // const waterDisplay = waterArray.map((drop, index) => {
  //   return drop
  // })

  const waterArray = [
    <WaterDrop height={props.heights[0]} />,
    <WaterDrop height={props.heights[1]} />,
    <WaterDrop height={props.heights[2]} />,
    <WaterDrop height={props.heights[3]} />,
    <WaterDrop height={props.heights[4]} />,
  ];
  return <div className="water">{waterArray}</div>;
}
