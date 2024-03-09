import { updateText, updateSky } from "../element/utils";
import { canvas } from "../element";
import { COORDINATES_PARAMS, intervalTime } from "../constants";
function getMoonX() {
  const moon = document.getElementById("moon");
  const moonLastX =
    parseFloat(
      parseFloat(moon.getAttribute(COORDINATES_PARAMS.X)).toFixed(2)
    ) || 0;
  return moonLastX;
}

function getSunX() {
  const sun = document.getElementById("sun");
  const sunLastX =
    parseFloat(parseFloat(sun.getAttribute(COORDINATES_PARAMS.X)).toFixed(2)) ||
    0;
  return sunLastX;
}

function getMoonY() {
  const moon = document.getElementById("moon");
  const moonLastX =
    parseFloat(
      parseFloat(moon.getAttribute(COORDINATES_PARAMS.Y)).toFixed(2)
    ) || 0;
  return moonLastX;
}

function getSunY() {
  const sun = document.getElementById("sun");
  const sunLastX =
    parseFloat(parseFloat(sun.getAttribute(COORDINATES_PARAMS.Y)).toFixed(2)) ||
    0;
  return sunLastX;
}

function getSunNewX(deltaX) {
  const sunLastX = getSunX();
  const outerSpaceX = 500;
  const tempNewSunX = sunLastX + deltaX;
  if (tempNewSunX > window.innerWidth + outerSpaceX) {
    return -outerSpaceX;
  }
  if (tempNewSunX < -outerSpaceX) {
    return window.innerWidth + outerSpaceX;
  }
  return tempNewSunX;
}
function getMoonNewX(deltaX) {
  const outerSpaceX = 500;

  const moonLastX = getMoonX();
  const tempNewMoonX = moonLastX + deltaX;
  if (tempNewMoonX > window.innerWidth + outerSpaceX) {
    return -outerSpaceX;
  }
  if (tempNewMoonX < -outerSpaceX) {
    return window.innerWidth + outerSpaceX;
  }
  return tempNewMoonX;
}

function updateHorizontalPositionOfSunAndMoon(deltaX = 0, deltaY = 0) {
  const moon = document.getElementById("moon");
  const sun = document.getElementById("sun");
  const moonLastY = getMoonY();
  const sunLastY = getSunY();
  const sunNewX = getSunNewX(deltaX);
  const moonNewX = getMoonNewX(deltaX);
  const moonNewY = moonLastY + deltaY;
  const sunNewY = sunLastY + deltaY;
  moon.style.transform = `translate(${moonNewX}px,${moonNewY}px)`;
  sun.style.transform = `translate(${sunNewX}px ,${sunNewY}px)`;
  moon.setAttribute(COORDINATES_PARAMS.X, moonNewX);
  sun.setAttribute(COORDINATES_PARAMS.X, sunNewX);
  moon.setAttribute(COORDINATES_PARAMS.Y, moonNewY);
  sun.setAttribute(COORDINATES_PARAMS.Y, sunNewY);
  updateSky(Math.abs(sunNewX / (window.innerWidth / 2)));
  updateText(sunNewX);
}

function updatePositionWithTime(x, y) {
  let t = 5; // (min for traverse)
  let totalTime = t * 60 * (1000 / intervalTime);
  let delta = screen.width / totalTime; // distance to move to go from left to right 't' time
  let newX = x + delta;
  let newY = y + delta;
  if (newX > canvas.width) {
    newX = newX % canvas.width;
  }
  if (newY > canvas.height) {
    newY = newY % canvas.height;
  }
  return { x: newX, y: newY };
}

export {
  updateHorizontalPositionOfSunAndMoon,
  updatePositionWithTime,
  getMoonNewX,
  getMoonX,
  getMoonY,
  getSunNewX,
  getSunX,
  getSunY,
};
