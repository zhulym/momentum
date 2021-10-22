import { playlist } from '../../constants/constants.js';

export const audioItem = document.querySelector('.audio__item');
export const volumeRange = document.querySelector('#volume__range');
export const audioRange = document.querySelector('#audio__range');
export const playBtn = document.querySelector('.play');
export const volumeIcon = document.querySelector('.volume__icon');
export const prevBtn = document.querySelector('.play-prev');
export const nextBtn = document.querySelector('.play-next');
const timeCurrent = document.querySelector('.time__current');
const timeEnd = document.querySelector('.time__end');
const playlistContainer = document.querySelector('.play-list');
const songTitle = document.querySelector('.song__title');
export let listItems;
export let listBtn;
let buffer = document.querySelector('.time__buffer');
let isPlay = false;
let duration = audioItem.duration;
let isMute = false;
let numTrack = 0;

document.addEventListener('DOMContentLoaded', function () {
  listItems = Array.from(document.getElementsByClassName('track-wrap'));
  listBtn = Array.from(document.getElementsByClassName('list-btn'));
})

playlist.map((sound, i) => {
  playlistContainer.insertAdjacentHTML('beforeend', `<li class="track-wrap"><button data-id="${i}" class="play player-icon list-btn"></button> <span>${i + 1}. ${sound}</span></li>`);
})

export function playStop() {
  if (isPlay === false) {
    if (playlist[numTrack] !== songTitle.textContent) audioItem.src = `./assets/sounds/${playlist[numTrack]}.mp3`;
    listItems[numTrack].classList.add('active');
    listBtn[numTrack].classList.add('pause');
    songTitle.textContent = playlist[numTrack];
    audioItem.play();
    playBtn.classList.toggle('pause');
    isPlay = true;
  } else {
    listBtn.forEach(btn => btn.classList.remove('pause'));
    listItems.forEach(el => el.classList.remove('active'));
    audioItem.pause();
    playBtn.classList.toggle('pause');
    isPlay = false;
  }
}

export function handlePrev() {
  if (numTrack === 0) numTrack = listItems.length - 1;
  else numTrack--;
  handlePrevNext();
}
export function handleNext() {
  if (numTrack === listItems.length - 1) numTrack = 0;
  else numTrack++;
  handlePrevNext();
}

function handlePrevNext() {
  audioRange.value = 0;
  let color = 'background : linear-gradient(to right,#fff 0%,rgba(255,255,255,.5) 0%)!important;';
  audioRange.style = color;
  listBtn.forEach(btn => btn.classList.remove('pause'));
  listItems.forEach(el => el.classList.remove('active'));
  audioItem.pause();
  audioItem.src = `./assets/sounds/${playlist[numTrack]}.mp3`;
  listItems[numTrack].classList.add('active');
  listBtn[numTrack].classList.add('pause');
  songTitle.textContent = playlist[numTrack];
  if (isPlay) audioItem.play();
  else listBtn.forEach(btn => btn.classList.remove('pause'));
}

export function handleListBtn(event) {
  if (numTrack === Number(event.target.dataset.id) && isPlay) {
    listBtn.forEach(btn => btn.classList.remove('pause'));
    listItems.forEach(el => el.classList.remove('active'));
    audioItem.pause();
    playBtn.classList.toggle('pause');
    isPlay = false;
    return;
  }
  listBtn.forEach(btn => btn.classList.remove('pause'));
  listItems.forEach(el => el.classList.remove('active'));
  numTrack = Number(event.target.dataset.id);
  event.target.classList.toggle('pause');
  isPlay = true;
  if (playlist[numTrack] !== songTitle.textContent) audioItem.src = `./assets/sounds/${playlist[numTrack]}.mp3`;
  listItems[numTrack].classList.add('active');
  songTitle.textContent = playlist[numTrack];
  audioItem.play();
  playBtn.classList.add('pause');
}

export function updateAudioProgress() {
  audioItem.currentTime = (this.value / 100) * audioItem.duration
  let rangeValue = audioRange.value;
  let color = 'background : linear-gradient(to right,#fff ' + rangeValue + '%,rgba(255,255,255,.5) ' + rangeValue + '%)!important;';
  audioRange.style = color;
}

export function showProgress() {
  timeCurrent.textContent = getTime(audioItem.currentTime);
  timeEnd.textContent = getTime(audioItem.duration);
  let barLength = (audioItem.currentTime / audioItem.duration) * 100;

  if (isNaN(barLength)) audioRange.value = '1';
  else audioRange.value = barLength;

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

function getTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - (minutes * 60))
  let minuteValue;
  let secondsValue;
  if (minutes < 10) minuteValue = '0' + minutes;
  else minuteValue = minutes;
  if (seconds < 10) secondsValue = '0' + seconds;
  else secondsValue = seconds;
  return isNaN(time) ? '00:00' : minuteValue + ':' + secondsValue
}

export function changeVolOnInput() {
  let vlmRangeVal = volumeRange.value;
  let color = 'background : linear-gradient(to right,#fff ' + vlmRangeVal + '%,rgba(255,255,255,.5) ' + vlmRangeVal + '%)!important;';
  volumeRange.style = color;
  if (vlmRangeVal >= 51) volumeIcon.innerHTML = '<i class="fal fa-volume-up"></i>';
  if (vlmRangeVal <= 50) volumeIcon.innerHTML = '<i class="fal fa-volume-down"></i>';
  if (vlmRangeVal <= 30) volumeIcon.innerHTML = '<i class="fal fa-volume-off"></i>';
  if (vlmRangeVal <= 1) volumeIcon.innerHTML = '<i class="fal fa-volume-mute"></i>';
  audioItem.volume = vlmRangeVal <= 1 ? 0 : this.value / 100;
}

export function changeVolOnClick() {
  let color;
  if (!isMute) {
    isMute = true;
    volumeIcon.innerHTML = '<i class="fal fa-volume-mute"></i>';
    volumeRange.value = '0';
    audioItem.volume = 0 / 100;
    color = 'background : linear-gradient(to right,#fff 0,rgba(255,255,255,0.5) 0)!important;';
    volumeRange.style = color;
  } else {
    isMute = false;
    volumeIcon.innerHTML = '<i class="fal fa-volume-up"></i>';
    volumeRange.value = '100';
    audioItem.volume = 100 / 100;
    color = 'background : linear-gradient(to right,#fff 100%,rgba(255,255,255,0.5) 0)!important;';
    volumeRange.style = color;
  }
}

