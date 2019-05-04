export default function() {
  return new Promise(resolve => {
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
      setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 400);

      resolve({
        line_coord1_x: line.startLeftX,
        line_coord1_y: line.startTopY,
        line_coord2_x: line.X,
        line_coord2_y: line.Y
      });
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
  });
}
