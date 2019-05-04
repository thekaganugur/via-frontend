// import axios from 'axios';

export default function() {
  var canvas = document.getElementById('trackingCanvas'),
    ctx = canvas.getContext('2d'),
    line = {},
    drag = false;

  function init() {
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = 'crosshair';
  }

  function mouseDown(e) {
    var bounds = e.target.getBoundingClientRect();
    line.startLeftX = e.clientX - bounds.left;
    line.startTopY = e.clientY - bounds.top;
    drag = true;
  }

  function mouseUp() {
    drag = false;
    canvas.style.pointerEvents = 'none';
    //POST REQUEST HERE
    // axios.post()
    setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 400);
    console.log(`startX:${line.startLeftX} startY:${line.startTopY}`);
    console.log(`X:${line.X} Y:${line.Y}`);
  }

  function mouseMove(e) {
    var bounds = e.target.getBoundingClientRect();
    if (drag) {
      ctx.beginPath();
      ctx.moveTo(line.startLeftX, line.startTopY);
      line.X = e.clientX - bounds.left;
      line.Y = e.clientY - bounds.top;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
    }
  }

  function draw() {
    ctx.setLineDash([4]);
    ctx.strokeStyle = 'Cyan';
    ctx.lineWidth = '3';
    ctx.lineTo(line.X, line.Y);
    ctx.stroke();
  }

  init();
}
