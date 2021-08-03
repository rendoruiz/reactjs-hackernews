const getMinifiedMomentTime = (momentString) => {
  const minified = momentString
    .replace('a few seconds ago', '0m')
    .replace('a ', '1')
    .replace('an ', '1')
    .replace('s ', '')
    .replace('ago', '')
    .replace('year', 'y')
    .replace('month', 'm')
    .replace('week', 'w')
    .replace('day', 'd')
    .replace('hour', 'h')
    .replace('minute', 'm')
    .replace('second', 's')
    .replaceAll(' ', '');
  return minified;
}

export { getMinifiedMomentTime };