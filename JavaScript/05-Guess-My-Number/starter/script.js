'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
//document.querySelector('.number').textContent = secretNumber;
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', check);
function check() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //When Guess is empty
  if (!guess) {
    document.querySelector('.message').textContent = '⛔No Number Found!';
  }

  //When Player Wins
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉Correct!';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    //document.querySelector('.check').addEventListener('click', resetAll);
  }

  //When Guess is Too low
  else if (guess < secretNumber && guess > 0) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else if (score === 1) {
      document.querySelector('.message').textContent = '👎You lost the game!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      return;
    }
  }

  //When Guess is Too high
  else if (guess > secretNumber && guess < 21) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else if (score === 1) {
      document.querySelector('.message').textContent = '👎You lost the game!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      return;
    }
  }

  //When Guess is Invalid
  else {
    document.querySelector('.message').textContent =
      '🚫Invalid Input! Choose number between 1 to 20.';
    return;
  }
}

document.querySelector('.again').addEventListener('click', resetAll);

function resetAll() {
  console.log('was called');
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
}
