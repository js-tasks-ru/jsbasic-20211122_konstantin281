function makeDiagonalRed(table) {
  for (i = 0; i < table.rows.length; i++) {
    row = table.rows[i];
    row.cells[i].style.backgroundColor = 'red';
  }
}
