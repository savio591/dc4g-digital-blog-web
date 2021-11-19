export const generateArrayWithNumbers = (quantity: number) => {
  const arraysWithNumbers: number[] = [];

  for (let i = 1; i <= quantity; i++) {
    arraysWithNumbers.push(i);
  }
  return arraysWithNumbers;
};
