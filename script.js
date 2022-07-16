const info = document.querySelector('.info');
const game = document.getElementById('game');
const boxes = document.querySelectorAll('.box');
const endDisplay = document.querySelector('.game-over');
const start = document.querySelector('#start');

const boxArray = Array.from(boxes);

const GAME_STATE = {
  game_On: false,
  move_Count: 0,
  player_1: false,
  player_2: false,
};

start.addEventListener('click', startGame);

for (let box of boxArray) {
  box.addEventListener('click', () => {
    if (
      box.textContent === 'O' ||
      box.textContent === 'X' ||
      !GAME_STATE.game_On
    ) {
      return;
    }

    GAME_STATE.move_Count += 1;

    if (GAME_STATE.player_1 && !GAME_STATE.player_2) {
      box.textContent = 'X';
      box.style.color = '#f55451';
      GAME_STATE.player_1 = !GAME_STATE.player_1;
      GAME_STATE.player_2 = !GAME_STATE.player_2;
    } else if (GAME_STATE.player_2 && !GAME_STATE.player_1) {
      box.textContent = 'O';
      box.style.color = '#38ff36';
      GAME_STATE.player_1 = !GAME_STATE.player_1;
      GAME_STATE.player_2 = !GAME_STATE.player_2;
    }

    if (GAME_STATE.move_Count === 9) {
      GAME_STATE.game_On = !GAME_STATE.game_On;
    }

    setTimeout(() => {
      getWinner();

      whosTurn();
    }, 10);

    console.log(GAME_STATE.move_Count);
  });
}

function startGame() {
  //This function fires up the game

  if (GAME_STATE.game_On) {
    return;
  }

  for (let box of boxArray) {
    box.textContent = '';
  }

  GAME_STATE.game_On = true;
  GAME_STATE.player_1 = true;
  GAME_STATE.player_2 = false;

  endDisplay.textContent = '';

  whosTurn();
}

function whosTurn() {
  //This function displays who's turn it is to play

  if (GAME_STATE.game_On && GAME_STATE.player_1) {
    info.textContent = 'player X turn';
  } else if (GAME_STATE.game_On && GAME_STATE.player_2) {
    info.textContent = 'player O turn';
  }
}

function gameOver(player) {
  //function is called when game ends

  if (player) {
    info.textContent = `player ${player} wins!`;
  } else {
    info.textContent = "It's a tie";
  }

  endDisplay.textContent = 'game over!';

  GAME_STATE.game_On = false;
  GAME_STATE.move_Count = 0;
  GAME_STATE.player_1 = false;
  GAME_STATE.player_2 = false;
}

function getWinner() {
  //This function checks if there is a move
  //that occured thrice consecutively
  //This algorithm decides if there is a winner

  if (
    (boxArray[0].textContent === boxArray[1].textContent &&
      boxArray[0].textContent === boxArray[2].textContent) ||
    (boxArray[0].textContent === boxArray[3].textContent &&
      boxArray[0].textContent === boxArray[6].textContent)
  ) {
    if (boxArray[0].textContent === '') null;
    else {
      gameOver(boxArray[0].textContent);
    }
  }
  if (
    boxArray[1].textContent === boxArray[4].textContent &&
    boxArray[1].textContent === boxArray[7].textContent
  ) {
    if (boxArray[1].textContent === '') null;
    else {
      gameOver(boxArray[1].textContent);
    }
  }
  if (
    (boxArray[2].textContent === boxArray[5].textContent &&
      boxArray[2].textContent === boxArray[8].textContent) ||
    (boxArray[2].textContent === boxArray[4].textContent &&
      boxArray[2].textContent === boxArray[6].textContent)
  ) {
    if (boxArray[2].textContent === '') null;
    else {
      gameOver(boxArray[2].textContent);
    }
  }
  if (
    boxArray[3].textContent === boxArray[4].textContent &&
    boxArray[3].textContent === boxArray[5].textContent
  ) {
    if (boxArray[3].textContent === '') null;
    else {
      gameOver(boxArray[3].textContent);
    }
  }
  if (
    boxArray[6].textContent === boxArray[7].textContent &&
    boxArray[6].textContent === boxArray[8].textContent
  ) {
    if (boxArray[6].textContent === '') null;
    else {
      gameOver(boxArray[6].textContent);
    }
  }
  if (
    boxArray[0].textContent === boxArray[4].textContent &&
    boxArray[0].textContent === boxArray[8].textContent
  ) {
    if (boxArray[0].textContent === '') null;
    else {
      gameOver(boxArray[0].textContent);
    }
  } else {
    //this is evaluated if there is no winner after all moves have been made

    if (GAME_STATE.move_Count === 9) {
      gameOver();
    }
  }
}
