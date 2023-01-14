import React from "react";
import wave from "./wave.png";

export default function WaterDrop(props) {
  // if (props.height) {
  //   return (
  //     <div className="high-water" id="high">
  //       WaterDrop
  //     </div>
  //   );
  // }
  return (
    <div
      style={{ transform: `translateY(-${props.height}rem)` }}
      className="wave-container"
    >
      <img src={wave} alt="wave" className="wave" />
    </div>
  );
}
