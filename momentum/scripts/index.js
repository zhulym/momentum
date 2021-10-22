import { showTime } from './components/DateTime/time.js';
import { showDate } from './components/DateTime/date.js';
import { nameContainer, getName, setName, showGreeting, langForGreeting, changePlaceholder } from './components/Greeting/greeting.js';
import { setBg, slideNext, slidePrev, getSlideNext, getSlidePrev, sourceItems, searchingContainer, getLinkFlickr, getLinkUnsplash } from './components/Slider/slider.js';
import { weatherCity, getCityWeather, getWeather } from './components/Weather/weather.js';
import { changeQuoteBtn, getQuote } from './components/Quotes/quotes.js';
import { listBtn, audioItem, playBtn, prevBtn, nextBtn, audioRange, volumeRange, volumeIcon, handleListBtn, showProgress, handleNext, playStop, handlePrev, updateAudioProgress, changeVolOnInput, changeVolOnClick } from './components/Audio/audio.js';
import { changeLang } from './components/Translator/translator.js';
import { getTodoData, addTodo, renderTodoList, deleteTodo, openTodo, addTodoBtn, todoContent, todoBtn, closeTodo, completeTodo } from './components/Todo/todo.js';

let appSettings = {
  lang: 'EN',
  source: 'Github',
  time: '',
  date: '',
  greeting: '',
  quotes: '',
  weather: '',
  player: '',
  todo: '',
}

// Set default settings on first page loading
window.addEventListener('load', function () {
  if (localStorage.getItem("momentum") === null) localStorage.setItem('momentum', JSON.stringify(appSettings));
});

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

/* ============================================ Todo ============================================= */
window.addEventListener('load', getTodoData);
addTodoBtn.addEventListener('click', addTodo);
addTodoBtn.addEventListener('click', renderTodoList);
todoContent.addEventListener('click', deleteTodo);
todoContent.addEventListener('click', completeTodo);
[todoBtn, closeTodo].forEach(el => el.addEventListener('click', openTodo));

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
const todoBlock = document.querySelector('.todo__container');
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
    case e.target.classList.contains('todo__item'):
      currentSwitchers = document.querySelectorAll('.todo__item');
      currentSwitchers.forEach(item => item.classList.remove('lang-active'));
      el.classList.add('lang-active');
      if (el.textContent === 'ON' || el.textContent === 'ВКЛ') todoBlock.classList.remove('hide-widgets')
      else todoBlock.classList.add('hide-widgets')
      break;
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
    appSettings?.source === el.textContent ? el.classList.add('lang-active') : null;
  });
  if (appSettings?.source === 'Github') {
    searchingContainer.classList.remove('show-searching');
  } else {
    searchingContainer.classList.add('show-searching');
  }

  // getLinkUnsplash();////////////////////////////////////open later!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
          case key === 'todo':
            todoBlock.classList.add('hide-widgets')
            break;
          default:
            break;
        }
      }
    })
  }
}

// localStorage.removeItem('todo');
// localStorage.removeItem('momentum');

// Самооценка проекта:
// console.log(`
// Самооценка: \n
// 1. Часы и календарь (+15)
//   - время в 24-часовом формате +5
//   - время обновляется, цифры не дёргаются) +5
//   - выводится день недели, число, месяц +5
//   - Язык и формат вывода даты определяется языком приложения. +
//   - при изменении дня недели, даты, месяца эти данные меняются +
// 2. Приветствие +10
//   - приветствие меняется в зависимости от времени суток (утро, день, вечер, ночь) +5
//   - с 6:00 до 11:59 - Good morning / Доброе утро
//   - с 12:00 до 17:59 - Good afternoon / Добрый день
//   - с 18:00 до 23:59 - Good evening / Добрый вечер
//   - с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи
//   - при изменении времени суток, если в это время приложение открыто, меняется текст приветствия
//   - можно ввести имя. При перезагрузке  имя сохраняется, данные в local storage +5
// 3. Смена фонового изображения (+20)
//   - ссылка на изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5
//   - изображения можно перелистывать кликами по стрелкам.
//   - перелистываются последовательно - за 18м - 19е(клик по правой стрелке) и наоборот(клик по левой стрелке) +5
//   - изображения перелистываются по кругу +5
//   - слайды меняются плавно, пользователь не видит частично загрузившееся изображение +5
// 4. Виджет погоды (+15)
//   - город по умолчанию - Минск, пока пользователь не ввёл другой город
//   - при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5
//   - для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API
//   - данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5
//   - выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5
// 5. Виджет цитата дня (+10)
//   - при загрузке страницы приложения отображается рандомная цитата и её автор +5
//   - В качестве источника цитаты можно использовать как API, так и созданный вами или найденный в интернете JSON-файл с цитатами и их авторами. API с цитатами не отличаются надёжностью и долговечностью, используемый в качестве источника цитат собственный JSON-файл гарантирует работоспособность вашего приложения. Запросы к JSON также осуществляются асинхронно, таким образом необходимые знания о работе с асинхронными запросами вы получите
//   - при перезагрузке страницы цитата обновляется. При клике по кнопке цитата обновляется (заменяется на другую) +5
// 6. Аудиоплеер (+15)
//   - при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3
//   - при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3
//   - треки можно пролистывать кнопками Play-next и Play-prev
//   - треки пролистываются по кругу  +3
//   - трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3
//   - после окончания первого трека запускается проигрывание следующего. Треки проигрываются по кругу +3
//   - плейлист генерируется средствами JavaScript +
// 7. Продвинутый аудиоплеер (реализуется без использования библиотек) (+20)
//   - добавлен прогресс-бар в котором отображается прогресс проигрывания +3
//   - при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека +3
//   - над прогресс-баром отображается название трека +3
//   - отображается текущее и общее время воспроизведения трека +3
//   - есть кнопка звука при клике по которой можно включить/отключить звук +2
//   - добавлен регулятор громкости, при перемещении ползунка меняется громкость проигрывания звука +3
//   - можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3
// 8.  Перевод приложения на два языка (en/ru или en/be) (+15)
//   - переводится язык и меняется формат отображения даты +3
//   - переводится приветствие и placeholder +3
//   - переводится прогноз погоды в т.ч описание погоды и город по умолчанию +3
//   - переводится цитата дня  +3
//   - переводятся настройки приложения. Язык настроек тоже меняется +3
// 9. Получение фонового изображения от API (+10) 
//    фоновые изображения можно перелистывать кликами по стрелкам, обеспечивается плавная смена фоновых изображений, ссылка на фоновое изображение формируется с учётом времени суток, если пользователь не указал другие теги для их получения.
//   - в качестве источника изображений может использоваться Unsplash API +5
//   - в качестве источника изображений может использоваться Flickr API +5
// 10. Настройки приложения (+20)
//   - в настройках приложения можно указать язык приложения (en/ru или en/be) +3
//   - в настройках приложения можно указать источник получения фонового изображения: GitHub, Unsplash API, Flickr API +3
//   - если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото +3
//   - в настройках приложения можно скрыть/отобразить блоки, которые находятся на странице +3
//   - скрытие и отображение блоков происходит плавно, не влияя на другие элементы +3
//   - настройки приложения сохраняются при перезагрузке страницы +5
// 11. Дополнительный функционал (+10)
//     ToDo List - список дел:
//   - список создан, по кнопке плавно открывается и закрывается +3
//   - можно добавлять дела в список +3
//   - можно удалять дела из списка +3
//   - можно отмечать выполненные дела +3
//   - список дел сохраняется и отрисовывается после перезагрузки страницы +3

// Итого: 160.
// `);
