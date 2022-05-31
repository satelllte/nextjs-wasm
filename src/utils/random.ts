export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomUInt8 = (): number => {
  return randomInt(0, 255)
}
