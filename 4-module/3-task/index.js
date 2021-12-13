function highlight(table) {
  for (row of table.rows) {
    state = row.lastElementChild.dataset.available;
    gender = row.cells[2].textContent;
    textContentLow = row.cells[1].textContent < 18;
    state === undefined && row.setAttribute('hidden', true);
    state === 'true' ? row.classList.add('available') : row.classList.add('unavailable');
    gender === 'm' ? row.classList.add('male') : row.classList.add('female');
    textContentLow && (row.style.textDecoration = 'line-through');
  }
}
