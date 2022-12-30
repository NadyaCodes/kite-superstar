const fiftyFifty = () => {
  const num = Math.floor(Math.random() * 2);
  if (num === 1) {
    return true;
  }
  return false;
};

export const makeWaveArray = (arrayLength, maxNum, startNum) => {
  const array = [startNum];

  for (let i = 0; i < arrayLength; i++) {
    let numDifference = Math.floor(Math.random() * 2) + 1;
    let compareNum = array[i];
    let pos = fiftyFifty();
    if (pos === true) {
      let numToAdd = compareNum + numDifference;
      while (numToAdd > maxNum) {
        numToAdd--;
      }
      if (numToAdd === compareNum) {
        numToAdd--;
      }
      array.push(numToAdd);
    }
    if (pos === false) {
      let numToAdd = compareNum - numDifference;
      while (numToAdd < 0) {
        numToAdd++;
      }
      if (numToAdd === compareNum) {
        numToAdd++;
      }
      array.push(numToAdd);
    }
  }

  return array;
};
