import { getTimeOfDay } from '../Greeting/greeting.js';
import { getRandomNum } from '../../helpers/index.js';

export const slidePrev = document.querySelector('.slide-prev');
export const slideNext = document.querySelector('.slide-next');
const sourceItems = document.querySelectorAll('.source__item');

const body = document.body;
const minNum = 1;
const maxNum = 20;
let currNum;
let nextNum;
let isArrowClick = false;
let currentSource = 'github';

sourceItems.forEach(el => el.addEventListener('click', setBg));

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

// https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=6O0wwq-eS8WxsvS4jQPcW3KVGdMhQf-PmY5qvRpYOn8
export function setBg(e) {
  sourceItems.forEach(el => el.classList.remove('lang-active'));
  switch (true) {
    case currentSource === 'github':
      if (!isArrowClick) {
        currNum = getRandomNum(minNum, maxNum);
      } else {
        currNum = nextNum;
      }
      let numOfImg = currNum < 10 ? `0${currNum}` : currNum;
      let timeString = getTimeOfDay(); // 'Good afternoon!'
      let timeOfDay = timeString.split(' ')[1]; // 'afternoon!'
      let src = `https://raw.githubusercontent.com/zhulym/stage1-tasks/assets/images/${timeOfDay.slice(0, timeOfDay.length - 1)}/${numOfImg}.jpg`;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
      };
      isArrowClick = false;
      break;
    default:
      break;
  }




  // if (!isArrowClick) {
  //   currNum = getRandomNum(minNum, maxNum);
  // } else {
  //   currNum = nextNum;
  // }
  // let numOfImg = currNum < 10 ? `0${currNum}` : currNum;
  // let timeString = getTimeOfDay(); // 'Good afternoon!'
  // let timeOfDay = timeString.split(' ')[1]; // 'afternoon!'
  // let src = `https://raw.githubusercontent.com/zhulym/stage1-tasks/assets/images/${timeOfDay.slice(0, timeOfDay.length - 1)}/${numOfImg}.jpg`;
  // const img = new Image();
  // img.src = src;
  // img.onload = () => {
  //   body.style.backgroundImage = `url(${src})`;
  // };
  // isArrowClick = false;
}
