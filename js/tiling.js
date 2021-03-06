canvas = document.querySelector("canvas");
context = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const width = canvas.width;
const height = canvas.height;

var mode = "static";

// var unloadedImg = [];

function rand(top) {
  return Math.floor(Math.random() * top);
}

function drawRect(x, y, r, g, b, size) {
  context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  context.fillRect(x, y, size, size);
}

function drawCircle(x, y, r, g, b, size) {
  context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  context.beginPath();
  context.arc(x, y, size, 0, 2 * Math.PI);
  context.fill();
}

function weightRGB(r, g, b) {
  return r + b + g; //r * (1 / 3) + b * (1 / 3) + g * (1 / 3);
}

// Finds the Pokemon from the included JSON with the closest colors
function drawPokemon(x, y, r, g, b, size) {
  closest = [5000, 5000, 5000]; // Large value to start
  closestElement = "Error";
  for (key in pokemon) {
    if (
      weightRGB(
        Math.abs(r - pokemon[key][0]),
        Math.abs(g - pokemon[key][1]),
        Math.abs(b - pokemon[key][2])
      ) <
      weightRGB(
        Math.abs(r - closest[0]),
        Math.abs(g - closest[1]),
        Math.abs(b - closest[2])
      )
    ) {
      //console.log(closest);
      closest = [pokemon[key][0], pokemon[key][1], pokemon[key][2]];
      closestElement = key;
    }
  }
  if (closestElement == "Error" || closest[0] == 500) {
    return false;
  }

  img = new Image();
  let source = "pokemon/" + closestElement;

  img.onload = function() {
    img.src = source;
    context.drawImage(img, x, y, size, size); //Pokemon are 64x64
    // console.log("loaded " + img);
  };
  img.src = "pokemon/" + closestElement;

  return true;
}

// Finds the Pokemon from the included JSON with the closest colors
function drawEmoji(x, y, r, g, b, size) {
  closest = [5000, 5000, 5000]; // Large value to start
  closestElement = "Error";
  for (key in emojis) {
    if (
      weightRGB(
        Math.abs(r - emojis[key][0]),
        Math.abs(g - emojis[key][1]),
        Math.abs(b - emojis[key][2])
      ) <
      weightRGB(
        Math.abs(r - closest[0]),
        Math.abs(g - closest[1]),
        Math.abs(b - closest[2])
      )
    ) {
      //console.log(closest);
      closest = [emojis[key][0], emojis[key][1], emojis[key][2]];
      closestElement = key;
    }
  }
  if (closestElement == "Error" || closest[0] == 500) {
    return false;
  }

  img = new Image();
  let source = closestElement;

  img.onload = function() {
    img.src = source;
    context.drawImage(img, x, y, size, size); //Pokemon are 64x64
    // console.log("loaded " + img);
  };
  img.src = closestElement;

  return true;
}

var newWidth = rgbArray.length;
var newHeight = rgbArray[0].length;
var placementScale = height / newHeight;
var placementWidth = width / newWidth;
var horizontalScale = width / 2 - (newWidth * placementScale) / 2;
var pixelSize = 20;
var scale = 0.1;
var multiplier = 1;

var sliderSize = 32; //document.querySelector("#size");

function loop() {
  //sliderSize = document.querySelector("#size").value;
  let x = rand(newWidth);
  let y = rand(newHeight);
  let r = rgbArray[x][y][0];
  let g = rgbArray[x][y][1];
  let b = rgbArray[x][y][2];
  drawPokemon(
    x * placementScale + horizontalScale + rand(placementWidth),
    y * placementScale + rand(placementWidth),
    r,
    g,
    b,
    sliderSize
  );
  // drawCircle(
  //   x * placementScale + horizontalScale + rand(placementWidth),
  //   y * placementScale + rand(placementScale),
  //   r,
  //   g,
  //   b,
  //   rand(sliderSize)
  // );
  //pixelSize = pixelSize - scale;
  requestAnimationFrame(loop);
}

function paint() {
  for (let x = 0; x < newWidth; x++) {
    for (let y = 0; y < newHeight; y++) {
      let r = rgbArray[x][y][0];
      let g = rgbArray[x][y][1];
      let b = rgbArray[x][y][2];
      let success = false;
      drawEmoji(
        x * placementScale + horizontalScale + rand(placementWidth),
        y * placementScale + rand(placementWidth),
        r,
        g,
        b,
        sliderSize
      );
      // drawPokemon(
      //   x * placementScale + horizontalScale + rand(placementWidth),
      //   y * placementScale + rand(placementWidth),
      //   r,
      //   g,
      //   b,
      //   sliderSize
      // );
    }
  }
}

window.onload = async function() {
  if (canvas.getContext && mode == "loop") {
    setInterval(loop, 10000); //500
    loop();
  } else {
    // await new Promise(r => setTimeout(r, 2000));
    paint();
  }
};
