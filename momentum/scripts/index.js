import { showTime } from './components/DateTime/time';
import { showDate } from './components/DateTime/date';
// import showGreeting from './components/Greeting/greeting';

setTimeout(function updateTime() {
  showTime();
  showDate();
  // showGreeting();
  setTimeout(updateTime, 100);
}, 100);

