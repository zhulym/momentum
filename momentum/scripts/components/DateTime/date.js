const dateContainer = document.querySelector('.date');
const langForDate = document.querySelectorAll('.lang__item');
let dateLang;

export const showDate = () => {
  const date = new Date();
  const options = { month: 'long', day: 'numeric', weekday: 'long' };
  let currentDate;
  langForDate.forEach(el => el.classList.contains('lang-active') ? dateLang = el.textContent : null);

  if (dateLang === 'EN') currentDate = date.toLocaleDateString('en-US', options);
  else currentDate = date.toLocaleDateString('ru-RU', options);

  dateContainer.textContent = currentDate;
}
