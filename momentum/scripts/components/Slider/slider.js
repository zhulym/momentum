import { getTimeOfDay } from '../Greeting/greeting.js';
import { getRandomNum } from '../../helpers/index.js';
export const slidePrev = document.querySelector('.slide-prev');
export const slideNext = document.querySelector('.slide-next');
export const sourceItems = document.querySelectorAll('.source__item');
const searchingQuery = document.querySelector('.searching-query');
export const searchingContainer = document.querySelector('.searching__container');
const body = document.body;
const minNum = 1;
const maxNum = 20;
let currNum;
let nextNum;
let isArrowClick = false;
let currentSource;
let urlUnsplash;
let flickrData;
let newSearchingTag;

window.addEventListener('load', setCurrentSource);

sourceItems.forEach(el => el.addEventListener('click', setActiveSource));
searchingQuery.addEventListener('change', setNewTag);

function setActiveSource(e) {
  sourceItems.forEach(el => el.classList.remove('lang-active'));
  e.target.classList.add('lang-active');

  if (e.target.textContent === 'Unsplash') getLinkUnsplash();
  if (e.target.textContent === 'Flickr' && !flickrData) getLinkFlickr();
  if (e.target.textContent === 'Github') {
    newSearchingTag = '';
    searchingContainer.classList.remove('show-searching');
  } else {
    searchingContainer.classList.add('show-searching');
  }
}

export function getSlideNext() {
  if (currentSource === 'Unsplash') {
    currNum = getRandomNum(minNum, maxNum);
    if (currentSource === 'Unsplash') getLinkUnsplash();
    setBg();
    return;
  }
  isArrowClick = true;
  nextNum = nextNum === maxNum ? minNum : currNum + 1;
  setBg();
}
export function getSlidePrev() {
  if (currentSource === 'Unsplash') {
    currNum = getRandomNum(minNum, maxNum);
    if (currentSource === 'Unsplash') getLinkUnsplash();
    setBg();
    return;
  }
  isArrowClick = true;
  nextNum = nextNum === minNum ? maxNum : currNum - 1;
  setBg();
}

export function setBg() {
  sourceItems.forEach(el => el.classList.contains('lang-active') ? currentSource = el.textContent : null);
  if (!isArrowClick) currNum = getRandomNum(minNum, maxNum);
  else currNum = nextNum;
  let src;
  let numOfImg = currNum < 10 ? `0${currNum}` : currNum;
  let timeString = getTimeOfDay(); // 'Good afternoon!'
  let timeOfDay = timeString.split(' ')[1]; // 'afternoon!'
  if (timeOfDay === 'день!') timeOfDay = 'afternoon!';
  if (timeOfDay === 'ночи!') timeOfDay = 'night!';
  if (timeOfDay === 'вечер!') timeOfDay = 'evening!';
  if (timeOfDay === 'утро!') timeOfDay = 'morning!';
  if (currentSource === 'Github') src = `https://raw.githubusercontent.com/zhulym/stage1-tasks/assets/images/${timeOfDay.slice(0, timeOfDay.length - 1)}/${numOfImg}.jpg`;
  if (currentSource === 'Unsplash') src = urlUnsplash;
  if (currentSource === 'Flickr') src = !flickrData[currNum] ? flickrData[0] : flickrData[currNum];
  const img = new Image();
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
  isArrowClick = false;

}

export async function getLinkUnsplash() {
  try {
    let timeString = getTimeOfDay();
    let timeOfDay = timeString.split(' ')[1];
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${newSearchingTag ? newSearchingTag : timeOfDay.slice(0, timeOfDay.length - 1)}&client_id=6O0wwq-eS8WxsvS4jQPcW3KVGdMhQf-PmY5qvRpYOn8`;
    const res = await fetch(url);
    const data = await res.json();
    urlUnsplash = data.urls.regular;
    console.log('We got link for BG!', data.urls.regular)
  } catch (error) {
    console.log(error)
  }
}

export async function getLinkFlickr() {
  try {
    let timeString = getTimeOfDay();
    let timeOfDay = timeString.split(' ')[1];
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd616ef0efc811962fc3e79b5b3a206c&tags=${newSearchingTag ? newSearchingTag : timeOfDay.slice(0, timeOfDay.length - 1)}&extras=url_l&format=json&nojsoncallback=1&per_page=21&media=photos`;
    const res = await fetch(url);
    const data = await res.json();
    flickrData = data.photos.photo.map(el => el.url_l);
    console.log('We got FlickrData!', flickrData);
  } catch (error) {
    console.log(error)
  }
}

function setNewTag() {
  newSearchingTag = searchingQuery.value;
  if (currentSource === 'Flickr') {
    getLinkFlickr();
    setTimeout(() => {
      getSlideNext();
    }, 4000);
  }
}

function setCurrentSource() {
  let appSettings = JSON.parse(localStorage.getItem('momentum'));
  // if (appSettings.source !== 'Github') {
  currentSource = appSettings?.source;
  // }
}