const balloon = document.querySelector(".balloon-svg");
const explosion = document.querySelector(".explosion-img");

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


balloon.addEventListener('mousedown', onBalloonMouseDown);
balloon.addEventListener('mouseleave', onBalloonMouseUp); // mouse left the balloon rect
balloon.addEventListener('mouseup', onBalloonMouseUp);

function onBalloonMouseDown() {
    if (inflateInterval || popped) return;

    clearInterval(shrinkInterval);
    shrinkInterval = null;
    inflateInterval = setInterval(() => {
        if (scale < maxScale) {
            scale += inflateRate;
            balloon.style.transform = `scale(${scale})`;
        } else {
            // Pop
            popped = true;
            balloon.classList.toggle("invisible");
            explosion.hidden = false;
            clearInterval(inflateInterval);
            inflateInterval = null;
        }
    }, 10); // update every 50ms
}

function onBalloonMouseUp() {
    if (shrinkInterval || popped) return;

    clearInterval(inflateInterval);
    inflateInterval = null;
    shrinkInterval = setInterval(() => {
        if (scale > minScale) {
            scale -= shrinkRate;
            balloon.style.transform = `scale(${scale})`;
        }
    }, 50); // update every 50ms
}