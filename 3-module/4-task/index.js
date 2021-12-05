function showSalary(users, age) {
  arr = users.filter(user => user.age <= age);
  return arr.map(item => item.name + ', ' + item.balance + (item === arr[arr.length - 1] ? '' : '\n')).join('');
}
