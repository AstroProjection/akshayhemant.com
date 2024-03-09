function updateText(newX) {
  const titles = document.querySelectorAll("#header .title");
  for (const element of titles) {
    addTextBlur(element, newX);
  }
}

function addTextBlur(element, newX) {
  const maxShadowX = 20;
  const maxBlur = 50;
  const minBlur = 5;
  element.style.textShadow = `${
    (maxShadowX * (window.innerWidth - newX)) / window.innerWidth
  }px ${
    (maxShadowX * (window.innerHeight - window.scrollY)) / window.innerHeight
  }px ${
    minBlur +
    maxBlur * (Math.abs(window.innerWidth / 2 - newX) / window.innerWidth / 2)
  }px black, 0 0 3px #919191`;
}

function updateSky(newX) {
  const finalX =
    newX * 100 > 100 ? 100 - (newX * 100 - 100) : (newX * 100) % 100;
  const header = document.getElementById("header");
  header.style.backgroundPosition = `${parseFloat(Math.abs(finalX)).toFixed(
    2
  )}%, ${parseFloat(50)}%`;
}

export { updateText, updateSky };
