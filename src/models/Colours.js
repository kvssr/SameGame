const COLOURS = ["yellow", "red", "green", "blue"];

export const getRandomColour = (isEmpty) => {
  if (isEmpty) return "";
  return COLOURS[Math.floor(Math.random() * COLOURS.length)];
};
