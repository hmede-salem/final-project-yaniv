const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};

export default generateRandomColors;
