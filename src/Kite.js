import React, { useEffect, useState } from "react";
import dude from "./dude.png";

export default function Kite(props) {
  const [animate, setAnimate] = useState("");

  useEffect(() => {
    if (props.jump === true) {
      if (animate === "") {
        setAnimate("flip 1s infinite ease");
      }
    } else {
      setAnimate("");
    }
  }, [props.jump, animate]);

  return (
    <div id="kite" style={{ transform: `translateY(-${props.height - 1}rem)` }}>
      <img
        src={dude}
        alt="kite dude"
        className="dude"
        style={{ animation: animate }}
      />
    </div>
  );
}
