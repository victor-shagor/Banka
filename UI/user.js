const showAll = (client) => {
  const apply = document.querySelector('#container');
  const transact = document.querySelector('#transaction');
  const board = document.querySelector('#board');
  const array = [transact, board];

  const block = array.find(see => see === client);
  block.style.display = 'block';

  const none = array.filter(see => see !== client);
  none.forEach((result) => {
    result.style.display = 'none';
  });
};


// const showApply = () => {
//   const apply = document.querySelector('#container');

//   showAll(apply);
// };

const showTransact = () => {
  const transact = document.querySelector('#transaction');

  showAll(transact);
};
// document.querySelector('#liapply').addEventListener('click', showApply);
document.querySelector('#litransact').addEventListener('click', showTransact);
