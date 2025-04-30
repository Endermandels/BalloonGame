const balloon = document.querySelector(".balloon-svg");
const explosion = document.querySelector(".explosion-img");
const boy_smile = document.querySelector(".boy-smile-img");
const boy_laugh = document.querySelector(".boy-laugh-img");
const boy_sad = document.querySelector(".boy-sad-img");
const boy_satisfied = document.querySelector(".boy-satisfied-img");

let inflateInterval = null;
let shrinkInterval = setInterval(() => {
    if (scale > minScale) {
        scale -= shrinkRate;
        balloon.style.transform = `scale(${scale})`;
    }
}, 50); // update every 50ms

let popped = false;
let scale = 1;
const baseSize = 100;
const shrinkRate = 0.005;
const inflateRate = 0.1;
const minScale = 0.2;
const maxScale = 3.5;
const minExcited = 3.0;
const timeUntilSad = 3.0; // in seconds
const timeExcitedUntilSatisfied = 1.0; // in seconds

setTimeout(onGameTimeout, timeUntilSad*1000);

function onGameTimeout() {
    pop();
}

function pop() {
    popped = true;
    balloon.classList.add("invisible");
    explosion.classList.remove("invisible");
    boy_laugh.classList.add("invisible");
    boy_smile.classList.add("invisible");
    boy_sad.classList.remove("invisible");
    if (inflateInterval) clearInterval(inflateInterval);
    inflateInterval = null;
    if (shrinkInterval) clearInterval(shrinkInterval);
    shrinkInterval = null;
}

balloon.addEventListener('mousedown', onBalloonMouseDown);
balloon.addEventListener('mouseleave', onBalloonMouseUp); // mouse left the balloon rect
balloon.addEventListener('mouseup', onBalloonMouseUp);

function onBalloonMouseDown() {
    if (inflateInterval || popped) return;

    clearInterval(shrinkInterval);
    shrinkInterval = null;
    inflateInterval = setInterval(() => {
        if (scale < maxScale) {
            if (scale > minExcited && boy_laugh.classList.contains("invisible")) {
                boy_smile.classList.add("invisible");
                boy_laugh.classList.remove("invisible");
            }
            scale += inflateRate;
            balloon.style.transform = `scale(${scale})`;
        } else {
            pop();
        }
    }, 10); // update every 50ms
}

function onBalloonMouseUp() {
    if (shrinkInterval || popped) return;

    clearInterval(inflateInterval);
    inflateInterval = null;
    shrinkInterval = setInterval(() => {
        
        if (scale > minScale) {
            if (scale < minExcited && boy_smile.classList.contains("invisible")) {
                boy_smile.classList.remove("invisible");
                boy_laugh.classList.add("invisible");
            }
            scale -= shrinkRate;
            balloon.style.transform = `scale(${scale})`;
        }
    }, 50); // update every 50ms
}