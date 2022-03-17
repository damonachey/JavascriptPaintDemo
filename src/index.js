const brushWidth = 20;
const width = 400;
const height = 400;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

canvas.width = width;
canvas.height = height;

drawGrid();

document.getElementById("clear").onclick = e => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  isDrawing = false;
};

function drawGrid() {
  let line = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
  
  for (let i = 0; i < height + 1; i += brushWidth) {
    line(0, i, width + 1, i)
  }

  for (let i = 0; i < width + 1; i += brushWidth) {
    line(i, 0,i,  height + 1)
  }
}

canvas.onmousedown = e => startDrawing(e);
window.onmouseup = e => stopDrawing(e);

function startDrawing(e) {
  console.log("startDrawing");
  isDrawing = true;

  const picker = document.getElementById("picker");

  ctx.fillStyle = picker.value;

  fillSquare(e);
}

function stopDrawing() {
  console.log("stopDrawing");

  isDrawing = false;
}

canvas.onmousemove = e => fillSquare(e);

function fillSquare(e) {
  e.preventDefault();

  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();

  const x = Math.floor((e.clientX - rect.left) / brushWidth) * brushWidth;
  const y = Math.floor((e.clientY - rect.top) / brushWidth) * brushWidth;

  ctx.fillRect(x + 1, y + 1, brushWidth - 2, brushWidth - 2);
}
