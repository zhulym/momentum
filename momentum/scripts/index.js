import { showTime } from './components/DateTime/time.js';
import { showDate } from './components/DateTime/date.js';
import { nameContainer, getName, setName, showGreeting } from './components/Greeting/greeting.js';
import { setBg, slideNext, slidePrev, getSlideNext, getSlidePrev } from './components/Slider/slider.js';
import { weatherCity, getCityWeather, getWeather } from './components/Weather/weather.js';
import { changeQuoteBtn, getQuote } from './components/Quotes/quotes.js';

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

changeQuoteBtn.addEventListener('click', getQuote);
window.addEventListener('load', getQuote);

////////////////////audio

const audioItem = document.querySelector('.audio__item');
const volumeRange = document.querySelector('#volume__range');
const audioRange = document.querySelector('#audio__range');
const playBtn = document.querySelector('.play');
const volumeIcon = document.querySelector('.volume__icon');

const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');

const timeCurrent = document.querySelector('.time__current');
const timeEnd = document.querySelector('.time__end');
const playlistContainer = document.querySelector('.play-list');
const songTitle = document.querySelector('.song__title');
const listItems = document.getElementsByClassName('track-wrap');

let buffer = document.querySelector('.time__buffer');
const playlist = [
  'Aqua Caelestis',
  'Ennio Morricone',
  'River Flows In You',
  'Summer Wind'
]

let isPlay = false;
let duration = audioItem.duration;
let flagVolume = 1;
let numTrack = 0;

playBtn.addEventListener("click", playStop);

function playStop() {
  if (isPlay === false) {
    if (playlist[numTrack] !== songTitle.textContent) audioItem.src = `./assets/sounds/${playlist[numTrack]}.mp3`;
    listItems[numTrack].classList.add('active');
    songTitle.textContent = playlist[numTrack];
    audioItem.play();
    playBtn.classList.toggle('pause');
    isPlay = true;
  } else {
    Array.from(listItems).forEach(el => el.classList.remove('active'));
    audioItem.pause();
    playBtn.classList.toggle('pause');
    isPlay = false;
  }
}

audioItem.addEventListener("timeupdate", showProgress)

nextBtn.addEventListener('click', function () {
  if (numTrack === listItems.length - 1) numTrack = 0;
  else numTrack++;
  handlePrevNext();
})
prevBtn.addEventListener('click', function () {
  if (numTrack === 0) numTrack = listItems.length - 1;
  else numTrack--;
  handlePrevNext();
})

function handlePrevNext() {
  Array.from(listItems).forEach(el => el.classList.remove('active'));
  audioItem.pause();
  audioItem.src = `./assets/sounds/${playlist[numTrack]}.mp3`;
  listItems[numTrack].classList.add('active');
  songTitle.textContent = playlist[numTrack];
  if (isPlay) {
    audioItem.play();
  }
}

function showProgress() {
  timeCurrent.textContent = getTime(audioItem.currentTime);
  timeEnd.textContent = getTime(audioItem.duration);
  let barLength = (audioItem.currentTime / audioItem.duration) * 100;
  audioRange.value = barLength;
  let color = 'background : linear-gradient(to right,#fff ' + audioRange.value + '%,rgba(255,255,255,.5) ' + audioRange.value + '%)!important;';
  audioRange.style = color;

  if (duration > 0) {
    for (let i = 0; i < audioItem.buffered.length; i++) {
      if (audioItem.buffered.start(audioItem.buffered.length - 1 - i) < audioItem.currentTime) {
        let audioItemBufWidth = (audioItem.buffered.end(audioItem.buffered.length - 1 - i) / duration) * 100 + "%";
        buffer.innerHTML = '<style>.slider::after { width: ' + audioItemBufWidth + ';}</style>';
        break;
      }
    }
  }
}

audioRange.addEventListener("input", function () {
  audioItem.currentTime = (this.value / 100) * audioItem.duration
  let rangeValue = audioRange.value;
  let color = 'background : linear-gradient(to right,#fff ' + rangeValue + '%,rgba(255,255,255,.5) ' + rangeValue + '%)!important;';
  audioRange.style = color;
});

function getTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - (minutes * 60))
  let minuteValue;
  let secondsValue;
  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondsValue = '0' + seconds;
  } else {
    secondsValue = seconds;
  }
  return isNaN(time) ? '00:00' : minuteValue + ':' + secondsValue
}

volumeRange.addEventListener("input", function () {
  let vlmRangeVal = volumeRange.value;
  let color = 'background : linear-gradient(to right,#fff ' + vlmRangeVal + '%,rgba(255,255,255,.5) ' + vlmRangeVal + '%)!important;';
  volumeRange.style = color;

  if (vlmRangeVal >= 51) {
    volumeIcon.innerHTML = '<i class="fal fa-volume-up"></i>';
  }
  if (vlmRangeVal <= 50) {
    volumeIcon.innerHTML = '<i class="fal fa-volume-down"></i>';
  }
  if (vlmRangeVal <= 30) {
    volumeIcon.innerHTML = '<i class="fal fa-volume-off"></i>';
  }
  if (vlmRangeVal == 0) {
    volumeIcon.innerHTML = '<i class="fal fa-volume-mute"></i>';
  }
  audioItem.volume = this.value / 100;
});

volumeIcon.addEventListener("click", function () {
  let color;
  if (flagVolume < 3) flagVolume++;
  else flagVolume = 1;

  switch (flagVolume) {
    case 1:
      volumeIcon.innerHTML = '<i class="fal fa-volume-up"></i>';
      volumeRange.value = '100';
      audioItem.volume = 100 / 100;
      color = 'background : linear-gradient(to right,#fff 100%,rgba(255,255,255,0.5) 0)!important;';
      volumeRange.style = color;
      break;
    case 2:
      volumeIcon.innerHTML = '<i class="fal fa-volume-mute"></i>';
      volumeRange.value = '0';
      audioItem.volume = 0 / 100;
      color = 'background : linear-gradient(to right,#fff 0,rgba(255,255,255,0.5) 0)!important;';
      volumeRange.style = color;
      break;
    case 3:
      volumeIcon.innerHTML = '<i class="fal fa-volume-down"></i>';
      volumeRange.value = '50';
      audioItem.volume = 50 / 100;
      color = 'background : linear-gradient(to right,#fff 50%,rgba(255,255,255,0.5) 50%)!important;';
      volumeRange.style = color;
      break;
    default:
      volumeIcon.innerHTML = '<i class="fal fa-volume-up"></i>';
      volumeRange.value = '100';
      audioItem.volume = 100 / 100;
      color = 'background : linear-gradient(to right,#fff 100%,rgba(255,255,255,0.5) 0)!important;';
      volumeRange.style = color;
  }
});

// playlist

playlist.map((sound, i) => {
  playlistContainer.insertAdjacentHTML('beforeend', `<li class="track-wrap"><button class="play player-icon"></button> <span>${i + 1}. ${sound}</span></li>`);
})

