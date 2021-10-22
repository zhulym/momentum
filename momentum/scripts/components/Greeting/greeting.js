const greetingContainer = document.querySelector('.greeting');
export const langForGreeting = document.querySelectorAll('.lang__item');
let greetingLang;
export const nameContainer = document.querySelector('.name');
let appSettings = JSON.parse(localStorage.getItem('momentum'));

export const getName = () => {
  localStorage.setItem('userName', nameContainer.value);
}

export function changePlaceholder(e) {
  if (appSettings?.lang === 'EN') nameContainer.placeholder = '[Enter name...]';
  else nameContainer.placeholder = '[Введите имя...]';

  if (!e) return;

  if (e.target.textContent === 'РУС') nameContainer.placeholder = '[Введите имя...]';
  else nameContainer.placeholder = '[Enter name...]';
}

export const setName = () => {
  nameContainer.value = localStorage.getItem('userName') === null ? '' : `${localStorage.getItem('userName')}`;
}

export const showGreeting = () => {
  const greeting = getTimeOfDay();
  greetingContainer.textContent = greeting;
}

export const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  langForGreeting.forEach(el => el.classList.contains('lang-active') ? greetingLang = el.textContent : null);
  switch (true) {
    case 0 <= hours && hours < 6:
      return greetingLang === 'EN' ? 'Good night!' : 'Доброй ночи!';
    case 6 <= hours && hours < 12:
      return greetingLang === 'EN' ? 'Good morning!' : 'Доброе утро!';
    case 12 <= hours && hours < 18:
      return greetingLang === 'EN' ? 'Good afternoon!' : 'Добрый день!';
    case 18 <= hours && hours < 24:
      return greetingLang === 'EN' ? 'Good evening!' : 'Добрый вечер!';
    default:
      break;
  }
}


