function createSnow() {
    const snow = document.createElement("div");
    snow.innerHTML = "❄";
    snow.style.position = "fixed";
    snow.style.top = "-10px";
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.fontSize = Math.random() * 20 + 10 + "px";
    snow.style.color = "white";
    snow.style.opacity = Math.random();
    snow.style.pointerEvents = "none";
    snow.style.zIndex = "9999";

    document.body.appendChild(snow);

    const fall = setInterval(() => {
        snow.style.top = snow.offsetTop + 5 + "px";
        if (snow.offsetTop > window.innerHeight) {
            snow.remove();
            clearInterval(fall);
        }
    }, 30);
}

setInterval(createSnow, 200);