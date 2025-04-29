const balloon = document.querySelector(".balloon-svg");

let inflateInterval = null;
let shrinkInterval = setInterval(() => {
    if (balloon && balloon.style && scale > minScale) {
        scale -= shrinkRate;
        balloon.style.transform = `scale(${scale})`;
    }
}, 50); // update every 50ms

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
    if (inflateInterval) return;

    clearInterval(shrinkInterval);
    shrinkInterval = null;
    inflateInterval = setInterval(() => {
        if (balloon && balloon.style && scale < maxScale) {
            scale += inflateRate;
            balloon.style.transform = `scale(${scale})`;
        }
    }, 10); // update every 50ms
}

function onBalloonMouseUp() {
    if (shrinkInterval) return;

    clearInterval(inflateInterval);
    inflateInterval = null;
    shrinkInterval = setInterval(() => {
        if (balloon && balloon.style && scale > minScale) {
            scale -= shrinkRate;
            balloon.style.transform = `scale(${scale})`;
        }
    }, 50); // update every 50ms
}