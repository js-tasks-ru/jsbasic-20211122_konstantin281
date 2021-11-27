function factorial(n) {
  let i = 1;
  while (n) {
    i = i * n--;
  }
  return i;
}
