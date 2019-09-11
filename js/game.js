const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const ball = new Image();
const bg = new Image();
const w = new Image();
const line = new Image();
const start = new Image();

const pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
  flag: 0,
  point: 0
};

ball.src = "img/ball.png";
bg.src = "img/bg.png";
w.src = "img/w.png";
line.src = "img/line.png";
start.src = "img/start.png";

let stop = 0;
let xPos = 250;
let yPos = 330;
let speedWallDiff = 0;
let n = 1;
let isDrawing = false;
let score = 0;
let posDif = 0;
let up = false;
const gravitation = 5;
const speedWall = 2.0;
const speedBird = 0.5;
const wall = {
  height: 430
};

const screen = {
  width: 800,
  height: 500
};

document.addEventListener("keydown", moveReact);
document.addEventListener("keydown", moveReact);

function moveReact(e) {
  switch (e.keyCode) {
    case 32: // Space
      isDrawing ? moveUp() : false;
      break;
    case 13: // Enter
      if (!isDrawing) {
        stop = 1;
        isDrawing = true;
        ctx.drawImage(start, 800, 800);
      }

      break;
  }
}

function moveUp() {
  up = true;
  posDif = 0;
}

function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(ball, xPos, yPos);
  if (!!stop) {
    if (up && posDif < 360) {
      posDif += 15;
      yPos -= 10;
    } else {
      posDif = 0;
      up = false;
    }
    const WallSize = screen.height - w.height;
    for (let i = 0; i < pipe.length; i++) {
      ctx.drawImage(w, pipe[i].x, pipe[i].y + WallSize);
      pipe[i].x -= speedWall + speedWallDiff;

      const rand = Math.floor(Math.random() * (100 + 1));
      if (pipe[i].x <= 500 && pipe[i].flag != 1 && n + 50 >= rand) {
        pipe[i].flag = 1;
        pipe.push({
          x: cvs.width,
          y: Math.floor(Math.random() * (screen.height - WallSize + 1)),
          flag: 0
        });
      }

      if (
        (xPos + ball.width - 5 >= pipe[i].x &&
          yPos > pipe[i].y + WallSize &&
          xPos < pipe[i].x) ||
        yPos > cvs.height - 15
      ) {
        restart();
        break;
      }
      if (
        xPos + ball.width - 5 >= pipe[i].x &&
        yPos < pipe[i].y + WallSize &&
        !pipe[i].score
      ) {
        pipe[i].score = 1;
        score++;
      }
    }

    n += 0.0001;
    speedWallDiff += 0.002;
    yPos += gravitation;
  } else {
    ctx.drawImage(start, 270, 200);
  }
  ctx.drawImage(line, 0, cvs.height - 15);
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, 400);
  requestAnimationFrame(draw);
}

function main() {
  draw();
}

function restart() {
  posDif = 0;
  isDrawing = false;
  stop = 0;
  score = 0;
  pipe.length = 0;
  pipe[0] = {
    x: cvs.width,
    y: 0,
    flag: 0
  };

  xPos = 50;
  yPos = 10;

  speedWallDiff = 0;
  n = 1;
}
function showStart() {
  ctx.drawImage(start, 200, 100);
}
start.onload = draw;
