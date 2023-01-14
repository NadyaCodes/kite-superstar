import React, { useEffect, useState } from "react";
import dude from "./dude.png";
import splash from "./splash.png";

export default function Kite(props) {
  const [animate, setAnimate] = useState("");
  let dudeColor = "blue";

  useEffect(() => {
    if (props.jump === true) {
      if (animate === "") {
        setAnimate("flip 1s infinite ease");
      }
    } else {
      setAnimate("");
    }
  }, [props.jump, animate]);

  switch (props.color) {
    case "blue":
      dudeColor = "hue-rotate(0deg)";
      break;
    case "red":
      dudeColor = "hue-rotate(120deg)";
      break;
    case "orange":
      dudeColor = "hue-rotate(160deg)";
      break;
    case "purple":
      dudeColor = "hue-rotate(30deg)";
      break;
    case "pink":
      dudeColor = "hue-rotate(70deg)";
      break;
    case "green":
      dudeColor = "hue-rotate(-90deg)";
      break;
    case "teal":
      dudeColor = "hue-rotate(-60deg)";
      break;

    default:
      dudeColor = "hue-rotate(0deg)";
      break;
  }

  return (
    <div id="kite" style={{ transform: `translateY(-${props.height}rem)` }}>
      {props.lose === true ? (
        <img
          src={splash}
          alt="kiteboarder in water"
          className="splash"
          style={{ animation: animate }}
        />
      ) : (
        <img
          src={dude}
          alt="kite dude"
          className="dude"
          style={{ animation: animate, filter: dudeColor }}
        />
      )}
    </div>
  );
}
