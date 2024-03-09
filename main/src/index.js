import "./styles.css";
import {
  updateHorizontalPositionOfSunAndMoon,
  updatePositionWithTime,
} from "./utils/positioning";
import { sun, moon, canvas, context } from "./element";
import { COORDINATES_PARAMS, intervalTime } from "./constants";
const starArr = [];

function starFieldInit() {
  canvas.setAttribute("id", "starfield");
  canvas.height = document.body.scrollHeight + 500;
  canvas.width = screen.width;
  document.body.append(canvas);

  const stars = 5000;
  for (let i = 0; i < stars; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = 1.4 * Math.random();
    starArr.push({
      radius,
      x,
      y,
    });
    context.beginPath();
    context.arc(x, y, radius, 0, 360);
    context.fillStyle = "rgb(255,255,255,0.8)";
    context.fill();
  }
  document.addEventListener("wheel", moveSunAndMoon, {
    passive: false,
  });
  document.addEventListener("resize", positionSun);

  /// update star brightness
  setInterval(brightnessRandomizer, intervalTime);
  positionSun();
}

function brightnessRandomizer() {
  let height = document.body.scrollHeight + document.body.scrollHeight / 12;
  let width = screen.width;
  context.clearRect(0, 0, width, height);
  for (const starIdx in starArr) {
    const { x, y, radius } = starArr[starIdx];
    context.beginPath();
    const offset = 0.3;
    const newRadius =
      radius +
      radius *
        (Math.random() > 0.5
          ? offset * Math.random()
          : -offset * Math.random());
    const opacity = 0.8 + 0.1 * Math.random();
    const updatedPosition = updatePositionWithTime(x, y);
    context.arc(updatedPosition.x, updatedPosition.y, newRadius, 0, 360);
    starArr[starIdx] = {
      x: updatedPosition.x,
      y: updatedPosition.y,
      radius: radius,
    };
    context.fillStyle = `rgb(255,255,255,${opacity})`;
    context.fill();
  }
}

function handleWheelEvents(e) {
  const { deltaX, deltaY } = e;
  if (deltaX) {
    // Find better way to disable mac side swipe
    e.preventDefault();
  }
  updateHorizontalPositionOfSunAndMoon(-deltaX * 0.25, deltaY * 0.25);
  const lastY = window.scrollY;
  const moonY = -lastY / 4;
  const sunY = lastY - lastY / 4;
  moon.setAttribute(COORDINATES_PARAMS.Y, moonY);
  sun.setAttribute(COORDINATES_PARAMS.Y, sunY);
}

function moveSunAndMoon(e) {
  if (e) {
    handleWheelEvents(e);
  }
}

function positionSun() {
  const calcTop =
    parseInt(document.defaultView.getComputedStyle(moon, "")["top"] || 0) -
    sun.offsetParent.offsetTop;
  sun.style.top = calcTop + "px";
  const lastY = window.scrollY;
  const moonY = -lastY / 4;
  const sunY = lastY - lastY / 4;
  moon.setAttribute(COORDINATES_PARAMS.Y, moonY);
  sun.setAttribute(COORDINATES_PARAMS.Y, sunY);
  updateHorizontalPositionOfSunAndMoon(1, 0);
}

function initializeSceneUpdates() {
  setInterval(() => {
    updateHorizontalPositionOfSunAndMoon(1, 0);
  }, 100);
}

function explosionsInTheSky() {
  starFieldInit();
  moveSunAndMoon();
  initializeSceneUpdates();

  setTimeout(() => {
    let explosionMask = document.querySelector(".explosion");
    explosionMask.style.height = "0%";
  }, 100);
}

window.onload = explosionsInTheSky;
