
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, direction, food, score, game;

function resetGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = undefined;
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };
  score = 0;
  document.getElementById("score").innerText = "Pontuação: 0";
  if (game) clearInterval(game);
  game = setInterval(draw, 120);
}

document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // desenha a cobrinha
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#4ade80" : "#22c55e";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // desenha a comida
  ctx.fillStyle = "#fbbf24";
  ctx.fillRect(food.x, food.y, box, box);

  // posição da cabeça
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // se comer a comida
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").innerText = "Pontuação: " + score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  // colisões
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Pontuação final: " + score);
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Reset com tecla R
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'r') {
    resetGame();
  }
});

resetGame();
