const balloon = document.querySelector(".balloon-svg");

let scale = 1;
const baseSize = 100;
const shrinkRate = 0.005;
const minScale = 0.2;

setInterval(() => {
    if (balloon && balloon.style && scale > minScale) {
        scale -= shrinkRate;
        balloon.style.width = `${baseSize*scale}px`;
        balloon.style.height = `${baseSize*scale}px`;
    }
}, 50); // update every 50ms