/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COORDINATES_PARAMS": () => (/* binding */ COORDINATES_PARAMS),
/* harmony export */   "intervalTime": () => (/* binding */ intervalTime)
/* harmony export */ });
var COORDINATES_PARAMS = {
  Y: "data-Y",
  X: "data-X"
};
var intervalTime = 150;


/***/ }),

/***/ "./src/element/index.js":
/*!******************************!*\
  !*** ./src/element/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canvas": () => (/* binding */ canvas),
/* harmony export */   "context": () => (/* binding */ context),
/* harmony export */   "sun": () => (/* binding */ sun),
/* harmony export */   "moon": () => (/* binding */ moon)
/* harmony export */ });
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var sun = document.getElementById("sun");
var moon = document.getElementById("moon");


/***/ }),

/***/ "./src/element/utils.js":
/*!******************************!*\
  !*** ./src/element/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateText": () => (/* binding */ updateText),
/* harmony export */   "updateSky": () => (/* binding */ updateSky)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function updateText(newX) {
  var titles = document.querySelectorAll("#header .title");

  var _iterator = _createForOfIteratorHelper(titles),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      addTextBlur(element, newX);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function addTextBlur(element, newX) {
  var maxShadowX = 20;
  var maxBlur = 50;
  var minBlur = 5;
  element.style.textShadow = "".concat(maxShadowX * (window.innerWidth - newX) / window.innerWidth, "px ").concat(maxShadowX * (window.innerHeight - window.scrollY) / window.innerHeight, "px ").concat(minBlur + maxBlur * (Math.abs(window.innerWidth / 2 - newX) / window.innerWidth / 2), "px black, 0 0 3px #919191");
}

function updateSky(newX) {
  var finalX = newX * 100 > 100 ? 100 - (newX * 100 - 100) : newX * 100 % 100;
  var header = document.getElementById("header");
  header.style.backgroundPosition = "".concat(parseFloat(Math.abs(finalX)).toFixed(2), "%, ").concat(parseFloat(50), "%");
}



/***/ }),

/***/ "./src/utils/positioning.js":
/*!**********************************!*\
  !*** ./src/utils/positioning.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateHorizontalPositionOfSunAndMoon": () => (/* binding */ updateHorizontalPositionOfSunAndMoon),
/* harmony export */   "updatePositionWithTime": () => (/* binding */ updatePositionWithTime),
/* harmony export */   "getMoonNewX": () => (/* binding */ getMoonNewX),
/* harmony export */   "getMoonX": () => (/* binding */ getMoonX),
/* harmony export */   "getMoonY": () => (/* binding */ getMoonY),
/* harmony export */   "getSunNewX": () => (/* binding */ getSunNewX),
/* harmony export */   "getSunX": () => (/* binding */ getSunX),
/* harmony export */   "getSunY": () => (/* binding */ getSunY)
/* harmony export */ });
/* harmony import */ var _element_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element/utils */ "./src/element/utils.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../element */ "./src/element/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");




function getMoonX() {
  var moon = document.getElementById("moon");
  var moonLastX = parseFloat(parseFloat(moon.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.X)).toFixed(2)) || 0;
  return moonLastX;
}

function getSunX() {
  var sun = document.getElementById("sun");
  var sunLastX = parseFloat(parseFloat(sun.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.X)).toFixed(2)) || 0;
  return sunLastX;
}

function getMoonY() {
  var moon = document.getElementById("moon");
  var moonLastX = parseFloat(parseFloat(moon.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.Y)).toFixed(2)) || 0;
  return moonLastX;
}

function getSunY() {
  var sun = document.getElementById("sun");
  var sunLastX = parseFloat(parseFloat(sun.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.Y)).toFixed(2)) || 0;
  return sunLastX;
}

function getSunNewX(deltaX) {
  var sunLastX = getSunX();
  var outerSpaceX = 500;
  var tempNewSunX = sunLastX + deltaX;

  if (tempNewSunX > window.innerWidth + outerSpaceX) {
    return -outerSpaceX;
  }

  if (tempNewSunX < -outerSpaceX) {
    return window.innerWidth + outerSpaceX;
  }

  return tempNewSunX;
}

function getMoonNewX(deltaX) {
  var outerSpaceX = 500;
  var moonLastX = getMoonX();
  var tempNewMoonX = moonLastX + deltaX;

  if (tempNewMoonX > window.innerWidth + outerSpaceX) {
    return -outerSpaceX;
  }

  if (tempNewMoonX < -outerSpaceX) {
    return window.innerWidth + outerSpaceX;
  }

  return tempNewMoonX;
}

function updateHorizontalPositionOfSunAndMoon() {
  var deltaX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var deltaY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var moon = document.getElementById("moon");
  var sun = document.getElementById("sun");
  var moonLastY = getMoonY();
  var sunLastY = getSunY();
  var sunNewX = getSunNewX(deltaX);
  var moonNewX = getMoonNewX(deltaX);
  var moonNewY = moonLastY + deltaY;
  var sunNewY = sunLastY + deltaY;
  moon.style.transform = "translate(".concat(moonNewX, "px,").concat(moonNewY, "px)");
  sun.style.transform = "translate(".concat(sunNewX, "px ,").concat(sunNewY, "px)");
  moon.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.X, moonNewX);
  sun.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.X, sunNewX);
  moon.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.Y, moonNewY);
  sun.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.COORDINATES_PARAMS.Y, sunNewY);
  (0,_element_utils__WEBPACK_IMPORTED_MODULE_0__.updateSky)(Math.abs(sunNewX / (window.innerWidth / 2)));
  (0,_element_utils__WEBPACK_IMPORTED_MODULE_0__.updateText)(sunNewX);
}

function updatePositionWithTime(x, y) {
  var t = 5; // (min for traverse)

  var totalTime = t * 60 * (1000 / _constants__WEBPACK_IMPORTED_MODULE_2__.intervalTime);
  var delta = screen.width / totalTime; // distance to move to go from left to right 't' time

  var newX = x + delta;
  var newY = y + delta;

  if (newX > _element__WEBPACK_IMPORTED_MODULE_1__.canvas.width) {
    newX = newX % _element__WEBPACK_IMPORTED_MODULE_1__.canvas.width;
  }

  if (newY > _element__WEBPACK_IMPORTED_MODULE_1__.canvas.height) {
    newY = newY % _element__WEBPACK_IMPORTED_MODULE_1__.canvas.height;
  }

  return {
    x: newX,
    y: newY
  };
}



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{\n    --mainText:rgb(255, 255, 255);\n    --secondaryText:rgb(187, 48, 23);\n    --borderColor:#efefef;\n    --bgPrimary:#111;\n    --highlightedText:#a7f6c5;\n    --highlightedLogo:rgb(237, 253, 8);\n    --linkColor:rgb(201, 84, 90);\n    --groundColor:#328D25;\n    --skyColor:skyblue;\n    --coreColor:#FE3C0C;\n    --mantleColor:#F6BE53;\n}\n*{\n    padding:0;\n    margin:0;\n    font-family:'Courier New', Courier, monospace;\n    user-select: none;\n}\nhtml{\n    scroll-behavior: smooth;\n}\nh1,h2,h3,h4,h5,h6,strong{\n    color:var(--mainText);\n    /* background: linear-gradient(to-right, #62cff4, #2c67f2,  #23d5ab,#23a6d5, #e73c7e, #ee7752, #DD8267, #CB8D7B, #A8A3A3,#85B9CC,#74C4E0) */\n    /* font-family: 'Roboto', sans-serif; */\n}\n\np,li,label,input,textarea{\n    color:var(--secondaryText);\n    padding:0.3rem;\n}\n\na{\n    text-decoration: none;\n    color:inherit;\n}\n\nbody{\n    position: relative;\n}\n    \n#main-content {\n    z-index: 0;\n    height:100vh;\n    position: absolute;\n    display: grid;\n    grid-template-areas: 'nav'\n    'header'\n    'projects'\n    'about'\n    'footer';\n    position: relative;\n    grid-template-columns: 1fr;\n}\nsection{\n    background-color: var(--primaryBGColor);\n    box-sizing: border-box;\n}\n\nsection h1{\n    font-size:130%;\n    padding:0;\n    margin:0;\n}\n\nsection .title{\n    font-size:250%;\n}\n\nsection .content{\n    font-size:130%;\n}\n.death-screen{\n    display:none;\n    position:fixed;\n    width:100vw;\n    height:100vh;\n    z-index: 1000;\n    background-color: white;\n    font-size:200%;\n}\n\n.rocket {\n    transform: rotate(-45deg) scale(10);\n    position:absolute;\n    bottom: 10vh;\n    left: 50vw;\n    color:orange;\n}\n\n/* spacing */\n\n#header{\n    margin-top: 9rem;\n    padding-top: 10rem;\n    padding-bottom: 15rem;\n    background: linear-gradient(-45deg,#74C4E0, #85B9CC,#A8A3A3, #ee7752  , #e73c7e,#23a6d5 ,#23d5ab ,#2c67f2,#62cff4);\n    transition: background 0.5s;\n    background-size: 200% 400%;\n    overflow: hidden;\n}\n\n.header__links{\n    display:flex;\n    justify-content: space-evenly;\n    font-size:140%;\n}\n\n.header__links a{\n    font-weight:900;\n    color:white;\n    border-radius: 1rem;\n    border:1px solid brown;\n\n}\n.header__links a:hover{\n    color:lightgrey;\n    font-weight:600;\n    transform:translate(0,1px);\n    box-shadow: 0 1px 0 sandybrown,0 1px 5px black;\n}\n\n.header__links a:active{\n    transform:translate(0,2px);\n    box-shadow:0 0 0 sandybrown, 0 0 1px black;\n}\n\n/* about */\n\n.about{\n    background-color:#D0CD94;\n    border-color:brown;\n\n}\n\n\n.about__info__container{\n    display:flex;\n    justify-content: center;\n    height:100%;\n    width:100%;\n}\n\n.about__info__pic{\n    width:100%;\n    display:flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\n\n.about__info__pic__img{\n    height:300px;\n    width:300px;\n    margin:0 auto;\n    border-radius:50%;\n    overflow:hidden;\n}\n\n.about__info__pic__img img{\n    height:100%;\n}\n\n\n\n.about__info__pic__cap{\n    text-align: center;\n    border: 4px solid brown;\n    /* height: calc(100% - 302px); */\n    border-radius: 10px;\n    padding: 10px;\n    max-width: 30vw;\n    box-sizing: border-box;\n    background-color: #C4D3DE;\n}\n\n\n.about__info__bio{\n    width:100%;\n    justify-content: center;\n    align-items: center;\n}\n\n\n.about__skill-list{\n    background-color: lightgrey;\n    padding: 5em 2em;\n    border-radius: 1em;\n    border:3px solid brown;\n}\n/* Projects */\n.projects{\n    position: relative;\n    border-color:darkgreen;\n    z-index: -1;\n}\n\n\n\n.projects__container{\n    height:100%;\n    width:100%;\n    justify-content: center;\n    gap:0.6em;\n}\n\n.projects__item{\n    width:60%;\n    height:275px;\n    border:3px solid brown;\n    background-color:sandybrown;\n    display:grid;\n    grid-template-areas: 'img info';\n    grid-template-columns: 300px 1fr;\n}\n\n.project__title{\n    color: saddlebrown;\n}\n\n.projects__item__img{\n    grid-area:img;\n}\n\n.projects__item__img img{\n    width:100%;\n}\n\n.projects__item__img i{\n    font-size: 100px;\n}\n\n.projects__item__info{\n    grid-area:info;\n    align-items: flex-start;\n    justify-content: space-evenly;\n    padding:0.5em 0.3em;\n}\n\n.projects__item:hover{\n    box-shadow: 0px 0px 10px whitesmoke;\n    transform:translate(0,-2px);\n    transition:transform 0.2s;\n    cursor:pointer;\n}\n\n\n\n.main-container{\n    height:100%;\n    width: 100%;\n    padding: 3rem;\n    padding-top: 10rem;\n    padding-bottom: 15rem;\n    box-sizing: border-box;\n    margin:0 auto;\n    overflow:hidden;\n    position:relative;\n}\n\n.main-container h1{\n    text-align: center;\n    margin-bottom: 8vw;\n}\n\n\n\n\n.border{\n    border-width: 0.2em;\n    border-bottom: none;\n    border-left: none;\n    border-right: none;\n}\n\n.border-sky{\n    border-top-left-radius: 77% 35%;\n    border-top-right-radius: 77% 35%;\n}\n\n.border-surface{\n    border-top-left-radius: 80% 10%;\n    border-top-right-radius: 80% 10%;\n}\n.border-mantle{\n    border-top-left-radius: 60% 14%;\n    border-top-right-radius: 60% 14%;\n}\n.border-core{\n    border-top-left-radius: 60% 100%;\n    border-top-right-radius: 60% 100%;\n}\n\n/* media  */\n\n\n@media(min-width:2160px){\n    \n    .border-sky{\n        border-top-left-radius: 67% 6%;\n        border-top-right-radius: 67% 6%;\n    }\n    \n    .border-surface{\n        border-top-left-radius: 64% 25%;\n        border-top-right-radius: 64% 25%;\n    }\n    .border-mantle{\n        border-top-left-radius: 60% 25%;\n        border-top-right-radius: 60% 25%;\n    }\n    .border-core{\n        border-top-left-radius: 40% 100%;\n        border-top-right-radius: 40% 100%;\n    }\n\n    section .title{\n        font-size:250%;\n    }\n\n    section .content{\n        font-size:150%;\n    }\n    .header__links a{\n        font-size:130%;\n        padding:0.4em 0.3em;\n    }\n}\n@media(max-width:2160px){\n    h1,h2,h3,h4,h5,h6{\n        font-size:130%;\n    }\n\n    section .title{\n        font-size:200%;\n    }\n\n    section .content{\n        font-size:120%;\n    }\n\n    .header__links a{\n        font-size:120%;\n        padding:0.4em 0.3em;\n    }\n\n}\n@media(max-width:900px){\n    .border-sky{\n        border-top-left-radius: 67% 6%;\n        border-top-right-radius: 67% 6%;\n    }\n    \n    .border-surface{\n        border-top-left-radius: 70% 7%;\n        border-top-right-radius: 70% 7%;\n    }\n    .border-mantle{\n        border-top-left-radius: 75% 7%;\n        border-top-right-radius: 73% 7%;\n    }\n    .border-core{\n        border-top-left-radius: 75% 100%;\n    border-top-right-radius: 75% 100%;\n    }\n\n    .footer{\n        justify-content: flex-end;\n    }\n\n    .about__info__container{\n        flex-direction: column;\n    }\n\n    .about__info__pic__cap{\n        max-width: 80%;\n    }\n\n    .projects__item{\n        grid-template-areas: 'img img'\n                              'info info';\n        width:100%;\n        height:fit-content;\n    }\n\n    section .title{\n        font-size:150%;\n    }\n\n    section .content{\n        font-size:100%;\n    }\n\n    #moon,#sun{\n        width:5vw;\n        height:5vw;\n    }\n    .main-container {\n        padding-top:4rem;\n    }\n    #footer .main-container {\n        padding-top: 2rem;\n        padding-bottom: 5rem;\n    }\n    #main-container {\n        grid-template-rows: repeat(4, 1fr) 10rem;\n    }\n}\n\n@media (max-width:350px){\n    .death-screen{\n        display:block;\n    }\n}\n\n/* media end */\n.flex{\n    display:flex;\n}\n.flex-column{\n    flex-direction: column;\n}\n.flex-row{\n    flex-direction:row;\n}\n\n.flex-centered{\n    justify-content: center;\n    align-items: center;\n}\n#header{  \n    position:relative;\n    grid-area:header;\n    height:60rem;\n    opacity:0.9;\n    box-shadow: 0 0 10px  #62cff4, 0 0 20px #2c67f2 ;\n}\n#header .title {\n    transition: text-shadow 0.2s;\n}\n#header .title:hover {\n    text-shadow: 0 5px 5px #111;\n}\n\n#header .title span {\n    transition: font-weight 0.2s, font-size 0.2s;\n}\n\n#header .title .fe:hover {\n    font-weight: 300;\n    font-size: 50px;\n}\n#header .title .fs:hover {\n    font-weight: 900;\n    font-size: 50px;\n    text-transform: uppercase;\n}\n\n#about{\n    position:relative;\n    grid-area:about;\n    transition:all 0.6s; \n    top: -20rem;\n    z-index: 3;\n}\n\n#projects{\n    position:relative;\n    grid-area:projects;\n    border-color:brown;\n    background: linear-gradient(-45deg, #3C787E, #2c7744);\n    box-shadow: 0 -2px 10px #2c7744, 0 -2px 2px black;\n    transition:all 0.6s; \n    top: -10rem;\n    box-sizing: border-box;\n    height: 80rem;\n    z-index: 2;\n}\n\n#footer{\n    z-index: 4;\n    position:relative;\n    grid-area:footer;\n    transition:all 0.6s; \n    top: -30rem;\n\n}\n\n#footer::before{\n    position: absolute;\n    left:0;\n    width:100%;\n    height:100%;\n    background-color: #D0CD94;\n    content:\" \";\n    z-index:-1;\n}\n.footer{\n    /* background-color:rgba(255, 38, 0); */\n    background: radial-gradient(red, brown);\n    background-position: 50% 70%;\n    background-size: 100% 100%;\n    animation: backAndForth infinite 5s;\n    position:relative;\n    box-shadow:0 -1px 5px orangered,0 -1px 10px red,0 -4px 20px rgb(255, 101, 11);\n}\n\n.astroid {\n    height:30px;\n    width:30px;\n    border-radius:50%;\n    position: absolute;\n    z-index: 10;\n    top: 0;\n    left: 0;\n    background: radial-gradient(brown, red);\n    transition: transform 0.3s, ease-in;\n}\n\n@keyframes backAndForth {\n    0% {\n        background-size: 40% 70%;\n    }\n    50% {\n        background-size: 100% 80%;\n    }\n    100% {\n        background-size: 40% 70%;\n    }\n}\n\n.footer__media{\n    gap:5em;\n    justify-content: center;\n    align-items: center;\n    padding-top:2em;\n}\n\n.footer__media__link{\n    color:darkred;\n    font-size:2em;\n    box-sizing: content-box;\n    height:2em;\n    width:2em;\n    background-color:orangered;\n    justify-content: center;\n    align-items: center;\n    border-radius:50%;\n\n    transition:all 0.4s;\n}\n\n.footer__media__link:hover{\n    background-color:rgb(231, 126, 126);\n    color:white;\n    transform:scale(1.2);\n    cursor:pointer;\n}\n\n.top-button{\n    background-color:brown;\n    height:10vw;\n    width:10vw;\n    max-height:60px;\n    max-width:60px;\n    border-radius:50%;\n}\n\n\n#nav{\n    grid-area:nav;\n    display:flex;\n    justify-content: flex-end;\n    padding:1rem 0.5rem;\n    min-height:40px;\n\n    opacity:0.7;\n    transition:opacity 0.5s;\n\n    /* box-shadow:0px 1px 2px black;\n    -moz-box-shadow:0px 1px 2px black;\n    -webkit-box-shadow:0px 1px 2px black; */\n}\n\n.nav-list{\n    display:flex;\n    flex-direction: row-reverse;\n    list-style: none;\n    justify-content: center;\n    align-items: center;\n    padding-right:5em;\n}\n\n.nav-list li{\n    color:white;\n    font-family:'Courier New', Courier, monospace;\n    font-size:130%;\n    font-weight:800;\n}\n\n.nav-list>li a:hover{\n    color:greenyellow;\n}\n/* Explosion */\n.explosion{\n    background-color: black;\n    height:100vh;\n    width:100vw;\n    transform-origin: center center;\n    transition:1s all;\n    position: fixed;\n    z-index: 1000;\n}\n\n/* starfield */\n#starfield{\n    background-color:black;\n    opacity:0.9;\n    position: fixed;\n    top:0;\n    z-index: -2;\n    width:100%;\n}\n\n/* ground */\n\n#ground{\n    width:100%;\n    height:100px;\n    background-color: rgb(95, 60, 60);\n    z-index: -1;\n    position:relative;\n}\n\n/* sun */\n#moon{\n    top:2em;\n    left:2em;\n    width: 10em;\n    height:10em;\n    min-width: 80px;\n    min-height: 80px;\n    max-height: 150px;\n    max-width: 150px;\n    background-color:rgb(202, 202, 202);\n    position: fixed;\n    z-index: -1;\n    border-radius: 50%;\n    animation: ray 2s infinite linear forwards,moonrays infinite 2s 2s linear forwards;\n    box-shadow:\n    0 0 0 rgba(202, 202, 202, 0.904),\n    0 0 0 5px rgba(202, 202, 202, 0.75),\n    0 0 0 10px rgba(202, 202, 202, 0.75),\n    0 0 0 15px rgba(202, 202, 202, 0.75),\n    0 0 0 20px rgba(202, 202, 202, 0.68),\n    0 0 0 25px rgba(202, 202, 202, 0.68),\n    0 0 0 30px rgba(202, 202, 202, 0.504),\n    0 0 0 35px rgba(202, 202, 202, 0.504),\n    0 0 0 40px rgba(202, 202, 202, 0.304),\n    0 0 0 45px rgba(202, 202, 202, 0.304),\n    0 0 0 50px rgba(202, 202, 202, 0.104);\n}\n#sun{\n    top:2em;\n    left:2em;\n    width: 10rem;\n    height:10rem;\n    min-width: 80px;\n    min-height: 80px;\n    max-height: 150px;\n    max-width: 150px;\n    background-color:rgb(255, 209, 5);\n    position: absolute;\n    z-index: -1;\n    border-radius: 50%;\n    animation: ray 2s infinite linear forwards,sunrays infinite 2s 2s linear forwards;\n    box-shadow:\n    0 0 0 rgba(255, 209, 5, 0.904),\n    0 0 0 10px rgba(255, 209, 5, 0.75),\n    0 0 0 20px rgba(255, 209, 5, 0.68),\n    0 0 0 30px rgba(255, 209, 5, 0.504),\n    0 0 0 40px rgba(255, 209, 5, 0.304),\n    0 0 0 50px rgba(255, 209, 5, 0.104);\n}\n\n\n@keyframes moonrays{\n    0%{\n        box-shadow:\n        0 0 0 rgba(202, 202, 202, 0.904),\n        0 0 0 5px rgba(202, 202, 202, 0.75),\n        0 0 0 10px rgba(202, 202, 202, 0.75),\n        0 0 0 15px rgba(202, 202, 202, 0.75),\n        0 0 0 20px rgba(202, 202, 202, 0.68),\n        0 0 0 25px rgba(202, 202, 202, 0.68),\n        0 0 0 30px rgba(202, 202, 202, 0.504),\n        0 0 0 35px rgba(202, 202, 202, 0.504),\n        0 0 0 40px rgba(202, 202, 202, 0.304),\n        0 0 0 45px rgba(202, 202, 202, 0.304),\n        0 0 0 50px rgba(202, 202, 202, 0.104);\n    }\n\n    100%{\n        box-shadow:\n        0 0 0 rgba(202, 202, 202, 0.904),\n        0 0 0 10px rgba(202, 202, 202, 0.75),\n        0 0 0 15px rgba(202, 202, 202, 0.75),\n        0 0 0 20px rgba(202, 202, 202, 0.68),\n        0 0 0 25px rgba(202, 202, 202, 0.68),\n        0 0 0 30px rgba(202, 202, 202, 0.504),\n        0 0 0 35px rgba(202, 202, 202, 0.504),\n        0 0 0 40px rgba(202, 202, 202, 0.304),\n        0 0 0 45px rgba(202, 202, 202, 0.304),\n        0 0 0 50px rgba(202, 202, 202, 0.104),\n        0 0 0 55px rgba(202, 202, 202, 0.104);\n    }\n}\n@keyframes sunrays{\n    0%{\n        box-shadow:\n        0 0 0 rgba(255, 209, 5, 0.904),\n        0 0 0 10px rgba(255, 209, 5, 0.75),\n        0 0 0 15px rgba(255, 209, 5, 0.75),\n        0 0 0 20px rgba(255, 209, 5, 0.68),\n        0 0 0 25px rgba(255, 209, 5, 0.68),\n        0 0 0 30px rgba(255, 209, 5, 0.504),\n        0 0 0 35px rgba(255, 209, 5, 0.504),\n        0 0 0 40px rgba(255, 209, 5, 0.304),\n        0 0 0 45px rgba(255, 209, 5, 0.304),\n        0 0 0 50px rgba(255, 209, 5, 0.104);\n    }\n\n    100%{\n        box-shadow:\n        0 0 0 rgba(255, 209, 5, 0.904),\n        0 0 0 15px rgba(255, 209, 5, 0.75),\n        0 0 0 20px rgba(255, 209, 5, 0.68),\n        0 0 0 25px rgba(255, 209, 5, 0.68),\n        0 0 0 30px rgba(255, 209, 5, 0.504),\n        0 0 0 35px rgba(255, 209, 5, 0.504),\n        0 0 0 40px rgba(255, 209, 5, 0.304),\n        0 0 0 45px rgba(255, 209, 5, 0.304),\n        0 0 0 50px rgba(255, 209, 5, 0.104),\n        0 0 0 55px rgba(255, 209, 5, 0.104);\n    }\n}\n\n@keyframes ray{\n    0%{\n        box-shadow: none;\n    }\n}\n\n@keyframes blink {\n    0% {\n        color: white;\n    }\n\n    50% {\n        color: black;\n    }\n\n    100% {\n        color: white;\n    }\n}\n\n\n/* Logo */\n\n.nav-logo{\n    border:2px solid black;\n    box-sizing: content-box;\n    display:flex;\n    align-items: center;\n    justify-content: center;\n    min-width:40px;\n    min-height:40px;\n    width: 6vw;\n    height: 6vw;\n    border-radius:50%;\n    background-color:var(--logoBGColor);\n    transition:all cubic-bezier(0.2, 0.055, 0.03, 0.01) 0.2s;\n    transform-origin: center center;\n}\n\n@keyframes pulsing{\n    0%{\n        border-color: orange;\n    }\n    50%{\n        border-color: orangered;\n    }\n    100%{\n        border-color: orange;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":[":root{\n    --mainText:rgb(255, 255, 255);\n    --secondaryText:rgb(187, 48, 23);\n    --borderColor:#efefef;\n    --bgPrimary:#111;\n    --highlightedText:#a7f6c5;\n    --highlightedLogo:rgb(237, 253, 8);\n    --linkColor:rgb(201, 84, 90);\n    --groundColor:#328D25;\n    --skyColor:skyblue;\n    --coreColor:#FE3C0C;\n    --mantleColor:#F6BE53;\n}\n*{\n    padding:0;\n    margin:0;\n    font-family:'Courier New', Courier, monospace;\n    user-select: none;\n}\nhtml{\n    scroll-behavior: smooth;\n}\nh1,h2,h3,h4,h5,h6,strong{\n    color:var(--mainText);\n    /* background: linear-gradient(to-right, #62cff4, #2c67f2,  #23d5ab,#23a6d5, #e73c7e, #ee7752, #DD8267, #CB8D7B, #A8A3A3,#85B9CC,#74C4E0) */\n    /* font-family: 'Roboto', sans-serif; */\n}\n\np,li,label,input,textarea{\n    color:var(--secondaryText);\n    padding:0.3rem;\n}\n\na{\n    text-decoration: none;\n    color:inherit;\n}\n\nbody{\n    position: relative;\n}\n    \n#main-content {\n    z-index: 0;\n    height:100vh;\n    position: absolute;\n    display: grid;\n    grid-template-areas: 'nav'\n    'header'\n    'projects'\n    'about'\n    'footer';\n    position: relative;\n    grid-template-columns: 1fr;\n}\nsection{\n    background-color: var(--primaryBGColor);\n    box-sizing: border-box;\n}\n\nsection h1{\n    font-size:130%;\n    padding:0;\n    margin:0;\n}\n\nsection .title{\n    font-size:250%;\n}\n\nsection .content{\n    font-size:130%;\n}\n.death-screen{\n    display:none;\n    position:fixed;\n    width:100vw;\n    height:100vh;\n    z-index: 1000;\n    background-color: white;\n    font-size:200%;\n}\n\n.rocket {\n    transform: rotate(-45deg) scale(10);\n    position:absolute;\n    bottom: 10vh;\n    left: 50vw;\n    color:orange;\n}\n\n/* spacing */\n\n#header{\n    margin-top: 9rem;\n    padding-top: 10rem;\n    padding-bottom: 15rem;\n    background: linear-gradient(-45deg,#74C4E0, #85B9CC,#A8A3A3, #ee7752  , #e73c7e,#23a6d5 ,#23d5ab ,#2c67f2,#62cff4);\n    transition: background 0.5s;\n    background-size: 200% 400%;\n    overflow: hidden;\n}\n\n.header__links{\n    display:flex;\n    justify-content: space-evenly;\n    font-size:140%;\n}\n\n.header__links a{\n    font-weight:900;\n    color:white;\n    border-radius: 1rem;\n    border:1px solid brown;\n\n}\n.header__links a:hover{\n    color:lightgrey;\n    font-weight:600;\n    transform:translate(0,1px);\n    box-shadow: 0 1px 0 sandybrown,0 1px 5px black;\n}\n\n.header__links a:active{\n    transform:translate(0,2px);\n    box-shadow:0 0 0 sandybrown, 0 0 1px black;\n}\n\n/* about */\n\n.about{\n    background-color:#D0CD94;\n    border-color:brown;\n\n}\n\n\n.about__info__container{\n    display:flex;\n    justify-content: center;\n    height:100%;\n    width:100%;\n}\n\n.about__info__pic{\n    width:100%;\n    display:flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\n\n.about__info__pic__img{\n    height:300px;\n    width:300px;\n    margin:0 auto;\n    border-radius:50%;\n    overflow:hidden;\n}\n\n.about__info__pic__img img{\n    height:100%;\n}\n\n\n\n.about__info__pic__cap{\n    text-align: center;\n    border: 4px solid brown;\n    /* height: calc(100% - 302px); */\n    border-radius: 10px;\n    padding: 10px;\n    max-width: 30vw;\n    box-sizing: border-box;\n    background-color: #C4D3DE;\n}\n\n\n.about__info__bio{\n    width:100%;\n    justify-content: center;\n    align-items: center;\n}\n\n\n.about__skill-list{\n    background-color: lightgrey;\n    padding: 5em 2em;\n    border-radius: 1em;\n    border:3px solid brown;\n}\n/* Projects */\n.projects{\n    position: relative;\n    border-color:darkgreen;\n    z-index: -1;\n}\n\n\n\n.projects__container{\n    height:100%;\n    width:100%;\n    justify-content: center;\n    gap:0.6em;\n}\n\n.projects__item{\n    width:60%;\n    height:275px;\n    border:3px solid brown;\n    background-color:sandybrown;\n    display:grid;\n    grid-template-areas: 'img info';\n    grid-template-columns: 300px 1fr;\n}\n\n.project__title{\n    color: saddlebrown;\n}\n\n.projects__item__img{\n    grid-area:img;\n}\n\n.projects__item__img img{\n    width:100%;\n}\n\n.projects__item__img i{\n    font-size: 100px;\n}\n\n.projects__item__info{\n    grid-area:info;\n    align-items: flex-start;\n    justify-content: space-evenly;\n    padding:0.5em 0.3em;\n}\n\n.projects__item:hover{\n    box-shadow: 0px 0px 10px whitesmoke;\n    transform:translate(0,-2px);\n    transition:transform 0.2s;\n    cursor:pointer;\n}\n\n\n\n.main-container{\n    height:100%;\n    width: 100%;\n    padding: 3rem;\n    padding-top: 10rem;\n    padding-bottom: 15rem;\n    box-sizing: border-box;\n    margin:0 auto;\n    overflow:hidden;\n    position:relative;\n}\n\n.main-container h1{\n    text-align: center;\n    margin-bottom: 8vw;\n}\n\n\n\n\n.border{\n    border-width: 0.2em;\n    border-bottom: none;\n    border-left: none;\n    border-right: none;\n}\n\n.border-sky{\n    border-top-left-radius: 77% 35%;\n    border-top-right-radius: 77% 35%;\n}\n\n.border-surface{\n    border-top-left-radius: 80% 10%;\n    border-top-right-radius: 80% 10%;\n}\n.border-mantle{\n    border-top-left-radius: 60% 14%;\n    border-top-right-radius: 60% 14%;\n}\n.border-core{\n    border-top-left-radius: 60% 100%;\n    border-top-right-radius: 60% 100%;\n}\n\n/* media  */\n\n\n@media(min-width:2160px){\n    \n    .border-sky{\n        border-top-left-radius: 67% 6%;\n        border-top-right-radius: 67% 6%;\n    }\n    \n    .border-surface{\n        border-top-left-radius: 64% 25%;\n        border-top-right-radius: 64% 25%;\n    }\n    .border-mantle{\n        border-top-left-radius: 60% 25%;\n        border-top-right-radius: 60% 25%;\n    }\n    .border-core{\n        border-top-left-radius: 40% 100%;\n        border-top-right-radius: 40% 100%;\n    }\n\n    section .title{\n        font-size:250%;\n    }\n\n    section .content{\n        font-size:150%;\n    }\n    .header__links a{\n        font-size:130%;\n        padding:0.4em 0.3em;\n    }\n}\n@media(max-width:2160px){\n    h1,h2,h3,h4,h5,h6{\n        font-size:130%;\n    }\n\n    section .title{\n        font-size:200%;\n    }\n\n    section .content{\n        font-size:120%;\n    }\n\n    .header__links a{\n        font-size:120%;\n        padding:0.4em 0.3em;\n    }\n\n}\n@media(max-width:900px){\n    .border-sky{\n        border-top-left-radius: 67% 6%;\n        border-top-right-radius: 67% 6%;\n    }\n    \n    .border-surface{\n        border-top-left-radius: 70% 7%;\n        border-top-right-radius: 70% 7%;\n    }\n    .border-mantle{\n        border-top-left-radius: 75% 7%;\n        border-top-right-radius: 73% 7%;\n    }\n    .border-core{\n        border-top-left-radius: 75% 100%;\n    border-top-right-radius: 75% 100%;\n    }\n\n    .footer{\n        justify-content: flex-end;\n    }\n\n    .about__info__container{\n        flex-direction: column;\n    }\n\n    .about__info__pic__cap{\n        max-width: 80%;\n    }\n\n    .projects__item{\n        grid-template-areas: 'img img'\n                              'info info';\n        width:100%;\n        height:fit-content;\n    }\n\n    section .title{\n        font-size:150%;\n    }\n\n    section .content{\n        font-size:100%;\n    }\n\n    #moon,#sun{\n        width:5vw;\n        height:5vw;\n    }\n    .main-container {\n        padding-top:4rem;\n    }\n    #footer .main-container {\n        padding-top: 2rem;\n        padding-bottom: 5rem;\n    }\n    #main-container {\n        grid-template-rows: repeat(4, 1fr) 10rem;\n    }\n}\n\n@media (max-width:350px){\n    .death-screen{\n        display:block;\n    }\n}\n\n/* media end */\n.flex{\n    display:flex;\n}\n.flex-column{\n    flex-direction: column;\n}\n.flex-row{\n    flex-direction:row;\n}\n\n.flex-centered{\n    justify-content: center;\n    align-items: center;\n}\n#header{  \n    position:relative;\n    grid-area:header;\n    height:60rem;\n    opacity:0.9;\n    box-shadow: 0 0 10px  #62cff4, 0 0 20px #2c67f2 ;\n}\n#header .title {\n    transition: text-shadow 0.2s;\n}\n#header .title:hover {\n    text-shadow: 0 5px 5px #111;\n}\n\n#header .title span {\n    transition: font-weight 0.2s, font-size 0.2s;\n}\n\n#header .title .fe:hover {\n    font-weight: 300;\n    font-size: 50px;\n}\n#header .title .fs:hover {\n    font-weight: 900;\n    font-size: 50px;\n    text-transform: uppercase;\n}\n\n#about{\n    position:relative;\n    grid-area:about;\n    transition:all 0.6s; \n    top: -20rem;\n    z-index: 3;\n}\n\n#projects{\n    position:relative;\n    grid-area:projects;\n    border-color:brown;\n    background: linear-gradient(-45deg, #3C787E, #2c7744);\n    box-shadow: 0 -2px 10px #2c7744, 0 -2px 2px black;\n    transition:all 0.6s; \n    top: -10rem;\n    box-sizing: border-box;\n    height: 80rem;\n    z-index: 2;\n}\n\n#footer{\n    z-index: 4;\n    position:relative;\n    grid-area:footer;\n    transition:all 0.6s; \n    top: -30rem;\n\n}\n\n#footer::before{\n    position: absolute;\n    left:0;\n    width:100%;\n    height:100%;\n    background-color: #D0CD94;\n    content:\" \";\n    z-index:-1;\n}\n.footer{\n    /* background-color:rgba(255, 38, 0); */\n    background: radial-gradient(red, brown);\n    background-position: 50% 70%;\n    background-size: 100% 100%;\n    animation: backAndForth infinite 5s;\n    position:relative;\n    box-shadow:0 -1px 5px orangered,0 -1px 10px red,0 -4px 20px rgb(255, 101, 11);\n}\n\n.astroid {\n    height:30px;\n    width:30px;\n    border-radius:50%;\n    position: absolute;\n    z-index: 10;\n    top: 0;\n    left: 0;\n    background: radial-gradient(brown, red);\n    transition: transform 0.3s, ease-in;\n}\n\n@keyframes backAndForth {\n    0% {\n        background-size: 40% 70%;\n    }\n    50% {\n        background-size: 100% 80%;\n    }\n    100% {\n        background-size: 40% 70%;\n    }\n}\n\n.footer__media{\n    gap:5em;\n    justify-content: center;\n    align-items: center;\n    padding-top:2em;\n}\n\n.footer__media__link{\n    color:darkred;\n    font-size:2em;\n    box-sizing: content-box;\n    height:2em;\n    width:2em;\n    background-color:orangered;\n    justify-content: center;\n    align-items: center;\n    border-radius:50%;\n\n    transition:all 0.4s;\n}\n\n.footer__media__link:hover{\n    background-color:rgb(231, 126, 126);\n    color:white;\n    transform:scale(1.2);\n    cursor:pointer;\n}\n\n.top-button{\n    background-color:brown;\n    height:10vw;\n    width:10vw;\n    max-height:60px;\n    max-width:60px;\n    border-radius:50%;\n}\n\n\n#nav{\n    grid-area:nav;\n    display:flex;\n    justify-content: flex-end;\n    padding:1rem 0.5rem;\n    min-height:40px;\n\n    opacity:0.7;\n    transition:opacity 0.5s;\n\n    /* box-shadow:0px 1px 2px black;\n    -moz-box-shadow:0px 1px 2px black;\n    -webkit-box-shadow:0px 1px 2px black; */\n}\n\n.nav-list{\n    display:flex;\n    flex-direction: row-reverse;\n    list-style: none;\n    justify-content: center;\n    align-items: center;\n    padding-right:5em;\n}\n\n.nav-list li{\n    color:white;\n    font-family:'Courier New', Courier, monospace;\n    font-size:130%;\n    font-weight:800;\n}\n\n.nav-list>li a:hover{\n    color:greenyellow;\n}\n/* Explosion */\n.explosion{\n    background-color: black;\n    height:100vh;\n    width:100vw;\n    transform-origin: center center;\n    transition:1s all;\n    position: fixed;\n    z-index: 1000;\n}\n\n/* starfield */\n#starfield{\n    background-color:black;\n    opacity:0.9;\n    position: fixed;\n    top:0;\n    z-index: -2;\n    width:100%;\n}\n\n/* ground */\n\n#ground{\n    width:100%;\n    height:100px;\n    background-color: rgb(95, 60, 60);\n    z-index: -1;\n    position:relative;\n}\n\n/* sun */\n#moon{\n    top:2em;\n    left:2em;\n    width: 10em;\n    height:10em;\n    min-width: 80px;\n    min-height: 80px;\n    max-height: 150px;\n    max-width: 150px;\n    background-color:rgb(202, 202, 202);\n    position: fixed;\n    z-index: -1;\n    border-radius: 50%;\n    animation: ray 2s infinite linear forwards,moonrays infinite 2s 2s linear forwards;\n    box-shadow:\n    0 0 0 rgba(202, 202, 202, 0.904),\n    0 0 0 5px rgba(202, 202, 202, 0.75),\n    0 0 0 10px rgba(202, 202, 202, 0.75),\n    0 0 0 15px rgba(202, 202, 202, 0.75),\n    0 0 0 20px rgba(202, 202, 202, 0.68),\n    0 0 0 25px rgba(202, 202, 202, 0.68),\n    0 0 0 30px rgba(202, 202, 202, 0.504),\n    0 0 0 35px rgba(202, 202, 202, 0.504),\n    0 0 0 40px rgba(202, 202, 202, 0.304),\n    0 0 0 45px rgba(202, 202, 202, 0.304),\n    0 0 0 50px rgba(202, 202, 202, 0.104);\n}\n#sun{\n    top:2em;\n    left:2em;\n    width: 10rem;\n    height:10rem;\n    min-width: 80px;\n    min-height: 80px;\n    max-height: 150px;\n    max-width: 150px;\n    background-color:rgb(255, 209, 5);\n    position: absolute;\n    z-index: -1;\n    border-radius: 50%;\n    animation: ray 2s infinite linear forwards,sunrays infinite 2s 2s linear forwards;\n    box-shadow:\n    0 0 0 rgba(255, 209, 5, 0.904),\n    0 0 0 10px rgba(255, 209, 5, 0.75),\n    0 0 0 20px rgba(255, 209, 5, 0.68),\n    0 0 0 30px rgba(255, 209, 5, 0.504),\n    0 0 0 40px rgba(255, 209, 5, 0.304),\n    0 0 0 50px rgba(255, 209, 5, 0.104);\n}\n\n\n@keyframes moonrays{\n    0%{\n        box-shadow:\n        0 0 0 rgba(202, 202, 202, 0.904),\n        0 0 0 5px rgba(202, 202, 202, 0.75),\n        0 0 0 10px rgba(202, 202, 202, 0.75),\n        0 0 0 15px rgba(202, 202, 202, 0.75),\n        0 0 0 20px rgba(202, 202, 202, 0.68),\n        0 0 0 25px rgba(202, 202, 202, 0.68),\n        0 0 0 30px rgba(202, 202, 202, 0.504),\n        0 0 0 35px rgba(202, 202, 202, 0.504),\n        0 0 0 40px rgba(202, 202, 202, 0.304),\n        0 0 0 45px rgba(202, 202, 202, 0.304),\n        0 0 0 50px rgba(202, 202, 202, 0.104);\n    }\n\n    100%{\n        box-shadow:\n        0 0 0 rgba(202, 202, 202, 0.904),\n        0 0 0 10px rgba(202, 202, 202, 0.75),\n        0 0 0 15px rgba(202, 202, 202, 0.75),\n        0 0 0 20px rgba(202, 202, 202, 0.68),\n        0 0 0 25px rgba(202, 202, 202, 0.68),\n        0 0 0 30px rgba(202, 202, 202, 0.504),\n        0 0 0 35px rgba(202, 202, 202, 0.504),\n        0 0 0 40px rgba(202, 202, 202, 0.304),\n        0 0 0 45px rgba(202, 202, 202, 0.304),\n        0 0 0 50px rgba(202, 202, 202, 0.104),\n        0 0 0 55px rgba(202, 202, 202, 0.104);\n    }\n}\n@keyframes sunrays{\n    0%{\n        box-shadow:\n        0 0 0 rgba(255, 209, 5, 0.904),\n        0 0 0 10px rgba(255, 209, 5, 0.75),\n        0 0 0 15px rgba(255, 209, 5, 0.75),\n        0 0 0 20px rgba(255, 209, 5, 0.68),\n        0 0 0 25px rgba(255, 209, 5, 0.68),\n        0 0 0 30px rgba(255, 209, 5, 0.504),\n        0 0 0 35px rgba(255, 209, 5, 0.504),\n        0 0 0 40px rgba(255, 209, 5, 0.304),\n        0 0 0 45px rgba(255, 209, 5, 0.304),\n        0 0 0 50px rgba(255, 209, 5, 0.104);\n    }\n\n    100%{\n        box-shadow:\n        0 0 0 rgba(255, 209, 5, 0.904),\n        0 0 0 15px rgba(255, 209, 5, 0.75),\n        0 0 0 20px rgba(255, 209, 5, 0.68),\n        0 0 0 25px rgba(255, 209, 5, 0.68),\n        0 0 0 30px rgba(255, 209, 5, 0.504),\n        0 0 0 35px rgba(255, 209, 5, 0.504),\n        0 0 0 40px rgba(255, 209, 5, 0.304),\n        0 0 0 45px rgba(255, 209, 5, 0.304),\n        0 0 0 50px rgba(255, 209, 5, 0.104),\n        0 0 0 55px rgba(255, 209, 5, 0.104);\n    }\n}\n\n@keyframes ray{\n    0%{\n        box-shadow: none;\n    }\n}\n\n@keyframes blink {\n    0% {\n        color: white;\n    }\n\n    50% {\n        color: black;\n    }\n\n    100% {\n        color: white;\n    }\n}\n\n\n/* Logo */\n\n.nav-logo{\n    border:2px solid black;\n    box-sizing: content-box;\n    display:flex;\n    align-items: center;\n    justify-content: center;\n    min-width:40px;\n    min-height:40px;\n    width: 6vw;\n    height: 6vw;\n    border-radius:50%;\n    background-color:var(--logoBGColor);\n    transition:all cubic-bezier(0.2, 0.055, 0.03, 0.01) 0.2s;\n    transform-origin: center center;\n}\n\n@keyframes pulsing{\n    0%{\n        border-color: orange;\n    }\n    50%{\n        border-color: orangered;\n    }\n    100%{\n        border-color: orange;\n    }\n}\n"],"sourceRoot":""}]);
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
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
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

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _utils_positioning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/positioning */ "./src/utils/positioning.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element */ "./src/element/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants/index.js");




var starArr = [];

function starFieldInit() {
  _element__WEBPACK_IMPORTED_MODULE_2__.canvas.setAttribute("id", "starfield");
  _element__WEBPACK_IMPORTED_MODULE_2__.canvas.height = document.body.scrollHeight + 500;
  _element__WEBPACK_IMPORTED_MODULE_2__.canvas.width = screen.width;
  document.body.append(_element__WEBPACK_IMPORTED_MODULE_2__.canvas);
  var stars = 5000;

  for (var i = 0; i < stars; i++) {
    var x = Math.random() * _element__WEBPACK_IMPORTED_MODULE_2__.canvas.width;
    var y = Math.random() * _element__WEBPACK_IMPORTED_MODULE_2__.canvas.height;
    var radius = 1.4 * Math.random();
    starArr.push({
      radius: radius,
      x: x,
      y: y
    });
    _element__WEBPACK_IMPORTED_MODULE_2__.context.beginPath();
    _element__WEBPACK_IMPORTED_MODULE_2__.context.arc(x, y, radius, 0, 360);
    _element__WEBPACK_IMPORTED_MODULE_2__.context.fillStyle = "rgb(255,255,255,0.8)";
    _element__WEBPACK_IMPORTED_MODULE_2__.context.fill();
  }

  document.addEventListener("wheel", moveSunAndMoon, {
    passive: false
  });
  document.addEventListener("touchmove", moveSunAndMoon, {
    passive: false
  });
  document.addEventListener("scroll", moveSunAndMoon, {
    passive: false
  });
  document.addEventListener("resize", positionSun); /// update star brightness

  setInterval(brightnessRandomizer, _constants__WEBPACK_IMPORTED_MODULE_3__.intervalTime);
  positionSun();
}

function brightnessRandomizer() {
  var height = document.body.scrollHeight + document.body.scrollHeight / 12;
  var width = screen.width;
  _element__WEBPACK_IMPORTED_MODULE_2__.context.clearRect(0, 0, width, height);

  for (var starIdx in starArr) {
    var _starArr$starIdx = starArr[starIdx],
        x = _starArr$starIdx.x,
        y = _starArr$starIdx.y,
        radius = _starArr$starIdx.radius;
    _element__WEBPACK_IMPORTED_MODULE_2__.context.beginPath();
    var offset = 0.3;
    var newRadius = radius + radius * (Math.random() > 0.5 ? offset * Math.random() : -offset * Math.random());
    var opacity = 0.8 + 0.1 * Math.random();
    var updatedPosition = (0,_utils_positioning__WEBPACK_IMPORTED_MODULE_1__.updatePositionWithTime)(x, y);
    _element__WEBPACK_IMPORTED_MODULE_2__.context.arc(updatedPosition.x, updatedPosition.y, newRadius, 0, 360);
    starArr[starIdx] = {
      x: updatedPosition.x,
      y: updatedPosition.y,
      radius: radius
    };
    _element__WEBPACK_IMPORTED_MODULE_2__.context.fillStyle = "rgb(255,255,255,".concat(opacity, ")");
    _element__WEBPACK_IMPORTED_MODULE_2__.context.fill();
  }
}

function handleWheelEvents(e) {
  var deltaX = e.deltaX,
      deltaY = e.deltaY;

  if (deltaX) {
    // Find better way to disable mac side swipe
    e.preventDefault();
  }

  (0,_utils_positioning__WEBPACK_IMPORTED_MODULE_1__.updateHorizontalPositionOfSunAndMoon)(-deltaX * 0.25, deltaY * 0.25);
  var lastY = window.scrollY;
  var moonY = -lastY / 4;
  var sunY = lastY - lastY / 4;
  _element__WEBPACK_IMPORTED_MODULE_2__.moon.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__.COORDINATES_PARAMS.Y, moonY);
  _element__WEBPACK_IMPORTED_MODULE_2__.sun.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__.COORDINATES_PARAMS.Y, sunY);
}

function moveSunAndMoon(e) {
  if (e) {
    handleWheelEvents(e);
  }
}

function positionSun() {
  var calcTop = parseInt(document.defaultView.getComputedStyle(_element__WEBPACK_IMPORTED_MODULE_2__.moon, "")["top"] || 0) - _element__WEBPACK_IMPORTED_MODULE_2__.sun.offsetParent.offsetTop;
  _element__WEBPACK_IMPORTED_MODULE_2__.sun.style.top = calcTop + "px";
  var lastY = window.scrollY;
  var moonY = -lastY / 4;
  var sunY = lastY - lastY / 4;
  _element__WEBPACK_IMPORTED_MODULE_2__.moon.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__.COORDINATES_PARAMS.Y, moonY);
  _element__WEBPACK_IMPORTED_MODULE_2__.sun.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__.COORDINATES_PARAMS.Y, sunY);
  (0,_utils_positioning__WEBPACK_IMPORTED_MODULE_1__.updateHorizontalPositionOfSunAndMoon)(1, 0);
}

function initializeSceneUpdates() {
  setInterval(function () {
    (0,_utils_positioning__WEBPACK_IMPORTED_MODULE_1__.updateHorizontalPositionOfSunAndMoon)(1, 0);
  }, 100);
}

function explosionsInTheSky() {
  starFieldInit();
  moveSunAndMoon();
  initializeSceneUpdates();
  setTimeout(function () {
    var explosionMask = document.querySelector(".explosion");
    explosionMask.style.height = "0%";
  }, 100);
}

window.onload = explosionsInTheSky;
})();

/******/ })()
;
//# sourceMappingURL=main.js.map