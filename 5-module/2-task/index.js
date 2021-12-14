function toggleText() {
  document.addEventListener('click', () => {
    let elem = document.getElementById('text');
    elem.hidden = !elem.hidden;
  });
}
