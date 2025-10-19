const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.getElementById("timeLeft"),
    score: document.getElementById("score"),
    life: document.querySelector("life"),
  },
  values: {
    timeId: null,
    countDowmTimerId: setInterval(countDowm, 1000),
    gameVelocity: 500,
    hitPosition: 0,
    lifePlayer: 3,
    result: 0,
    currentTime: 60,
  },
};

function playSound() {
  const audio = new Audio("./assets/audio/hit.m4a");
  audio.volume = 0.2;
  audio.play();
}

function countDowm() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime === 0) {
    alert(`Game Over!! O seu resultado foi ${state.values.result}`);
    state.values.currentTime = 60;
  }
}

function randomSquare() {
  // Limpa todas as classes anteriores
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
    square.classList.remove("princess");
  });

  // Escolhe um quadrado aleatório
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  // Decide aleatoriamente se será enemy ou princess
  let chance = Math.random(); // número entre 0 e 1

  if (chance < 0.8) {
    // 80% de chance de ser inimigo
    randomSquare.classList.add("enemy");
  } else {
    // 20% de chance de ser princesa
    randomSquare.classList.add("princess");
  }

  // Define a posição para verificação de clique
  state.values.hitPosition = randomSquare.id;
}
function moveEnemy() {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function addEventListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        if (square.classList.contains("enemy")) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          playSound();
        } else if (square.classList.contains("princess")) {
          state.values.lifePlayer--;
          state.view.life.textContent = state.values.lifePlayer;
          playSound();
        }
        state.values.hitPosition = null;
      }
    });
  });
}
function initialize() {
  moveEnemy();
  addEventListenerHitBox();
}

initialize();
