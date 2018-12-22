// trackingCanvas will stay after drawing, update it with incoming data.
// doesnt work if scroll is at the top

export default function() {
  var canvas = document.getElementById('trackingCanvas'),
    ctx = canvas.getContext('2d'),
    rect = {},
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
    rect.startX = e.pageX - bounds.left;
    rect.startY = e.pageY - bounds.top;
    drag = true;
  }

  function mouseUp() {
    drag = false;
    canvas.style.pointerEvents = 'none';
    console.log([rect.startX, rect.startY, rect.w, rect.h]);
  }
  function mouseMove(e) {
    var bounds = e.target.getBoundingClientRect();
    if (drag) {
      rect.w = e.pageX - bounds.left - rect.startX;
      rect.h = e.pageY - bounds.top - rect.startY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
    }
  }

  function draw() {
    ctx.setLineDash([6]);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
  }

  init();
}
