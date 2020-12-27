/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");


function starFieldInit() {
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'starfield');
  canvas.height = document.body.scrollHeight + document.body.scrollHeight / 12;
  canvas.width = screen.width;
  document.body.append(canvas);
  console.log('lol');
  var context = canvas.getContext('2d');
  var stars = 2000;
  var color = '#fff';
  var starArr = [];

  for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var radius = 1.1 * Math.random();
    starArr.push({
      radius: radius,
      x: x,
      y: y
    });
    context.beginPath();
    context.arc(x, y, radius, 0, 360);
    context.fillStyle = 'rgb(255,255,255,0.8)';
    context.fill();
  }

  localStorage.setItem('starMap', JSON.stringify(starArr));
  document.addEventListener('scroll', moveField);
}

function moveField(event) {
  var scrollHeight = window.scrollY;
  var canvas = document.getElementById('starfield');
  var moon = document.getElementById('moon');
  var sun = document.getElementById('sun');
  moon.style.transform = "translate(0,-".concat(scrollHeight / 4, "px)");
  sun.style.transform = "translate(0,".concat(scrollHeight - scrollHeight / 4, "px)");
  canvas.style.transform = "translate(0,-".concat(scrollHeight / 12, "px)");
}

function positionSun() {
  var sun = document.getElementById('sun');
  var moon = document.getElementById('moon');
  var calcTop = parseInt(moon.style.top || 0) - sun.offsetParent.offsetTop;
  var calcLeft = parseInt(moon.style.left || 0) - sun.offsetParent.offsetLeft;
  sun.style.top = calcTop + 'px';
  sun.style.left = calcLeft + 'px';
}

starFieldInit();
positionSun();
console.log('laoded starfield');

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{\r\n    --mainText:rgb(255, 255, 255);\r\n    --secondaryText:rgb(209, 173, 182);\r\n    --borderColor:#efefef;\r\n    /* --primaryBGColor:#666666; */\r\n    --primaryBGColor:transparent;\r\n    --bgPrimary:#111;\r\n    --secondaryBGColor:transparent;\r\n    --highlightedText:#a7f6c5;\r\n    --highlightedLogo:rgb(237, 253, 8);\r\n    --logoBGColor:#a5a5a5;\r\n    --linkColor:rgb(201, 84, 90);\r\n\r\n    --groundColor:#328D25;\r\n    --skyColor:skyblue;\r\n    --coreColor:#FE3C0C;\r\n    --mantleColor:#F6BE53;\r\n}\r\n*{\r\n    padding:0;\r\n    margin:0;\r\n    font-family:'Courier New', Courier, monospace;\r\n\r\n}\r\nhtml{\r\n    scroll-behavior: smooth;\r\n}\r\nh1,h2,h3,h4,h5,h6,strong{\r\n    color:var(--mainText);\r\n    /* font-family: 'Roboto', sans-serif; */\r\n}\r\n\r\np,li,span,label,input,textarea{\r\n    color:var(--secondaryText);\r\n    padding:0.3rem;\r\n    font-family:sans-serif;\r\n}\r\n\r\na{\r\n    text-decoration: none;\r\n    color:inherit;\r\n}\r\n\r\nbody{\r\n    background-color: var(--bgPrimary);\r\n    display:grid;\r\n    grid-template-areas:'nav nav'\r\n                        'header header'\r\n                        'about about'\r\n                        'projects projects'\r\n                        'footer footer';\r\n    position:relative;\r\n    grid-template-rows:100px 1fr 1fr 1fr 300px;\r\n    grid-template-columns: 1fr 1fr;\r\n}\r\nsection{\r\n    background-color: var(--primaryBGColor);\r\n}\r\n\r\n/* spacing */\r\n\r\n#header{\r\n    margin-top: 10em;\r\n    padding-top: 10em;\r\n    padding-bottom: 15em;\r\n    background-color: skyblue;\r\n    overflow:hidden;\r\n}\r\n/* about */\r\n\r\n#about::before{\r\n    position: absolute;\r\n    top:-0.2em;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    background-color: skyblue;\r\n    opacity: 0.84;\r\n    content:\" \";\r\n    z-index:-1;\r\n}\r\n\r\n\r\n.about{\r\n    background-color:var(--groundColor);\r\n    border-color:lightblue;\r\n\r\n}\r\n\r\n\r\n.about__info__container{\r\n    display:flex;\r\n    justify-content: center;\r\n    gap:30px;\r\n    height:100%;\r\n    width:100%;\r\n}\r\n\r\n.about__info__pic{\r\n    border:1px solid black;\r\n    width:100%;\r\n}\r\n\r\n.about__info__pic__img{\r\n    border:1px solid black;\r\n    height:300px;\r\n    width:300px;\r\n    margin:0 auto;\r\n    border-radius:50%;\r\n    overflow:hidden;\r\n}\r\n\r\n.about__info__pic__img img{\r\n    height:100%;\r\n}\r\n\r\n\r\n\r\n.about__info__pic__cap{\r\n    border:1px solid black;\r\n    height:calc(100% - 302px);\r\n}\r\n\r\n\r\n.about__info__bio{\r\n    border:1px solid black;\r\n    width:100%;\r\n\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n/* Projects */\r\n#projects::before{\r\n    position: absolute;\r\n    top:-0.2em;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    background-color: var(--groundColor);\r\n    box-shadow:10px 0 10px var(--groundColor);\r\n    content:\" \";\r\n    z-index:-1;\r\n}\r\n\r\n.projects{\r\n    position: relative;\r\n    background-color:var(--mantleColor);\r\n    border-color:brown;\r\n    box-shadow:0 -2px 5px brown, 0 -2px 10px sandybrown;\r\n    z-index: -1;\r\n}\r\n\r\n\r\n\r\n.projects__container{\r\n    height:100%;\r\n    width:100%;\r\n    justify-content: center;\r\n    gap:0.6em;\r\n}\r\n\r\n.projects__item{\r\n    width:60%;\r\n    height:300px;\r\n    border:3px solid brown;\r\n    display:grid;\r\n    grid-template-areas: 'img info';\r\n    grid-template-columns: 300px 1fr;\r\n}\r\n\r\n.projects__item__img i{\r\n    font-size: 100px;\r\n}\r\n\r\nprojects__item__info{\r\n    grid-area:info;\r\n}\r\n\r\n.projects__item:hover{\r\n    box-shadow: 0px 0px 10px whitesmoke;\r\n    transform:translate(0,-2px);\r\n    transition:transform 0.2s;\r\n    cursor:pointer;\r\n}\r\n\r\n\r\n\r\n.main-container{\r\n    height:100%;\r\n    width: 100%;\r\n    padding:2.5em 0.3em;\r\n    box-sizing: border-box;\r\n    margin:0 auto;\r\n    overflow:hidden;\r\n    position:relative;\r\n}\r\n\r\n.main-container h1{\r\n    text-align: center;\r\n    margin-bottom: 5em;\r\n}\r\n\r\n\r\n.border{\r\n    border-style: solid;\r\n    border-width: 0.2em;\r\n    border-bottom: none;\r\n    border-left: none;\r\n    border-right: none;\r\n}\r\n\r\n.border-sky{\r\n    border-top-left-radius: 67% 6%;\r\n    border-top-right-radius: 67% 6%;\r\n}\r\n\r\n.border-surface{\r\n    border-top-left-radius: 64% 14%;\r\n    border-top-right-radius: 64% 14%;\r\n}\r\n.border-mantle{\r\n    border-top-left-radius: 60% 14%;\r\n    border-top-right-radius: 60% 14%;\r\n}\r\n.border-core{\r\n    border-top-left-radius: 60% 100%;\r\n    border-top-right-radius: 60% 100%;\r\n}\r\n\r\n@media(min-width:2160px){\r\n    .border-sky{\r\n        border-top-left-radius: 67% 6%;\r\n        border-top-right-radius: 67% 6%;\r\n    }\r\n    \r\n    .border-surface{\r\n        border-top-left-radius: 64% 25%;\r\n        border-top-right-radius: 64% 25%;\r\n    }\r\n    .border-mantle{\r\n        border-top-left-radius: 60% 25%;\r\n        border-top-right-radius: 60% 25%;\r\n    }\r\n    .border-core{\r\n        border-top-left-radius: 40% 100%;\r\n        border-top-right-radius: 40% 100%;\r\n    }\r\n}\r\n\r\n@media(max-width:900px){\r\n    .border-sky{\r\n        border-top-left-radius: 67% 6%;\r\n        border-top-right-radius: 67% 6%;\r\n    }\r\n    \r\n    .border-surface{\r\n        border-top-left-radius: 70% 7%;\r\n        border-top-right-radius: 70% 7%;\r\n    }\r\n    .border-mantle{\r\n        border-top-left-radius: 75% 7%;\r\n        border-top-right-radius: 73% 7%;\r\n    }\r\n    .border-core{\r\n        border-top-left-radius: 75% 100%;\r\n    border-top-right-radius: 75% 100%;\r\n    }\r\n}\r\n\r\n\r\n.flex{\r\n    display:flex;\r\n}\r\n.flex-column{\r\n    flex-direction: column;\r\n}\r\n.flex-row{\r\n    flex-direction:row\r\n}\r\n\r\n.flex-centered{\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n#header{  \r\n    position:relative;\r\n    grid-area:header;\r\n\r\n    opacity:0.85;\r\n\r\n}\r\n\r\n#about{\r\n    position:relative;\r\n    grid-area:about;\r\n\r\n    transition:all 0.6s; \r\n}\r\n\r\n#projects{\r\n    position:relative;\r\n    grid-area:projects;\r\n    border-color:brown;\r\n\r\n    transition:all 0.6s; \r\n    \r\n}\r\n\r\n#footer{\r\n    z-index: 1;\r\n    position:relative;\r\n    grid-area:footer;\r\n    transition:all 0.6s; \r\n\r\n}\r\n\r\n#footer::before{\r\n    position: absolute;\r\n    top:-0.2em;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    background-color: var(--mantleColor);\r\n    content:\" \";\r\n    z-index:-1;\r\n    /* box-shadow:0 -1px 5px orangered,0 -1px 10px red,0 -4px 20px rgb(255, 101, 11); */\r\n}\r\n.footer{\r\n    background-color:rgba(255, 38, 0);\r\n    border-color:red;\r\n    position:relative;\r\n    box-shadow:0 -1px 5px orangered,0 -1px 10px red,0 -4px 20px rgb(255, 101, 11);\r\n}\r\n\r\n.footer__media{\r\n    gap:5em;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding-top:2em;\r\n}\r\n\r\n.footer__media__link{\r\n    color:darkred;\r\n    font-size:2em;\r\n    box-sizing: content-box;\r\n    height:50px;\r\n    width:50px;\r\n    background-color:orangered;\r\n    justify-content: center;\r\n    align-items: center;\r\n    border-radius:50%;\r\n\r\n    transition:all 0.4s;\r\n}\r\n\r\n.footer__media__link:hover{\r\n    background-color:rgb(231, 126, 126);\r\n    color:white;\r\n    transform:scale(1.2);\r\n    cursor:pointer;\r\n}\r\n\r\n\r\n#nav{\r\n    grid-area:nav;\r\n    display:flex;\r\n    justify-content: flex-end;\r\n    padding:1rem 0.5rem;\r\n    min-height:40px;\r\n\r\n    opacity:0.7;\r\n    transition:opacity 0.5s;\r\n\r\n    /* box-shadow:0px 1px 2px black;\r\n    -moz-box-shadow:0px 1px 2px black;\r\n    -webkit-box-shadow:0px 1px 2px black; */\r\n}\r\n\r\n#nav:hover{\r\n    opacity: 0.95;\r\n}\r\n\r\n.nav-list{\r\n    display:flex;\r\n    flex-direction: row-reverse;\r\n    list-style: none;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.nav-list li{\r\n    color:white;\r\n    font-family:'Courier New', Courier, monospace;\r\n}\r\n\r\n/* starfield */\r\n#starfield{\r\n    background-color:black;\r\n    opacity:0.9;\r\n    position: fixed;\r\n    z-index: -2;\r\n    width:100%;\r\n}\r\n\r\n/* ground */\r\n\r\n#ground{\r\n    width:100%;\r\n    height:100px;\r\n    background-color: rgb(95, 60, 60);\r\n    z-index: -1;\r\n    position:relative;\r\n}\r\n\r\n/* sun */\r\n#moon{\r\n    top:0;\r\n    left:0;\r\n    width: 10em;\r\n    height:10em;\r\n    min-width: 80px;\r\n    min-height: 80px;\r\n    max-height: 150px;\r\n    max-width: 150px;\r\n    background-color:rgb(202, 202, 202);\r\n    position: fixed;\r\n    z-index: -1;\r\n    border-radius: 50%;\r\n    animation: ray 2s infinite linear forwards,moonrays infinite 2s 2s linear forwards;\r\n    box-shadow:\r\n    0 0 0 rgba(202, 202, 202, 0.904),\r\n    0 0 0 10px rgba(202, 202, 202, 0.75),\r\n    0 0 0 20px rgba(202, 202, 202, 0.68),\r\n    0 0 0 30px rgba(202, 202, 202, 0.504),\r\n    0 0 0 40px rgba(202, 202, 202, 0.304),\r\n    0 0 0 50px rgba(202, 202, 202, 0.104);\r\n}\r\n#sun{\r\n    top:0;\r\n    left:0;\r\n    width: 10em;\r\n    height:10em;\r\n    min-width: 80px;\r\n    min-height: 80px;\r\n    max-height: 150px;\r\n    max-width: 150px;\r\n    background-color:rgb(255, 209, 5);\r\n    position: absolute;\r\n    z-index: -1;\r\n    border-radius: 50%;\r\n    animation: ray 2s infinite linear forwards,sunrays infinite 2s 2s linear forwards;\r\n    box-shadow:\r\n    0 0 0 rgba(255, 209, 5, 0.904),\r\n    0 0 0 10px rgba(255, 209, 5, 0.75),\r\n    0 0 0 20px rgba(255, 209, 5, 0.68),\r\n    0 0 0 30px rgba(255, 209, 5, 0.504),\r\n    0 0 0 40px rgba(255, 209, 5, 0.304),\r\n    0 0 0 50px rgba(255, 209, 5, 0.104);\r\n}\r\n\r\n@keyframes moonrays{\r\n    0%{\r\n        box-shadow:\r\n        0 0 0 rgba(202, 202, 202, 0.904),\r\n    0 0 0 10px rgba(202, 202, 202, 0.75),\r\n    0 0 0 20px rgba(202, 202, 202, 0.68),\r\n    0 0 0 30px rgba(202, 202, 202, 0.504),\r\n    0 0 0 40px rgba(202, 202, 202, 0.304),\r\n    0 0 0 50px rgba(202, 202, 202, 0.104);\r\n    }\r\n\r\n    100%{\r\n        box-shadow:\r\n    0 0 0 10px rgba(202, 202, 202, 0.904),\r\n    0 0 0 20px rgba(202, 202, 202, 0.75),\r\n    0 0 0 30px  rgba(202, 202, 202, 0.68),\r\n    0 0 0 40px rgba(202, 202, 202, 0.504),\r\n    0 0 0 50px rgba(202, 202, 202, 0.304),\r\n    0 0 20px 50px rgba(202, 202, 202, 0.104);\r\n    }\r\n}\r\n@keyframes sunrays{\r\n    0%{\r\n        box-shadow:\r\n        0 0 0 rgba(255, 209, 5, 0.904),\r\n    0 0 0 10px rgba(255, 209, 5, 0.75),\r\n    0 0 0 20px rgba(255, 209, 5, 0.68),\r\n    0 0 0 30px rgba(255, 209, 5, 0.504),\r\n    0 0 0 40px rgba(255, 209, 5, 0.304),\r\n    0 0 0 50px rgba(255, 209, 5, 0.104);\r\n    }\r\n\r\n    100%{\r\n        box-shadow:\r\n    0 0 0 10px rgba(255, 209, 5, 0.904),\r\n    0 0 0 20px rgba(255, 209, 5, 0.75),\r\n    0 0 0 30px  rgba(255, 209, 5, 0.68),\r\n    0 0 0 40px rgba(255, 209, 5, 0.504),\r\n    0 0 0 50px rgba(255, 209, 5, 0.304),\r\n    0 0 20px 50px rgba(255, 209, 5, 0.104);\r\n    }\r\n}\r\n\r\n@keyframes ray{\r\n    0%{\r\n        box-shadow: none;\r\n    }\r\n}\r\n\r\n\r\n\r\n/* Logo */\r\n\r\n.nav-logo{\r\n    border:2px solid black;\r\n    box-sizing: content-box;\r\n    display:flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width:40px;\r\n    min-height:40px;\r\n    width: 6vw;\r\n    height: 6vw;\r\n    border-radius:50%;\r\n    background-color:var(--logoBGColor);\r\n    transition:all cubic-bezier(0.2, 0.055, 0.03, 0.01) 0.2s;\r\n    transform-origin: center center;\r\n}\r\n\r\n.nav-logo:hover{\r\n    background-color:var(--highlightedLogo);\r\n    opacity:0.8;\r\n    cursor:pointer;\r\n    animation:pulsing 1s infinite;\r\n}\r\n\r\n@keyframes pulsing{\r\n    0%{\r\n        border-color: orange;\r\n    }\r\n    50%{\r\n        border-color: orangered;\r\n    }\r\n    100%{\r\n        border-color: orange;\r\n    }\r\n}\r\n\r\n\r\n@media only screen and (max-width:900px){\r\n    #moon{\r\n        width:5vw;\r\n        height:5vw;\r\n        top:2vw;\r\n        left:2vw;\r\n    }\r\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":[":root{\r\n    --mainText:rgb(255, 255, 255);\r\n    --secondaryText:rgb(209, 173, 182);\r\n    --borderColor:#efefef;\r\n    /* --primaryBGColor:#666666; */\r\n    --primaryBGColor:transparent;\r\n    --bgPrimary:#111;\r\n    --secondaryBGColor:transparent;\r\n    --highlightedText:#a7f6c5;\r\n    --highlightedLogo:rgb(237, 253, 8);\r\n    --logoBGColor:#a5a5a5;\r\n    --linkColor:rgb(201, 84, 90);\r\n\r\n    --groundColor:#328D25;\r\n    --skyColor:skyblue;\r\n    --coreColor:#FE3C0C;\r\n    --mantleColor:#F6BE53;\r\n}\r\n*{\r\n    padding:0;\r\n    margin:0;\r\n    font-family:'Courier New', Courier, monospace;\r\n\r\n}\r\nhtml{\r\n    scroll-behavior: smooth;\r\n}\r\nh1,h2,h3,h4,h5,h6,strong{\r\n    color:var(--mainText);\r\n    /* font-family: 'Roboto', sans-serif; */\r\n}\r\n\r\np,li,span,label,input,textarea{\r\n    color:var(--secondaryText);\r\n    padding:0.3rem;\r\n    font-family:sans-serif;\r\n}\r\n\r\na{\r\n    text-decoration: none;\r\n    color:inherit;\r\n}\r\n\r\nbody{\r\n    background-color: var(--bgPrimary);\r\n    display:grid;\r\n    grid-template-areas:'nav nav'\r\n                        'header header'\r\n                        'about about'\r\n                        'projects projects'\r\n                        'footer footer';\r\n    position:relative;\r\n    grid-template-rows:100px 1fr 1fr 1fr 300px;\r\n    grid-template-columns: 1fr 1fr;\r\n}\r\nsection{\r\n    background-color: var(--primaryBGColor);\r\n}\r\n\r\n/* spacing */\r\n\r\n#header{\r\n    margin-top: 10em;\r\n    padding-top: 10em;\r\n    padding-bottom: 15em;\r\n    background-color: skyblue;\r\n    overflow:hidden;\r\n}\r\n/* about */\r\n\r\n#about::before{\r\n    position: absolute;\r\n    top:-0.2em;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    background-color: skyblue;\r\n    opacity: 0.84;\r\n    content:\" \";\r\n    z-index:-1;\r\n}\r\n\r\n\r\n.about{\r\n    background-color:var(--groundColor);\r\n    border-color:lightblue;\r\n\r\n}\r\n\r\n\r\n.about__info__container{\r\n    display:flex;\r\n    justify-content: center;\r\n    gap:30px;\r\n    height:100%;\r\n    width:100%;\r\n}\r\n\r\n.about__info__pic{\r\n    border:1px solid black;\r\n    width:100%;\r\n}\r\n\r\n.about__info__pic__img{\r\n    border:1px solid black;\r\n    height:300px;\r\n    width:300px;\r\n    margin:0 auto;\r\n    border-radius:50%;\r\n    overflow:hidden;\r\n}\r\n\r\n.about__info__pic__img img{\r\n    height:100%;\r\n}\r\n\r\n\r\n\r\n.about__info__pic__cap{\r\n    border:1px solid black;\r\n    height:calc(100% - 302px);\r\n}\r\n\r\n\r\n.about__info__bio{\r\n    border:1px solid black;\r\n    width:100%;\r\n\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n/* Projects */\r\n#projects::before{\r\n    position: absolute;\r\n    top:-0.2em;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    background-color: var(--groundColor);\r\n    box-shadow:10px 0 10px var(--groundColor);\r\n    content:\" \";\r\n    z-index:-1;\r\n}\r\n\r\n.projects{\r\n    position: relative;\r\n    background-color:var(--mantleColor);\r\n    border-color:brown;\r\n    box-shadow:0 -2px 5px brown, 0 -2px 10px sandybrown;\r\n    z-index: -1;\r\n}\r\n\r\n\r\n\r\n.projects__container{\r\n    height:100%;\r\n    width:100%;\r\n    justify-content: center;\r\n    gap:0.6em;\r\n}\r\n\r\n.projects__item{\r\n    width:60%;\r\n    height:300px;\r\n    border:3px solid brown;\r\n    display:grid;\r\n    grid-template-areas: 'img info';\r\n    grid-template-columns: 300px 1fr;\r\n}\r\n\r\n.projects__item__img i{\r\n    font-size: 100px;\r\n}\r\n\r\nprojects__item__info{\r\n    grid-area:info;\r\n}\r\n\r\n.projects__item:hover{\r\n    box-shadow: 0px 0px 10px whitesmoke;\r\n    transform:translate(0,-2px);\r\n    transition:transform 0.2s;\r\n    cursor:pointer;\r\n}\r\n\r\n\r\n\r\n.main-container{\r\n    height:100%;\r\n    width: 100%;\r\n    padding:2.5em 0.3em;\r\n    box-sizing: border-box;\r\n    margin:0 auto;\r\n    overflow:hidden;\r\n    position:relative;\r\n}\r\n\r\n.main-container h1{\r\n    text-align: center;\r\n    margin-bottom: 5em;\r\n}\r\n\r\n\r\n.border{\r\n    border-style: solid;\r\n    border-width: 0.2em;\r\n    border-bottom: none;\r\n    border-left: none;\r\n    border-right: none;\r\n}\r\n\r\n.border-sky{\r\n    border-top-left-radius: 67% 6%;\r\n    border-top-right-radius: 67% 6%;\r\n}\r\n\r\n.border-surface{\r\n    border-top-left-radius: 64% 14%;\r\n    border-top-right-radius: 64% 14%;\r\n}\r\n.border-mantle{\r\n    border-top-left-radius: 60% 14%;\r\n    border-top-right-radius: 60% 14%;\r\n}\r\n.border-core{\r\n    border-top-left-radius: 60% 100%;\r\n    border-top-right-radius: 60% 100%;\r\n}\r\n\r\n@media(min-width:2160px){\r\n    .border-sky{\r\n        border-top-left-radius: 67% 6%;\r\n        border-top-right-radius: 67% 6%;\r\n    }\r\n    \r\n    .border-surface{\r\n        border-top-left-radius: 64% 25%;\r\n        border-top-right-radius: 64% 25%;\r\n    }\r\n    .border-mantle{\r\n        border-top-left-radius: 60% 25%;\r\n        border-top-right-radius: 60% 25%;\r\n    }\r\n    .border-core{\r\n        border-top-left-radius: 40% 100%;\r\n        border-top-right-radius: 40% 100%;\r\n    }\r\n}\r\n\r\n@media(max-width:900px){\r\n    .border-sky{\r\n        border-top-left-radius: 67% 6%;\r\n        border-top-right-radius: 67% 6%;\r\n    }\r\n    \r\n    .border-surface{\r\n        border-top-left-radius: 70% 7%;\r\n        border-top-right-radius: 70% 7%;\r\n    }\r\n    .border-mantle{\r\n        border-top-left-radius: 75% 7%;\r\n        border-top-right-radius: 73% 7%;\r\n    }\r\n    .border-core{\r\n        border-top-left-radius: 75% 100%;\r\n    border-top-right-radius: 75% 100%;\r\n    }\r\n}\r\n\r\n\r\n.flex{\r\n    display:flex;\r\n}\r\n.flex-column{\r\n    flex-direction: column;\r\n}\r\n.flex-row{\r\n    flex-direction:row\r\n}\r\n\r\n.flex-centered{\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n#header{  \r\n    position:relative;\r\n    grid-area:header;\r\n\r\n    opacity:0.85;\r\n\r\n}\r\n\r\n#about{\r\n    position:relative;\r\n    grid-area:about;\r\n\r\n    transition:all 0.6s; \r\n}\r\n\r\n#projects{\r\n    position:relative;\r\n    grid-area:projects;\r\n    border-color:brown;\r\n\r\n    transition:all 0.6s; \r\n    \r\n}\r\n\r\n#footer{\r\n    z-index: 1;\r\n    position:relative;\r\n    grid-area:footer;\r\n    transition:all 0.6s; \r\n\r\n}\r\n\r\n#footer::before{\r\n    position: absolute;\r\n    top:-0.2em;\r\n    left:0;\r\n    width:100%;\r\n    height:100%;\r\n    background-color: var(--mantleColor);\r\n    content:\" \";\r\n    z-index:-1;\r\n    /* box-shadow:0 -1px 5px orangered,0 -1px 10px red,0 -4px 20px rgb(255, 101, 11); */\r\n}\r\n.footer{\r\n    background-color:rgba(255, 38, 0);\r\n    border-color:red;\r\n    position:relative;\r\n    box-shadow:0 -1px 5px orangered,0 -1px 10px red,0 -4px 20px rgb(255, 101, 11);\r\n}\r\n\r\n.footer__media{\r\n    gap:5em;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding-top:2em;\r\n}\r\n\r\n.footer__media__link{\r\n    color:darkred;\r\n    font-size:2em;\r\n    box-sizing: content-box;\r\n    height:50px;\r\n    width:50px;\r\n    background-color:orangered;\r\n    justify-content: center;\r\n    align-items: center;\r\n    border-radius:50%;\r\n\r\n    transition:all 0.4s;\r\n}\r\n\r\n.footer__media__link:hover{\r\n    background-color:rgb(231, 126, 126);\r\n    color:white;\r\n    transform:scale(1.2);\r\n    cursor:pointer;\r\n}\r\n\r\n\r\n#nav{\r\n    grid-area:nav;\r\n    display:flex;\r\n    justify-content: flex-end;\r\n    padding:1rem 0.5rem;\r\n    min-height:40px;\r\n\r\n    opacity:0.7;\r\n    transition:opacity 0.5s;\r\n\r\n    /* box-shadow:0px 1px 2px black;\r\n    -moz-box-shadow:0px 1px 2px black;\r\n    -webkit-box-shadow:0px 1px 2px black; */\r\n}\r\n\r\n#nav:hover{\r\n    opacity: 0.95;\r\n}\r\n\r\n.nav-list{\r\n    display:flex;\r\n    flex-direction: row-reverse;\r\n    list-style: none;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.nav-list li{\r\n    color:white;\r\n    font-family:'Courier New', Courier, monospace;\r\n}\r\n\r\n/* starfield */\r\n#starfield{\r\n    background-color:black;\r\n    opacity:0.9;\r\n    position: fixed;\r\n    z-index: -2;\r\n    width:100%;\r\n}\r\n\r\n/* ground */\r\n\r\n#ground{\r\n    width:100%;\r\n    height:100px;\r\n    background-color: rgb(95, 60, 60);\r\n    z-index: -1;\r\n    position:relative;\r\n}\r\n\r\n/* sun */\r\n#moon{\r\n    top:0;\r\n    left:0;\r\n    width: 10em;\r\n    height:10em;\r\n    min-width: 80px;\r\n    min-height: 80px;\r\n    max-height: 150px;\r\n    max-width: 150px;\r\n    background-color:rgb(202, 202, 202);\r\n    position: fixed;\r\n    z-index: -1;\r\n    border-radius: 50%;\r\n    animation: ray 2s infinite linear forwards,moonrays infinite 2s 2s linear forwards;\r\n    box-shadow:\r\n    0 0 0 rgba(202, 202, 202, 0.904),\r\n    0 0 0 10px rgba(202, 202, 202, 0.75),\r\n    0 0 0 20px rgba(202, 202, 202, 0.68),\r\n    0 0 0 30px rgba(202, 202, 202, 0.504),\r\n    0 0 0 40px rgba(202, 202, 202, 0.304),\r\n    0 0 0 50px rgba(202, 202, 202, 0.104);\r\n}\r\n#sun{\r\n    top:0;\r\n    left:0;\r\n    width: 10em;\r\n    height:10em;\r\n    min-width: 80px;\r\n    min-height: 80px;\r\n    max-height: 150px;\r\n    max-width: 150px;\r\n    background-color:rgb(255, 209, 5);\r\n    position: absolute;\r\n    z-index: -1;\r\n    border-radius: 50%;\r\n    animation: ray 2s infinite linear forwards,sunrays infinite 2s 2s linear forwards;\r\n    box-shadow:\r\n    0 0 0 rgba(255, 209, 5, 0.904),\r\n    0 0 0 10px rgba(255, 209, 5, 0.75),\r\n    0 0 0 20px rgba(255, 209, 5, 0.68),\r\n    0 0 0 30px rgba(255, 209, 5, 0.504),\r\n    0 0 0 40px rgba(255, 209, 5, 0.304),\r\n    0 0 0 50px rgba(255, 209, 5, 0.104);\r\n}\r\n\r\n@keyframes moonrays{\r\n    0%{\r\n        box-shadow:\r\n        0 0 0 rgba(202, 202, 202, 0.904),\r\n    0 0 0 10px rgba(202, 202, 202, 0.75),\r\n    0 0 0 20px rgba(202, 202, 202, 0.68),\r\n    0 0 0 30px rgba(202, 202, 202, 0.504),\r\n    0 0 0 40px rgba(202, 202, 202, 0.304),\r\n    0 0 0 50px rgba(202, 202, 202, 0.104);\r\n    }\r\n\r\n    100%{\r\n        box-shadow:\r\n    0 0 0 10px rgba(202, 202, 202, 0.904),\r\n    0 0 0 20px rgba(202, 202, 202, 0.75),\r\n    0 0 0 30px  rgba(202, 202, 202, 0.68),\r\n    0 0 0 40px rgba(202, 202, 202, 0.504),\r\n    0 0 0 50px rgba(202, 202, 202, 0.304),\r\n    0 0 20px 50px rgba(202, 202, 202, 0.104);\r\n    }\r\n}\r\n@keyframes sunrays{\r\n    0%{\r\n        box-shadow:\r\n        0 0 0 rgba(255, 209, 5, 0.904),\r\n    0 0 0 10px rgba(255, 209, 5, 0.75),\r\n    0 0 0 20px rgba(255, 209, 5, 0.68),\r\n    0 0 0 30px rgba(255, 209, 5, 0.504),\r\n    0 0 0 40px rgba(255, 209, 5, 0.304),\r\n    0 0 0 50px rgba(255, 209, 5, 0.104);\r\n    }\r\n\r\n    100%{\r\n        box-shadow:\r\n    0 0 0 10px rgba(255, 209, 5, 0.904),\r\n    0 0 0 20px rgba(255, 209, 5, 0.75),\r\n    0 0 0 30px  rgba(255, 209, 5, 0.68),\r\n    0 0 0 40px rgba(255, 209, 5, 0.504),\r\n    0 0 0 50px rgba(255, 209, 5, 0.304),\r\n    0 0 20px 50px rgba(255, 209, 5, 0.104);\r\n    }\r\n}\r\n\r\n@keyframes ray{\r\n    0%{\r\n        box-shadow: none;\r\n    }\r\n}\r\n\r\n\r\n\r\n/* Logo */\r\n\r\n.nav-logo{\r\n    border:2px solid black;\r\n    box-sizing: content-box;\r\n    display:flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width:40px;\r\n    min-height:40px;\r\n    width: 6vw;\r\n    height: 6vw;\r\n    border-radius:50%;\r\n    background-color:var(--logoBGColor);\r\n    transition:all cubic-bezier(0.2, 0.055, 0.03, 0.01) 0.2s;\r\n    transform-origin: center center;\r\n}\r\n\r\n.nav-logo:hover{\r\n    background-color:var(--highlightedLogo);\r\n    opacity:0.8;\r\n    cursor:pointer;\r\n    animation:pulsing 1s infinite;\r\n}\r\n\r\n@keyframes pulsing{\r\n    0%{\r\n        border-color: orange;\r\n    }\r\n    50%{\r\n        border-color: orangered;\r\n    }\r\n    100%{\r\n        border-color: orange;\r\n    }\r\n}\r\n\r\n\r\n@media only screen and (max-width:900px){\r\n    #moon{\r\n        width:5vw;\r\n        height:5vw;\r\n        top:2vw;\r\n        left:2vw;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map