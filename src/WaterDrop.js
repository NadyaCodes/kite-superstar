import React from "react";

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
      className="dot"
    ></div>
  );
}
