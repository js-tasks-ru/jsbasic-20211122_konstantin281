function toggleText() {
  document.addEventListener('click', () => {
    elem = document.getElementById('text');
    elem.hidden = !elem.hidden;
  });
}
