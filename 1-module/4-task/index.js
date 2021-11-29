function checkSpam(str) {
  let lower = str.toLowerCase();
  if (lower.includes('1xBet'.toLowerCase()) || lower.includes('XXX'.toLowerCase())) {
    return true;
  }
  return false;
}
