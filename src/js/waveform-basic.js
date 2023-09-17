let audioContext;
let audioBuffer;
let analyserNode;
let analyserData;
let gainNode;
let isPlaying = false;
let startTime = 0;
let pauseTime = 0;

function mousePressed() {
  if (isPlaying) {
    pauseSound();
  } else {
    playSound();
  }
}

async function loadSound() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (!audioBuffer) {
    const resp = await fetch("audio/01 Xtal.mp3");
    const buf = await resp.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(buf);
  }

  if (!gainNode) {
    gainNode = audioContext.createGain();
    analyserNode = audioContext.createAnalyser();
    analyserData = new Float32Array(analyserNode.fftSize);
    gainNode.connect(analyserNode);
    gainNode.connect(audioContext.destination);
  }
}

function pauseSound() {
  if (source) {
    source.disconnect();
    source = null;
    pauseTime = audioContext.currentTime - startTime;
    isPlaying = false;
  }
}

async function playSound() {
  await loadSound();

  await audioContext.resume();

  if (isPlaying && pauseTime) {
    // how much
    startTime = audioContext.currentTime - pauseTime;
  } else {
    startTime = audioContext.currentTime;
  }
  const source = audioContext.createBufferSource();
  source.connect(gainNode);
  source.buffer = audioBuffer;
  source.start(0, pauseTime);

  isPlaying = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // fill background
  background(0, 0, 0);

  if (analyserNode) {
    noFill();
    stroke("white");

    // get time domain data
    analyserNode.getFloatTimeDomainData(analyserData);

    beginShape();

    for (let i = 0; i < analyserData.length; i++) {
      // -1...1
      const amplitude = analyserData[i];

      const y = map(
        amplitude,
        -1,
        1,
        height / 2 - height / 4,
        height / 2 + height / 4
      );

      const x = map(
        i,
        0,
        analyserData.length - 1,
        width * 0.2,
        width - width * 0.2
      );

      vertex(x, y);
    }

    endShape();
  } else {
    fill("white");
    noStroke();
    // Draw a play button
    const dim = min(width, height);
    polygon(width / 2, height / 2, dim * 0.1, 3);
  }
}

// Draw a basic polygon, handles triangles, squares, pentagons, etc
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
