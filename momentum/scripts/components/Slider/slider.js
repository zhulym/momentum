import { getTimeOfDay } from '../Greeting/greeting.js';

export const slidePrev = document.querySelector('.slide-prev');
export const slideNext = document.querySelector('.slide-next');
const body = document.body;
const minNum = 1;
const maxNum = 20;
let currNum;
let nextNum;
let isArrowClick = false;

export function getSlideNext() {
  isArrowClick = true;
  nextNum = nextNum === maxNum ? minNum : currNum + 1;
  setBg();
}
export function getSlidePrev() {
  isArrowClick = true;
  nextNum = nextNum === minNum ? maxNum : currNum - 1;
  setBg();
}

export function setBg() {
  if (!isArrowClick) {
    currNum = getRandomNum(minNum, maxNum);
  } else {
    currNum = nextNum;
  }
  let numOfImg = currNum < 10 ? `0${currNum}` : currNum;
  let timeString = getTimeOfDay(); // 'Good afternoon!'
  let timeOfDay = timeString.split(' ')[1]; // 'afternoon!'
  let currentPeriod = timeOfDay === 'afternoon!' ? timeOfDay = 'day!' : timeOfDay; //replace folder name
  let src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentPeriod.slice(0, currentPeriod.length - 1)}/${numOfImg}.jpg`;
  const img = new Image();
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
  isArrowClick = false;
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
