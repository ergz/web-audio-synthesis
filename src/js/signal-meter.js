let audioContext;
let audio;
let signalData;
let analyserNode;

function mousePressed() {
  if (!audioContext) {
    // set up audio context and start playing
    audioContext = new AudioContext();
    audio = document.createElement("audio");
    audio.src = "audio/01 Xtal.mp3";
    audio.loop = true;
    audio.play();

    // create source and connect to speakers and analyser node
    const source = audioContext.createMediaElementSource(audio);
    analyserNode = audioContext.createAnalyser();
    analyserNode.smoothingTimeConstant = 1;
    signalData = new Float32Array(analyserNode.fftSize);
    source.connect(audioContext.destination);
    source.connect(analyserNode);
  } else {
    // pause audio
    if (audio.paused) audio.play();
    else audio.pause();
  }
}

function rmss(data) {
  let rms = 0;
  for (let i = 0; i < data.length; i++) {
    rms += data[i] * data[i];
  }

  return Math.sqrt(rms / data.length);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  const dim = min(height, width);

  if (audioContext) {
    analyserNode.getFloatTimeDomainData(signalData);

    const signal = rmss(signalData);
    const scale = 0.015;
    const size = dim * scale * signal;

    const redOffset = map(signal, 0, 0.5, -50, 200);
    const blueOffset = map(signal, 0, 0.5, 255, -30);
    const fillAlpha = map(signal, 0, 0.5, 0, 200);

    stroke(Math.min(50 + redOffset, 256), 10, 0 + blueOffset);
    fill(Math.min(50 + redOffset, 256), 10, 0 + blueOffset, fillAlpha);
    // noFill();
    strokeWeight(10);
    // circle(width / 2, height / 2, size);

    let numPoints = 100;
    let radius = 100;
    let glitchMagnitude = 150;
    beginShape(POINTS);
    for (let i = 0; i <= numPoints; i++) {
      let angle = (TWO_PI / numPoints) * i;
      let r = radius + (size / 2) * glitchMagnitude + Math.random() * 10;
      let x = width / 2 + r * cos(angle);
      let y = height / 2 + r * sin(angle);

      vertex(x, y);
    }
    endShape();
  } else {
    fill("white");
    noStroke();
    polygon(width / 2, height / 2, dim * 0.1, 3);
  }
}

function polygon(x, y, radius, sides = 3, angle = 0) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides);
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
