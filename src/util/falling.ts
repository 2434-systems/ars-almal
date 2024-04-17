export type FallingImage = {
  id: number;
  randomX: number;
  randomSway: string;
  randomSize: number;
};

export const generateFallingArs = () => {
  const id = new Date().getTime();
  const randomX = Math.random() * 100; // Random horizontal start percentage
  const randomSway = Math.random() > 0.5 ? "right" : "left"; // Randomly choose sway direction
  const randomSize = Math.random() * 10 + 5; // Random size (10vw to 30vw)
  const newImage = { id, randomX, randomSway, randomSize };
  return newImage;
};
