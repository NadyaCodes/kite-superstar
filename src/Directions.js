import React from "react";
import { useState } from "react";

export default function Directions() {
  const [dir, setDir] = useState(false);
  return (
    <div>
      {dir === true ? (
        <button onClick={() => setDir(false)}>Read Directions</button>
      ) : (
        <div>
          <div className="directions">
            <div>
              <p>Use k, m and j to navigate the waves </p>
              <p>Press GO to start!</p>
            </div>
            <div>
              <button onClick={() => setDir(true)}>X</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
