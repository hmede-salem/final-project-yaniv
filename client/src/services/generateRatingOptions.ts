const generateRatingNumbers = (): number[] => {
  const numbers: number[] = [];

  for (let i = 0; i <= 5; i += 0.1) {
    numbers.push(Number(i.toFixed(1)));
  }

  return numbers;
};

export default generateRatingNumbers;
