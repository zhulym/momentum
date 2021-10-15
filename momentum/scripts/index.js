import { showTime } from './components/DateTime/time.js';
import { showDate } from './components/DateTime/date.js';
import { nameContainer, getName, setName, showGreeting } from './components/Greeting/greeting.js';
import { setBg, slideNext, slidePrev, getSlideNext, getSlidePrev } from './components/Slider/slider.js';
import { weatherCity, getCityWeather, getWeather } from './components/Weather/weather.js';

setTimeout(function updateTime() {
  showTime();
  showDate();
  showGreeting();
  setTimeout(updateTime, 100);
}, 100);

nameContainer.addEventListener('input', getName);
window.addEventListener('load', setName);
window.addEventListener('load', setBg);

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

weatherCity.addEventListener('change', getCityWeather)
window.addEventListener('load', getWeather);




