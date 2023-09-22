window.onload = function () {
  // create the canvas for both the background and the cirlce
  var bgCanvas = document.createElement("canvas");
  var circleCanvas = document.createElement("canvas");

  // get context for ech of these
  var bgctx = bgCanvas.getContext("2d");
  var circlectx = circleCanvas.getContext("2d");

  // set background properties
  bgCanvas.id = "bg";
  bgCanvas.width = innerWidth;
  bgCanvas.height = innerHeight;

  // set circle properties
  circleCanvas.id = "circle";
  circleCanvas.height = innerHeight;
  circleCanvas.width = innerWidth;
  bgctx.fillStyle = "black";
  bgctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  document.body.appendChild(bgCanvas);
  document.body.appendChild(circleCanvas);

  var r = 50;
  var x = 100;
  var y = 500;
  let ysign = 1;
  let xsign = 1;

  // draw the circle moving around the screen
  function draw() {
    circlectx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    x += 10 * xsign;
    y += 10 * ysign;

    if (y + r > bgCanvas.getBoundingClientRect().bottom) {
      ysign = -1;
    } else if (y - r < bgCanvas.getBoundingClientRect().top) {
      ysign = 1;
    }

    if (x + r > bgCanvas.getBoundingClientRect().right) {
      xsign = -1;
    } else if (x - r < bgCanvas.getBoundingClientRect().left) {
      xsign = 1;
    }

    let rval = mapToRange(
      x,
      [0, circleCanvas.getBoundingClientRect().right],
      [80, 255]
    );
    let gval = mapToRange(
      x,
      [0, circleCanvas.getBoundingClientRect().right],
      [34, 150]
    );

    let bval = mapToRange(
      y,
      [0, bgCanvas.getBoundingClientRect().bottom],
      [50, 200]
    );

    circlectx.beginPath();
    circlectx.arc(x, y, r, 0, 2 * Math.PI, false);
    let color = "rgb(" + rval + "," + gval + "," + bval;
    circlectx.fillStyle = color;
    circlectx.fill();
    circlectx.lineWidth = 5;
    circlectx.strokeStyle = "white";
    circlectx.stroke();
  }

  function animate() {
    requestAnimationFrame(animate);
    draw();
  }

  animate();

  bgCanvas.style.position = "absolute";
  circleCanvas.style.position = "absolute";
  circleCanvas.style.top = "0px";
  circleCanvas.style.left = "0px";
};

function mapToRange(input, inputRange, outputRange) {
  const inputSpan = inputRange[1] - inputRange[0];
  const outputSpan = outputRange[1] - outputRange[0];

  // Calculate how far into the input range the input value is (as a value between 0 and 1)
  const valueScaled = (input - inputRange[0]) / inputSpan;

  // Map this value into the output range
  const valAtOutRange = outputRange[0] + valueScaled * outputSpan;

  return valAtOutRange;
}
