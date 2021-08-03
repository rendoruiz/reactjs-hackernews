// https://stackoverflow.com/a/49562686
const getHashCode = (str) => {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}
const generateHslColor = (str) => {
  if (str) {
    return `hsl(${getHashCode(str) % 360}, 100%, 80%)`;
  }
  return false;
}

export { generateHslColor };