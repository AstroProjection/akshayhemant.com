import './styles.css';

const starArr = [];
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const intervalTime = 100;

function starFieldInit() {

  canvas.setAttribute('id', 'starfield');
  canvas.height = document.body.scrollHeight + document.body.scrollHeight / 12;
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
    context.fillStyle = 'rgb(255,255,255,0.8)';
    context.fill();
  }
  localStorage.setItem('starMap', JSON.stringify(starArr));
  document.addEventListener("scroll", moveField);
  document.addEventListener('resize', positionSun);

  /// update star brightness
  setInterval(brightnessRandomizer, intervalTime);
  positionSun();
}

function updatePositionWithTime(x, y) {
  let t = 5; // (min for traverse)
  let totalTime = t * 60 * (1000/intervalTime)
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

function brightnessRandomizer(){
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

function moveField() {
  let lastY = window.scrollY;
  const canvas = document.getElementById('starfield');
  const moon = document.getElementById('moon');
  const sun = document.getElementById('sun');
  moon.style.transform = `translate(0,-${lastY / 4}px)`;
  sun.style.transform = `translate(0,${lastY - lastY / 4}px)`;
}

function positionSun() {
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');
  const calcTop =
    parseInt(document.defaultView.getComputedStyle(moon, '')['top'] || 0) -
    sun.offsetParent.offsetTop;
  sun.style.top = calcTop + 'px';
}
window.onload = starFieldInit
