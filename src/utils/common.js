export const randomNumber = (min, max) => {
  return min + Math.trunc(Math.random() * (max - min));
}

export const sleep = m => new Promise(r => setTimeout(r, m))