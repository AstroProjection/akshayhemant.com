import './styles.css';

function starFieldInit() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'starfield');
  canvas.height = document.body.scrollHeight + document.body.scrollHeight / 12;
  canvas.width = screen.width;
  document.body.append(canvas);
  console.log('lol');

  const context = canvas.getContext('2d');
  const stars = 5000;
  const color = '#fff';
  const starArr = [];
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
  document.addEventListener('scroll', moveField);
  document.addEventListener('resize', positionSun);
}

function moveField(event) {
  const scrollHeight = window.scrollY;
  const canvas = document.getElementById('starfield');
  const moon = document.getElementById('moon');
  const sun = document.getElementById('sun');

  moon.style.transform = `translate(0,-${scrollHeight / 4}px)`;
  sun.style.transform = `translate(0,${scrollHeight - scrollHeight / 4}px)`;
  canvas.style.transform = `translate(0,-${scrollHeight / 12}px)`;
}

function positionSun() {
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');

  const calcTop =
    parseInt(document.defaultView.getComputedStyle(moon, '')['top'] || 0) -
    sun.offsetParent.offsetTop;
  const calcLeft =
    parseInt(document.defaultView.getComputedStyle(moon, '')['left'] || 0) -
    sun.offsetParent.offsetLeft;
  console.log(calcTop);
  console.log(calcLeft);
  sun.style.top = calcTop + 'px';
  // sun.style.left = calcLeft + 'px';
}
starFieldInit();
positionSun();

console.log('laoded starfield');
