function makeFriendsList(friends) {
  listUl = document.createElement('ul');
  listUl.insertAdjacentHTML('beforeend', friends.map(friend => `<li>${friend.firstName} ${friend.lastName}</li>`).join(''));
  return listUl;
}
