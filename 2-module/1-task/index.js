function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    if (typeof salaries[key] == 'number' && !Number.isNaN(salaries[key]) && Number.isFinite(salaries[key])) {
      sum += salaries[key];
    }
  }
  return sum;

}
