const showAll = (client) => {
  const clients = document.querySelector('#clients');
  const repaid = document.querySelector('#repaid');
  const post = document.querySelector('#container');
  // const loans = document.querySelector('#loans');
  // const running = document.querySelector('#running');
  const board = document.querySelector('#board');
  const array = [clients, repaid, post, board];

  const block = array.find(nee => nee === client);
  block.style.display = 'block';
  
  const none = array.filter(nee => nee !== client);
  none.forEach((result) => {
    result.style.display = 'none';
  });
};


const showClients = () => {
  const clients = document.querySelector('#clients');
  showAll(clients);
};


// const showLoans = () => {
//   const loans = document.querySelector('#loans');
//   showAll(loans);
// };


// const showRunning = () => {
//   const running = document.querySelector('#running');
//   showAll(running);
// };


const showRepaid = () => {
  const repaid = document.querySelector('#repaid');
  showAll(repaid);
};

const showPost = () => {
  const post = document.querySelector('#container');
  showAll(post);
};


document.querySelector('#liclients').addEventListener('click', showClients);
// document.querySelector('#liloans').addEventListener('click', showLoans);
// document.querySelector('#lirunning').addEventListener('click', showRunning);
document.querySelector('#lirepaid').addEventListener('click', showRepaid);
document.querySelector('#lipost').addEventListener('click', showPost);
