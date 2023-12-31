// DOM

const sizeEl = document.querySelector(".size .value");
const colorEls = document.querySelectorAll(".color");
const currentEl = document.querySelector(".current-color");
const decreaseSizeEl = document.querySelector(".decrease-size");
const increaseSizeEl = document.querySelector(".increase-size");
const eyeDropperEl = document.querySelector(".eye-dropper");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "red";
ctx.lineWidth = 10;
sizeEl.textContent += ctx.lineWidth;

const eyeDropper = new EyeDropper();

// STATE

const mouse = {
  x: undefined,
  y: undefined,
};

// FUNCTIONS

const clearScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
};

const drawCircle = () => {
  ctx.beginPath();
  ctx.arc(mouse.x + 4, mouse.y + 26, ctx.lineWidth, 0, 2 * Math.PI);
  ctx.fill();
};

// HANDLERS

const handleMouseDown = (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  drawCircle();
  canvas.addEventListener("mousemove", handleMouseMove);
};

const handleMouseMove = (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  drawCircle();
};

const handleMouseUp = () => {
  canvas.removeEventListener("mousemove", handleMouseMove);
};

const handleDecreaseSize = () => {
  ctx.lineWidth -= 5;
  sizeEl.textContent = ctx.lineWidth;
};

const handleIncreaseSize = () => {
  if (ctx.lineWidth < canvas.width) {
    ctx.lineWidth += 5;
    sizeEl.textContent = ctx.lineWidth;
  }
};

const handleEyeDropper = async () => {
  let open = await eyeDropper.open();
  COLOR_EYEDROPPER = await open.sRGBHex;
  console.log(COLOR_EYEDROPPER);

  ctx.fillStyle = COLOR_EYEDROPPER;
  currentEl.classList.toggle("spin");
  setTimeout(() => (currentEl.style.background = COLOR_EYEDROPPER), 200);
};

// INIT

const init = () => {
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);

  for (let colorEl of colorEls) {
    colorEl.addEventListener("click", () => {
      ctx.fillStyle = colorEl.classList[1];
      currentEl.classList.toggle("spin");
      setTimeout(
        () => (currentEl.style.background = colorEl.classList[1]),
        200
      );
    });
  }

  eyeDropperEl.addEventListener("click", handleEyeDropper);
  decreaseSizeEl.addEventListener("click", handleDecreaseSize);
  increaseSizeEl.addEventListener("click", handleIncreaseSize);

  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      clearScreen();
    } else if (e.key == "-") {
      handleDecreaseSize();
    } else if (e.key == "=") {
      handleIncreaseSize();
    }
  });
};

init();
