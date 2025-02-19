const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const alerts = document.getElementById("alerts");
const eat = new Audio("sounds/eating-sound-effect-36186.mp3");
const brick = new Audio("sounds/debris-break-253779(2).mp3");
const teleport = new Audio("sounds/sci-fi-intro-logo-reveal-2-227275(3).mp3");
const bgSound = new Audio(
  "sounds/vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290(2)(2).mp3"
);

const gridSize = 20;
let tileCount = Math.floor(window.innerWidth / gridSize);
if (tileCount > 20) tileCount = 30; // Limit width on larger screens

canvas.width = tileCount * gridSize;
canvas.height = canvas.width; // Make it square
if (window.innerWidth < 600) {
  tileCount = 20;
  canvas.height = tileCount * 40;
} else if (window.innerWidth < 1000 && window.innerWidth > 610) {
  tileCount = 30;
  canvas.height = tileCount * 27;
}

let snake = [
  {
    x: Math.floor(tileCount / 2) * gridSize,
    y: Math.floor(tileCount / 2) * gridSize,
  },
];
let food = generateFood();
let direction = "right";
let gameOver = false;
let score = 0;
let blueFood = generateFood(); // Blue food coordinates
let isBlueFoodActive = false;
let timeForBlueFood = 60000; // Time for blue food to appear in ms
let timer = 0; // Timer to track when blue food should appear
let map = null;
let foodType = 3;
let snakeSpeed = 300; // Normal speed
let speedTimeout = null; // To handle the speed reset after 5 seconds
let isGreen = null;
let portalStrock = null;

// Wall-related variables
let walls = [];
let wallGenerationTime = 60000; // 1 minutes before walls start
let wallGenerationInterval = 30000; // 30 seconds between wall generations
let maxWalls = 20; // Stop generating after 20 walls
let wallCount = 0;

// Brown food variables
let brownFoodTimer = Math.floor(Math.random() * 1000) + 1000; // Random time between 5-15 seconds
let isBrownFood = false;

// Set up keyboard controls for PC
document.addEventListener("keydown", changeDirection);

// Touch controls for mobile
let touchStart = null;
document.addEventListener("touchstart", (e) => {
  touchStart = e.touches[0];
});

document.addEventListener("touchmove", (e) => {
  if (!touchStart) return;
  const touch = e.touches[0];
  const deltaX = touch.clientX - touchStart.clientX;
  const deltaY = touch.clientY - touchStart.clientY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0 && direction !== "left") direction = "right";
    else if (deltaX < 0 && direction !== "right") direction = "left";
  } else {
    if (deltaY > 0 && direction !== "up") direction = "down";
    else if (deltaY < 0 && direction !== "down") direction = "up";
  }

  touchStart = touch;
});

document.addEventListener("touchend", () => {
  touchStart = null;
});

// Main game loop
function gameLoop() {
  if (gameOver) {
    alerts.style.display = "block";
    alerts.textContent = `Game Over! Your score: ${score}`;

    return;
  }

  // Handle the food change based on the timer
  if (timer <= 0) {
    // Timer expired, spawn new blue food and reset the timer
    timer = timeForBlueFood;
    isBlueFoodActive = true;
    blueFood = generateFood(); // Re-generate blue food
  } else {
    timer -= 100; // Decrease timer
  }

  setTimeout(() => {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    drawWalls();
    checkCollisions();
    bgSound.play();
    gameLoop();
  }, snakeSpeed); // Speed is controlled here
}

// Function to slow down the snake's speed
function slowDownSpeed() {
  if (speedTimeout) clearTimeout(speedTimeout); // Clear any existing timeout

  snakeSpeed = 600; // Slow down the snake's speed
  speedTimeout = setTimeout(() => {
    snakeSpeed = 300; // Reset to normal speed after 5 seconds
    setTimeout(() => {
      snakeSpeed = 100;
    }, 60000);
  }, 5000); // 5 seconds slow down
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to draw the snake
function drawSnake() {
  snake.forEach((segment, index) => {
    // Draw smooth body with rounded corners
    ctx.fillStyle = index === 0 ? "lime" : "lime";
    ctx.beginPath();
    ctx.arc(
      segment.x + gridSize / 2,
      segment.y + gridSize / 2,
      gridSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw the snake's face on the head (first segment)
    if (index === 0) {
      ctx.fillStyle = "black"; // Eye color
      ctx.beginPath();
      ctx.arc(
        segment.x + gridSize / 4,
        segment.y + gridSize / 4,
        3,
        0,
        Math.PI * 2
      ); // Left eye
      ctx.arc(
        segment.x + (3 * gridSize) / 4,
        segment.y + gridSize / 4,
        3,
        0,
        Math.PI * 2
      ); // Right eye
      ctx.fill();

      // Draw the tongue
      ctx.strokeStyle = "red"; // Red color for the tongue
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(segment.x + gridSize / 2, segment.y + gridSize / 2); // Snake mouth position
      ctx.lineTo(segment.x + gridSize / 2, segment.y + gridSize); // Draw the tongue downwards
      ctx.stroke();
    }
  });
}

function generateRandomNumber() {}

// Function to draw the food
function drawFood() {
  const frogX = food.x + gridSize / 2;
  const frogY = food.y + gridSize / 2;

  if (foodType === 1) {
    mouse();
  } else if (foodType === 2) {
    lizart();
  } else if (foodType === 3) {
    frog();
  }

  // Randomly decide if food should be greenyellow or blue

  setTimeout(() => {
    setInterval(() => {
      isGreen = 1;
    }, 6000);
  }, 60000);

  setInterval(() => {
    isGreen = 2;
  }, 2000);

  if (isGreen == 1) {
    portalStrock = "greenyellow";
  } else if ((isGreen = 2)) {
    portalStrock = "navy";
  }

  if (isBlueFoodActive) {
    const portalRadius = gridSize / 2; // Radius for the circle
    ctx.beginPath();
    ctx.arc(
      blueFood.x + gridSize / 2,
      blueFood.y + gridSize / 2,
      portalRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "lightblue"; // Light blue for the center
    ctx.fill();
    ctx.lineWidth = 4; // Stroke width
    ctx.strokeStyle = portalStrock; // Navy blue for the stroke
    ctx.stroke();
    ctx.closePath();
  }

  function frog() {
    // Face (circle)
    ctx.beginPath();
    ctx.arc(frogX, frogY, gridSize / 2, 0, Math.PI * 2); // Outer circle for the face
    ctx.fillStyle = "rgb(0, 78, 48)"; // Green color for frog face
    ctx.fill();
    ctx.closePath();

    // Eyes (two smaller white circles)
    const eyeRadius = gridSize / 6;
    ctx.beginPath();
    ctx.arc(
      frogX - gridSize / 4,
      frogY - gridSize / 4,
      eyeRadius,
      0,
      Math.PI * 2
    ); // Left eye
    ctx.arc(
      frogX + gridSize / 4,
      frogY - gridSize / 4,
      eyeRadius,
      0,
      Math.PI * 2
    ); // Right eye
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Pupils (two black circles inside eyes)
    const pupilRadius = gridSize / 12;
    ctx.beginPath();
    ctx.arc(
      frogX - gridSize / 4,
      frogY - gridSize / 4,
      pupilRadius,
      0,
      Math.PI * 2
    ); // Left pupil
    ctx.arc(
      frogX + gridSize / 4,
      frogY - gridSize / 4,
      pupilRadius,
      0,
      Math.PI * 2
    ); // Right pupil
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // Mouth (arc)
    ctx.beginPath();
    ctx.arc(frogX, frogY + gridSize / 8, gridSize / 4, 0, Math.PI); // Half circle for the mouth
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  function mouse() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 2,
      food.y + gridSize / 2,
      gridSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw the ears (two small circles)
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 4,
      food.y + gridSize / 4,
      gridSize / 6,
      0,
      Math.PI * 2
    );
    ctx.arc(
      food.x + (3 * gridSize) / 4,
      food.y + gridSize / 4,
      gridSize / 6,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw the eyes (two white circles)
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 3,
      food.y + gridSize / 3,
      gridSize / 8,
      0,
      Math.PI * 2
    );
    ctx.arc(
      food.x + (2 * gridSize) / 3,
      food.y + gridSize / 3,
      gridSize / 8,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw the pupils (two small black circles)
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 3,
      food.y + gridSize / 3,
      gridSize / 16,
      0,
      Math.PI * 2
    );
    ctx.arc(
      food.x + (2 * gridSize) / 3,
      food.y + gridSize / 3,
      gridSize / 16,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw the nose (small red circle)
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 2,
      food.y + (3 * gridSize) / 4,
      gridSize / 8,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  function lizart() {
    ctx.fillStyle = "#C2B280"; // Dry mud color for the face
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 2,
      food.y + gridSize / 2,
      gridSize / 2,
      0,
      Math.PI * 2
    ); // Face shape
    ctx.fill();

    // Draw eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 3,
      food.y + gridSize / 3,
      gridSize / 6,
      0,
      Math.PI * 2
    ); // Left eye
    ctx.arc(
      food.x + (2 * gridSize) / 3,
      food.y + gridSize / 3,
      gridSize / 6,
      0,
      Math.PI * 2
    ); // Right eye
    ctx.fill();

    // Draw pupils
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 3,
      food.y + gridSize / 3,
      gridSize / 12,
      0,
      Math.PI * 2
    ); // Left pupil
    ctx.arc(
      food.x + (2 * gridSize) / 3,
      food.y + gridSize / 3,
      gridSize / 12,
      0,
      Math.PI * 2
    ); // Right pupil
    ctx.fill();

    // Draw mouth
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(
      food.x + gridSize / 2,
      food.y + (2 * gridSize) / 3,
      gridSize / 3,
      0,
      Math.PI
    ); // Mouth
    ctx.stroke();
  }
}

// Function to draw walls
function drawWalls() {
  ctx.fillStyle = "brown"; // Color of the brick
  ctx.strokeStyle = "black"; // Border color for each brick
  ctx.lineWidth = 2; // Thickness of the border

  walls.forEach((wall) => {
    // Draw the brick shape
    ctx.fillRect(wall.x, wall.y, gridSize, gridSize);
    ctx.strokeRect(wall.x, wall.y, gridSize, gridSize); // Add border around each brick
  });
}

// Function to move the snake
const poin = document.getElementById("point");
function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "right") head.x += gridSize;
  if (direction === "left") head.x -= gridSize;
  if (direction === "up") head.y -= gridSize;
  if (direction === "down") head.y += gridSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    poin.textContent = score += 10;
    eat.play();

    if (isBrownFood) {
      relocateWalls(); // Relocate walls if snake eats brown food
      isBrownFood = false; // Reset the brown food status
    } else {
      // Randomly turn food to brown after it is eaten
      setTimeout(() => {
        isBrownFood = true;
        brownFoodTimer = Math.floor(Math.random() * 10000) + 5000; // Reset timer
      }, brownFoodTimer);

      food = generateFood(); // Generate new food
    }
  } else if (head.x === blueFood.x && head.y === blueFood.y) {
    // Snake eats green food, slow down the speed for 5 seconds
    if (portalStrock == "greenyellow") {
      slowDownSpeed();
    }

    // Player ate blue food
    poin.textContent = score += 20; // Blue food gives more points
    teleport.play();
    if ((poin.textContent = score += 20)) {
      map = Math.floor(Math.random() * 4) + 1;
    }

    changeBackgroundAndFood(map);
    isBlueFoodActive = false; // Deactivate blue food until next cycle
    food = generateFood(); // Generate new regular food
  } else {
    snake.pop();
  }
}

// Function to generate random food
function generateFood() {
  let foodX = Math.floor(Math.random() * tileCount) * gridSize;
  let foodY = Math.floor(Math.random() * tileCount) * gridSize;

  return { x: foodX, y: foodY };
}

// Function to generate walls
function wallGenerator() {
  if (wallCount >= maxWalls) return;

  let numberOfWalls = Math.floor(score / 10 / 5) + 1; // Increase walls every 5 seconds
  let newWalls = [];

  for (let i = 0; i < numberOfWalls; i++) {
    let wallX = Math.floor(Math.random() * tileCount) * gridSize;
    let wallY = Math.floor(Math.random() * tileCount) * gridSize;
    newWalls.push({ x: wallX, y: wallY });
  }

  walls = walls.concat(newWalls);
  wallCount += newWalls.length;
}

// Function to relocate all walls
function relocateWalls() {
  walls = walls.map(() => {
    let wallX = Math.floor(Math.random() * tileCount) * gridSize;
    let wallY = Math.floor(Math.random() * tileCount) * gridSize;
    return { x: wallX, y: wallY };
  });
}

// Function to change background color and food color when blue food is eaten
function changeBackgroundAndFood(map) {
  if (map == 1) {
    canvas.style.background = "url(images/city.jpeg)";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "cover";
    foodType = 1;
    alerts.textContent = "CITY";
    alerts.style.display = "block";
    setTimeout(() => {
      alerts.style.display = "none";
    }, 1000);
  } else if (map == 2) {
    canvas.style.background = "url(images/desert.jpeg)";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "cover";
    foodType = 2;
    alerts.textContent = "DESERT";
    alerts.style.color = "yellow";
    alerts.style.display = "block";
    setTimeout(() => {
      alerts.style.display = "none";
    }, 1000);
  } else if (map == 3) {
    canvas.style.background = "url(images/jungle.jpeg)";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "cover";
    foodType = 3;
    alerts.textContent = "JUNGLE";
    alerts.style.color = "#4FFFB0";
    alerts.style.display = "block";
    setTimeout(() => {
      alerts.style.display = "none";
    }, 1000);
  }
}

// // Function to check for collisions
// function checkCollisions() {
//   const head = snake[0];

//   if (
//     head.x < 0 ||
//     head.x >= canvas.width ||
//     head.y < 0 ||
//     head.y >= canvas.height ||
//     snake
//       .slice(1)
//       .some((segment) => segment.x === head.x && segment.y === head.y)
//   ) {
//     gameOver = true;
//   }
// }

// Function to check for collisions
function checkCollisions() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y) ||
    walls.some((wall) => wall.x === head.x && wall.y === head.y)
  ) {
    gameOver = true;
    brick.play();
  }
}

// Function to change the snake's direction (PC)
function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  }
  if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
  if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  }
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
}

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", () => {
  snake = [
    {
      x: Math.floor(tileCount / 2) * gridSize,
      y: Math.floor(tileCount / 2) * gridSize,
    },
  ];
  food = generateFood();
  direction = "right";
  gameOver = false;
  score = 0;
  portalStrock = "navy";
  poin.textContent = 0;
  walls = []; // Clear walls array
  drawWalls(); // Redraw (which is now empty)
  setTimeout(() => {
    setInterval(wallGenerator, wallGenerationInterval); // Start generating walls every 5 seconds
  }, wallGenerationTime);
  alerts.style.display = "none";
  gameLoop();
});

setInterval(() => {
  bgSound.play();
}, 11000);
gameLoop();

// Wall generation will start after 10 seconds
setTimeout(() => {
  setInterval(wallGenerator, wallGenerationInterval); // Start generating walls every 5 seconds
}, wallGenerationTime);
