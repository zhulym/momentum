const dateContainer = document.querySelector('.date');
const langForDate = document.querySelectorAll('.lang__item');
let dateLang;

export const showDate = () => {
  const date = new Date();
  const optionsEN = { month: 'long', day: 'numeric', weekday: 'long' };
  const optionsRU = { day: 'numeric', month: 'long', year: 'numeric' };
  let currentDate;
  langForDate.forEach(el => el.classList.contains('lang-active') ? dateLang = el.textContent : null);

  if (dateLang === 'EN') currentDate = date.toLocaleDateString('en-US', optionsEN);
  else currentDate = date.toLocaleDateString('ru-RU', optionsRU);

  dateContainer.textContent = currentDate;
}
