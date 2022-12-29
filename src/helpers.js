export const makeNumArray = (arrayLength, maxNum) => {
  const array = [];

  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * (maxNum + 1)));
  }

  return array;
};
