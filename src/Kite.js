import React from "react";

export default function Kite(props) {
  return (
    <div id="kite" style={{ transform: `translateY(-${props.height}rem)` }}>
      Kite
    </div>
  );
}
