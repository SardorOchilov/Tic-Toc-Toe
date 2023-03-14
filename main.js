const boards = document.querySelectorAll(".board");
const turns = document.querySelector(".turns");
const nonActiveBoard = document.querySelector(".non-active");

const winPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let xPosition = [];
let oPosition = [];
let activePlayer = 1;
let activeBoard = -1;
let win = 0;

// Set Tic Tac
for (const board of boards) {
  const cells = board.children;
  Array.from(cells).forEach(function (cell, idx) {
    cell.addEventListener("click", function () {
      if (cell.innerHTML === "")
        if (activePlayer === 1) {
          cell.innerHTML = '<img src="img/x2.svg" alt="" />';
          activePlayer = 2;
          xPosition.push(idx);
          turns.children[0].classList.toggle("activePlayer");
          turns.children[1].classList.toggle("activePlayer");
        } else {
          cell.innerHTML = '<img src="img/o2.svg" alt="" />';
          activePlayer = 1;
          oPosition.push(idx);
          turns.children[0].classList.toggle("activePlayer");
          turns.children[1].classList.toggle("activePlayer");
        }
      checkWinner(xPosition, 1);
      checkWinner(oPosition, 2);
    });
  });
}

// Cheking Winner
function checkWinner(position, whichPlayer) {
  for (const pos of winPosition) {
    for (const idx of pos) {
      if (position.includes(idx)) win++;
      else {
        win = 0;
        break;
      }
    }
    if (win === 3) {
      let score = +document.querySelector(`.score-${whichPlayer}`).textContent;
      score++;
      document.querySelector(`.score-${whichPlayer}`).textContent = score;
      activeBoard++;
      let boardBox = document.querySelectorAll(".board-box");
      if (activeBoard < 2) {
        boardBox[activeBoard]
          .querySelector(".displayClose")
          .classList.add("non-active");
        boardBox[activeBoard + 1]
          .querySelector(".displayClose")
          .classList.remove("non-active");
        boardBox[activeBoard + 1].appendChild(turns);
      } else {
        boardBox[activeBoard].removeChild(turns);
        boardBox[activeBoard]
          .querySelector(".displayClose")
          .classList.add("non-active");
          totalResult();
      }
      xPosition = [];
      oPosition = [];
      activePlayer = 1;
      turns.children[0].classList.toggle("activePlayer");
      turns.children[1].classList.toggle("activePlayer");
    }
  }
}

function totalResult() {
  const score1 = +document.querySelector(".score-1").textContent;
  const score2 = +document.querySelector(".score-2").textContent;
  document.querySelector(".winner").classList.remove("displayNon");
  if (score1 > score2) {
    document.querySelector(".winner").innerHTML = `<p>Player 1</p>
        <h2>X WINNER</h2>`;
  } else document.querySelector(".winner").innerHTML = `<p>Player 2</p>
        <h2>O WINNER</h2>`;
}
