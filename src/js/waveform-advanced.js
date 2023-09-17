let audioContext;
let audioBuffer;
let analyserNode;
let analyserData;
let gainNode;
let audio;
let isFloat = false;
let inerval;

function mousePressed() {
    // check to see if audioContext was created, if not create it
    if (!audioContext) {
        audioContext = new AudioContext();
    } else {
        audio.pause();
        audioContext.close();
        audioContext = analyserNode = null;
    }
}

