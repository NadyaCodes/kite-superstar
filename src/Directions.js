import React from "react";
import { useState } from "react";

export default function Directions() {
  const [dir, setDir] = useState(true);
  return (
    <div>
      {dir === true ? (
        <button onClick={() => setDir(false)}>Directions</button>
      ) : (
        <div className="directions-container">
          <button onClick={() => setDir(true)} className="selected">
            Directions
          </button>
          <div className="directions">
            <h3>Use k, m and j to navigate the waves </h3>
            <h3>Press GO to start!</h3>
          </div>
        </div>
      )}
    </div>
  );
}
