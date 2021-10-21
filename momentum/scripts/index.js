import { showTime } from './components/DateTime/time.js';
import { showDate } from './components/DateTime/date.js';
import { nameContainer, getName, setName, showGreeting, langForGreeting, changePlaceholder } from './components/Greeting/greeting.js';
import { setBg, slideNext, slidePrev, getSlideNext, getSlidePrev, sourceItems, searchingContainer, getLinkFlickr, getLinkUnsplash } from './components/Slider/slider.js';
import { weatherCity, getCityWeather, getWeather } from './components/Weather/weather.js';
import { changeQuoteBtn, getQuote } from './components/Quotes/quotes.js';
import { listBtn, audioItem, playBtn, prevBtn, nextBtn, audioRange, volumeRange, volumeIcon, handleListBtn, showProgress, handleNext, playStop, handlePrev, updateAudioProgress, changeVolOnInput, changeVolOnClick } from './components/Audio/audio.js';
import { changeLang } from './components/Translator/translator.js';

let appSettings = {
  lang: '',
  source: '',
  time: '',
  date: '',
  greeting: '',
  quotes: '',
  weather: '',
  player: '',
  todo: '',
}

/* ======================================= GREETING - DATE - TIME ================================*/
setTimeout(function updateTime() {
  showTime();
  showDate();
  showGreeting();
  setTimeout(updateTime, 100);
}, 100);
nameContainer.addEventListener('input', getName);
window.addEventListener('load', setName);
/* =========================================== SLIDER ============================================ */
window.addEventListener('load', setBg);
slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)
sourceItems.forEach(el => el.addEventListener('click', setBg));
/* =========================================== WEATHER =========================================== */
weatherCity.addEventListener('change', getCityWeather)
window.addEventListener('load', getWeather);
/* ============================================ QUOTE ============================================ */
changeQuoteBtn.addEventListener('click', getQuote);
window.addEventListener('load', getQuote);

/* ============================================ AUDIO ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  listBtn.forEach(btn => btn.addEventListener('click', handleListBtn));
  audioItem.addEventListener("timeupdate", showProgress)
  audioItem.addEventListener("ended", handleNext);
  playBtn.addEventListener("click", playStop);
  prevBtn.addEventListener('click', handlePrev);
  nextBtn.addEventListener('click', handleNext);
  audioRange.addEventListener("input", updateAudioProgress);
  volumeRange.addEventListener("input", changeVolOnInput);
  volumeIcon.addEventListener("click", changeVolOnClick);
})

/* ============================================ Translator ======================================= */
const langItem = document.querySelectorAll('.lang__item');
langItem.forEach(el => el.addEventListener('click', changeLang));

/* ============================================ Settings ======================================= */
const settingsButton = document.querySelector('.settings__button');
const settingsContainer = document.querySelector('.settings__container');
const closeButton = document.querySelector('.close-button');
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.great__wrap');
const quotesBlock = document.querySelector('.quotes__wrap');
const weatherBlock = document.querySelector('.weather');
const playerBlock = document.querySelector('.player__container');
// const todoBlock = document.querySelector('.todo__container');
const switchers = document.querySelectorAll('.switcher');

window.addEventListener('beforeunload', saveAppSettings);
window.addEventListener('load', getUserSettings);
settingsButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', openSettings);
switchers.forEach(el => el.addEventListener('click', handleActiveSwitcher));

function openSettings() {
  settingsContainer.classList.toggle('active-settings');
}

function handleActiveSwitcher(e) {
  let currentSwitchers;
  let el = e.target;
  let settingItem = e.target.classList[0].split('__')[0]; // 'time', 'date' etc...
  appSettings[settingItem] = el.textContent === 'OFF' || el.textContent === 'ВЫКЛ' ? 'OFF' : '';
  switch (true) {
    case e.target.classList.contains('time__item'):
      currentSwitchers = document.querySelectorAll('.time__item');
      currentSwitchers.forEach(item => item.classList.remove('lang-active'));
      el.classList.add('lang-active');
      if (el.textContent === 'ON' || el.textContent === 'ВКЛ') timeBlock.classList.remove('hide-widgets')
      else timeBlock.classList.add('hide-widgets')
      break;
    case e.target.classList.contains('date__item'):
      currentSwitchers = document.querySelectorAll('.date__item');
      currentSwitchers.forEach(item => item.classList.remove('lang-active'));
      el.classList.add('lang-active');
      if (el.textContent === 'ON' || el.textContent === 'ВКЛ') dateBlock.classList.remove('hide-widgets')
      else dateBlock.classList.add('hide-widgets')
      break;
    case e.target.classList.contains('greeting__item'):
      currentSwitchers = document.querySelectorAll('.greeting__item');
      currentSwitchers.forEach(item => item.classList.remove('lang-active'));
      el.classList.add('lang-active');
      if (el.textContent === 'ON' || el.textContent === 'ВКЛ') greetingBlock.classList.remove('hide-widgets')
      else greetingBlock.classList.add('hide-widgets')
      break;
    case e.target.classList.contains('quotes__item'):
      currentSwitchers = document.querySelectorAll('.quotes__item');
      currentSwitchers.forEach(item => item.classList.remove('lang-active'));
      el.classList.add('lang-active');
      if (el.textContent === 'ON' || el.textContent === 'ВКЛ') quotesBlock.classList.remove('hide-widgets')
      else quotesBlock.classList.add('hide-widgets')
      break;
    case e.target.classList.contains('weather__item'):
      currentSwitchers = document.querySelectorAll('.weather__item');
      currentSwitchers.forEach(item => item.classList.remove('lang-active'));
      el.classList.add('lang-active');
      if (el.textContent === 'ON' || el.textContent === 'ВКЛ') weatherBlock.classList.remove('hide-widgets')
      else weatherBlock.classList.add('hide-widgets')
      break;
    case e.target.classList.contains('player__item'):
      currentSwitchers = document.querySelectorAll('.player__item');
      currentSwitchers.forEach(item => item.classList.remove('lang-active'));
      el.classList.add('lang-active');
      if (el.textContent === 'ON' || el.textContent === 'ВКЛ') playerBlock.classList.remove('hide-widgets')
      else playerBlock.classList.add('hide-widgets')
      break;
    // case e.target.classList.contains('todo__item'):
    //   currentSwitchers = document.querySelectorAll('.todo__item');
    //   currentSwitchers.forEach(item => item.classList.remove('lang-active'));
    //   el.classList.add('lang-active');
    //   if (el.textContent === 'ON' || el.textContent === 'ВКЛ') todoBlock.classList.remove('hide-widgets')
    //   else todoBlock.classList.add('hide-widgets')
    //   break;
    default:
      break;
  }
}

function saveAppSettings() {
  langItem.forEach(el => el.classList.contains('lang-active') ? appSettings.lang = el.textContent : '');
  sourceItems.forEach(el => el.classList.contains('lang-active') ? appSettings.source = el.textContent : '');
  let appStg = JSON.stringify(appSettings);
  localStorage.setItem('momentum', appStg);
}

function getUserSettings() {
  appSettings = JSON.parse(localStorage.getItem('momentum'));
  sourceItems.forEach(el => {
    el.classList.remove('lang-active');
    appSettings.source === el.textContent ? el.classList.add('lang-active') : null;
  });
  if (appSettings.source === 'Github') {
    searchingContainer.classList.remove('show-searching');
  } else {
    searchingContainer.classList.add('show-searching');
  }

  getLinkUnsplash();
  getLinkFlickr();

  for (const key in appSettings) {
    switchers.forEach(el => {
      let currEl = el.classList[0].split('__')[0]; // 'time' ...
      if (currEl === key && appSettings[key] === 'OFF' && (el.textContent === 'OFF' || el.textContent === 'ВЫКЛ')) {
        el.classList.add('lang-active');
        el.previousElementSibling.classList.remove('lang-active');

        switch (true) {
          case key === 'time':
            timeBlock.classList.add('hide-widgets')
            break;
          case key === 'date':
            dateBlock.classList.add('hide-widgets')
            break;
          case key === 'greeting':
            greetingBlock.classList.add('hide-widgets')
            break;
          case key === 'quotes':
            quotesBlock.classList.add('hide-widgets')
            break;
          case key === 'weather':
            weatherBlock.classList.add('hide-widgets')
            break;
          case key === 'player':
            playerBlock.classList.add('hide-widgets')
            break;
          // case key === 'todo':
          //   todoBlock.classList.add('hide-widgets')
          //   break;
          default:
            break;
        }
      }
    })
  }
}



/////////////////////////////////////////////////////////////////////////////////

const todoBtn = document.querySelector('.todo__btn');
const closeTodo = document.querySelector('.close-todo');
const todoContent = document.querySelector('.todo__content');
const addTodoBtn = document.querySelector('.todo__label');
const inputTodo = document.querySelector('.input__todo');
const todoListContainer = document.querySelector('.todo-list');
const todoDelete = document.getElementsByClassName('todo__delete');

let todoData = [];

window.addEventListener('load', getTodoData);
addTodoBtn.addEventListener('click', addTodo);
addTodoBtn.addEventListener('click', renderTodoList);

Array.from(todoDelete).forEach(el => el.addEventListener('click', deleteTodo));

[todoBtn, closeTodo].forEach(el => el.addEventListener('click', openTodo));

function openTodo() {
  todoContent.classList.toggle('active__todo');
  todoBtn.classList.toggle('hide__todo-btn');
}

function addTodo() {
  if (!inputTodo.value) return;
  todoData.push(inputTodo.value);
  let data = JSON.stringify(todoData);
  localStorage.setItem('todo', data);
  console.log(todoDelete)
}

function deleteTodo() {
  console.log('del')
}

function renderTodoList() {
  todoListContainer.innerHTML = null;
  todoData.map((el, i) => {
    todoListContainer.insertAdjacentHTML('beforeend', `<p class="list-item">
    ${i + 1}. <input class="todo__check" type="checkbox"/> ${el} <button class="todo__delete" type="button">Delete</button></p>`);
  })
}

function getTodoData() {
  todoData = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
  renderTodoList();
}

// localStorage.removeItem('todo');
console.log(Array.from(todoDelete))
