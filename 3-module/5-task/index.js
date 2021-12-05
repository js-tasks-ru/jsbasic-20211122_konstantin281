function getMinMax(str) {
  arr = str.split(' ').filter(i => isFinite(i)).map(i => Number(i));
  return {min: Math.min(...arr), max: Math.max(...arr)};
}
