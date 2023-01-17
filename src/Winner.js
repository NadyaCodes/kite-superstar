import React from "react";

export default function Winner(props) {
  return (
    <div className="winner">
      <div>Winner! {props.points} points</div>
      <div>{props.highScore === true && " 🏄 High Score! 🏄"}</div>
    </div>
  );
}
