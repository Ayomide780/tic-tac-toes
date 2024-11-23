const cells = document.querySelectorAll(".cell");
const playerXScoreSpan = document.querySelector("#playerXScore");
const playerOScoreSpan = document.querySelector("#playerOScore");
const resetBtn = document.querySelector(".resetBtn");
const toastDiv = document.querySelector(".toast");
const drawsSpan = document.querySelector("#draws");

const playerXNameInput = document.querySelector("#playerXName");
const playerONameInput = document.querySelector("#playerOName");
const playerXNameDisplay = document.querySelector("#playerXNameDisplay");
const playerONameDisplay = document.querySelector("#playerONameDisplay");

let playerXName = "Player 1";
let playerOName = "Player 2";
let playerXScore = 0;
let playerOScore = 0;
let drawCount = 0; // Added variable to track draw count
let currentLevel = 1;
let flag = true;
let currentPlayer = "X"; // Start with "X"

function updatePlayerNames() {
  playerXName = playerXNameInput.value || "Player 1";
  playerOName = playerONameInput.value || "Player 2";
  playerXNameDisplay.textContent = playerXName;
  playerONameDisplay.textContent = playerOName;
}

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked);
});

function cellClicked(e) {
  if (flag) {
    if (e.target.innerHTML === "") {
      e.target.appendChild(addImg(currentPlayer)); // Add the correct image (X or O)
      checkWinner();
      checkDraw();
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alternate turns
    }
  }
}

function addImg(type) {
  const img = document.createElement("img");
  img.src = `${type}.png`; // Set the image source for X or O
  img.classList.add("marker"); // Add a class to control image size
  return img;
}

function checkWinner() {
  for (let i = 0; i < winCombos.length; i++) {
    const winCombo = winCombos[i];
    const cell1 = cells[winCombo[0]];
    const cell2 = cells[winCombo[1]];
    const cell3 = cells[winCombo[2]];

    if (
      cell1.innerHTML !== "" &&
      cell1.innerHTML === cell2.innerHTML &&
      cell1.innerHTML === cell3.innerHTML
    ) {
      toast(`${currentPlayer === "X" ? playerXName : playerOName} wins!`);
      updateScore();
      flag = false;
      currentLevel++;
      setTimeout(() => {
        reset();
        toast(`Level ${currentLevel}`);
      }, 2000);
      return; // Stop further checks after a win
    }
  }
}

function checkDraw() {
  if ([...cells].every((cell) => cell.innerHTML !== "")) {
    drawCount++; // Increment draw count
    drawsSpan.textContent = drawCount; // Update draw count in UI
    toast("It's a draw!");
    currentLevel++;
    setTimeout(() => {
      reset();
      toast(`Level ${currentLevel}`);
    }, 2000);
  }
}

function toast(msg) {
  toastDiv.classList.add("show");
  toastDiv.textContent = msg;
  setTimeout(() => {
    toastDiv.classList.remove("show");
  }, 1000);
}

function updateScore() {
  if (currentPlayer === "X") {
    playerXScore++;
    playerXScoreSpan.textContent = playerXScore;
  } else {
    playerOScore++;
    playerOScoreSpan.textContent = playerOScore;
  }
}

function reset() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  flag = true;
}

resetBtn.addEventListener("click", () => {
  flag = false;
  reset();
  currentLevel = 1;
  playerXScore = 0;
  playerOScore = 0;
  drawCount = 0; // Reset draw count
  playerXScoreSpan.textContent = playerXScore;
  playerOScoreSpan.textContent = playerOScore;
  drawsSpan.textContent = drawCount; // Reset draw count in UI
  toast("Game reset!");
  setTimeout(() => {
    toast(`Level ${currentLevel}`);
    flag = true;
  }, 2000);
});

// Call the function to update player names initially
updatePlayerNames();

// Listen for changes in player names
playerXNameInput.addEventListener("input", updatePlayerNames);
playerONameInput.addEventListener("input", updatePlayerNames);
