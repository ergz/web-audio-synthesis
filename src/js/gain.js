let audioContext;
let audio;
let gainNode;

function mousePressed() {
    if (!audioContext) {
        audioContext = new AudioContext();
    

    // create html tag and reference to it
    audio = document.createElement("audio");
    audio.src = "audio/01 Xtal.mp3";
    audio.loop = true;

    audio.play();
    const source = audioContext.createMediaElementSource(audio);
    gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    } else {
        audio.pause();
        audioContext.close();
        audioContext = audio = null;
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    // fill background
    background("black");
  
    fill("white");
    noStroke();
  
    // Draw play/pause button
    const dim = min(width, height);
    if (audioContext) {
      // Get a new volume based on mouse position
      const volume = abs(mouseX - width / 2) / (width / 2);
  
      // Schedule a gradual shift in value with a small time constant
      gainNode.gain.setTargetAtTime(volume, audioContext.currentTime, 0.01);
  
      // Draw a volume meter
      rectMode(CENTER);
      rect(width / 2, height / 2, dim * volume, dim * 0.05);
    } else {
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
  