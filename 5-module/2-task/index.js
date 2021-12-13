function toggleText() {
  document.addEventListener('click', function () {
    elem = document.getElementById('text');
    elem.hidden = !elem.hidden;
  });
}
