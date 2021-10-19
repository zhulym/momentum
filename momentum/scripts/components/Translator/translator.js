// import { getWeather } from '../Weather/weather.js';
import { showGreeting, changePlaceholder } from '../Greeting/greeting.js';
import { showTime } from '../DateTime/time.js';
import { getQuote } from '../Quotes/quotes.js';

const switchers = document.querySelectorAll('.switcher');
const settingsTitles = document.querySelectorAll('.settings__title');
const searchingLabel = document.querySelector('.searching-label');
const settingsHeading = document.querySelector('.settings__heading');
const widgetsHeading = document.querySelector('.widgets__heading');
const langItem = document.querySelectorAll('.lang__item');
let isEnLang = true;

export function changeLang(e) {
  if (e.target.classList.contains('lang-active')) return;
  searchingLabel.textContent = isEnLang ? 'Поиск по: ' : 'Search by: ';
  settingsHeading.textContent = isEnLang ? 'Настройки' : 'Settings';
  widgetsHeading.textContent = isEnLang ? 'Показать/скрыть виджеты' : 'Show/Hide widgets';
  handleActiveLang(e);
  // getWeather(e);
  showGreeting();
  showTime();
  changePlaceholder(e);
  getQuote();
  translateSwitchers();
  translateTitles();
}

function handleActiveLang(e) {
  if (e.target.textContent === 'EN') isEnLang = true;
  else isEnLang = false;
  langItem.forEach(el => el.classList.remove('lang-active'));
  e.target.classList.add('lang-active');
}

function translateSwitchers() {
  if (!isEnLang) {
    switchers.forEach(sw => sw.textContent === 'ON' ? sw.textContent = 'ВКЛ' : sw.textContent = 'ВЫКЛ');
  } else {
    switchers.forEach(sw => sw.textContent === 'ВКЛ' ? sw.textContent = 'ON' : sw.textContent = 'OFF');
  }
}

function translateTitles() {
  settingsTitles.forEach(el => {
    let title = el.textContent.trim();
    if (!isEnLang) {
      switch (true) {
        case title === 'Change language:':
          el.textContent = 'Изменить язык:'
          break;
        case title === 'Background source:':
          el.textContent = 'Источник фона:'
          break;
        case title === 'Time:':
          el.textContent = 'Время:'
          break;
        case title === 'Date:':
          el.textContent = 'Дата:'
          break;
        case title === 'Greeting:':
          el.textContent = 'Приветствие:'
          break;
        case title === 'Quotes:':
          el.textContent = 'Цитаты:'
          break;
        case title === 'Weather:':
          el.textContent = 'Погода:'
          break;
        case title === 'Player:':
          el.textContent = 'Плеер:'
          break;
        case title === 'Todo list:':
          el.textContent = 'Список дел:'
          break;
        default:
          break;
      }
    } else {
      switch (true) {
        case title === 'Изменить язык:':
          el.textContent = 'Change language:'
          break;
        case title === 'Источник фона:':
          el.textContent = 'Background source:'
          break;
        case title === 'Время:':
          el.textContent = 'Time:'
          break;
        case title === 'Дата:':
          el.textContent = 'Date:'
          break;
        case title === 'Приветствие:':
          el.textContent = 'Greeting:'
          break;
        case title === 'Цитаты:':
          el.textContent = 'Quotes:'
          break;
        case title === 'Погода:':
          el.textContent = 'Weather:'
          break;
        case title === 'Плеер:':
          el.textContent = 'Player:'
          break;
        case title === 'Список дел:':
          el.textContent = 'Todo list:'
          break;
        default:
          break;
      }
    }
  })
}