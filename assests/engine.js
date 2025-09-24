const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.getElementById("timeLeft"),
    score: document.getElementById("score"),
  },
  values: {
    timeId: null,
    countDowmTimerId: setInterval(countDowm, 1000),
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
};
function playSound() {
  const audio = new Audio("./assests/audio/hit.m4a");
  audio.volume = 0.2;
  audio.play();
}
function countDowm() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime === 0) {
    alert(`Game Over!!O seu resultado foi ${state.values.result}`);
  }
}
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}
function moveEnemy() {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}
function addEventListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}
function initialize() {
  moveEnemy();
  addEventListenerHitBox();
}

initialize();
