const getMinifiedMomentTime = (momentString) => {
  const minified = momentString
    .replace('a year ago', '1y')
    .replace('year ago', 'y')
    .replace('years ago', 'y')
    .replace('a month ago', '1m')
    .replace('month ago', 'm')
    .replace('months ago', 'm')
    .replace('a week ago', '1w')
    .replace('week ago', 'w')
    .replace('weeks ago', 'w')
    .replace('a day ago', '1d')
    .replace('day ago', 'd')
    .replace('days ago', 'd')
    .replace('an hour ago', '1h')
    .replace('hour ago', 'h')
    .replace('hours ago', 'h')
    .replace('aminute ago', '1m')
    .replace('minute ago', 'm')
    .replace('minutes ago', 'm')
    .replace('a second ago', '1s')
    .replace('second ago', 's')
    .replace('a few seconds ago', '0m')
    .replace(' ', '');
  return minified;
}

export { getMinifiedMomentTime };