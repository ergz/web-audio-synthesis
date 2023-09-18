window.onload = function () {
  var bgCanvas = document.createElement("canvas");
  var circleCanvas = document.createElement("canvas");
  var bgctx = bgCanvas.getContext("2d");
  var circlectx = circleCanvas.getContext("2d");
  bgCanvas.id = "bg";
  circleCanvas.id = "circle";
  bgCanvas.width = innerWidth;
  bgCanvas.height = innerHeight;
  circleCanvas.height = innerHeight;
  circleCanvas.width = innerWidth;
  bgctx.fillStyle = "black";
  bgctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
  document.body.appendChild(bgCanvas);
  document.body.appendChild(circleCanvas);
  var r = 50;

  circleCanvas.addEventListener("mousemove", function (event) {
    var x = event.clientX - circleCanvas.getBoundingClientRect().left;
    var y = event.clientY - circleCanvas.getBoundingClientRect().top;

    circlectx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);

    circlectx.beginPath();
    circlectx.arc(x, y, r, 0, 2 * Math.PI, false);
    circlectx.fillStyle = "blue";
    circlectx.fill();
    circlectx.lineWidth = 5;
    circlectx.strokeStyle = "green";
    circlectx.stroke();
  });

  bgCanvas.style.position = "absolute";
  circleCanvas.style.position = "absolute";
  circleCanvas.style.top = "0px";
  circleCanvas.style.left = "0px";
};
