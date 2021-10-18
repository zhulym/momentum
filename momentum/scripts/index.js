import { showTime } from './components/DateTime/time.js';
import { showDate } from './components/DateTime/date.js';
import { nameContainer, getName, setName, showGreeting, langForGreeting, changePlaceholder } from './components/Greeting/greeting.js';
import { setBg, slideNext, slidePrev, getSlideNext, getSlidePrev } from './components/Slider/slider.js';
// import { weatherCity, getCityWeather, getWeather } from './components/Weather/weather.js';
import { changeQuoteBtn, getQuote } from './components/Quotes/quotes.js';
import { listBtn, audioItem, playBtn, prevBtn, nextBtn, audioRange, volumeRange, volumeIcon, handleListBtn, showProgress, handleNext, playStop, handlePrev, updateAudioProgress, changeVolOnInput, changeVolOnClick } from './components/Audio/audio.js';
let isEnLang = true;

// TODO: open URL in WEATHER after finish app!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
/* =========================================== WEATHER =========================================== */
// weatherCity.addEventListener('change', getCityWeather)
// window.addEventListener('load', getWeather);
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

function changeLang(e) {
  handleActiveLang(e);
  // getWeather(e);
  showGreeting();
  showTime();
  changePlaceholder(e);
  getQuote();
}

function handleActiveLang(e) {
  if (e.target.textContent === 'EN') isEnLang = true;
  else isEnLang = false;
  langItem.forEach(el => el.classList.remove('lang-active'));
  e.target.classList.add('lang-active');
  console.log(isEnLang)
}

