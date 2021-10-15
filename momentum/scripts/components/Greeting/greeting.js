const greetingContainer = document.querySelector('.greeting');
export const nameContainer = document.querySelector('.name');

export const getName = () => {
  localStorage.setItem('userName', nameContainer.value);
}

export const setName = () => {
  nameContainer.value = `${localStorage.getItem('userName')}!!!`;
}

export const showGreeting = () => {
  const greeting = getTimeOfDay();
  greetingContainer.textContent = greeting;
}

export const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  switch (true) {
    case 0 <= hours && hours < 6:
      return `Good night!`
    case 6 <= hours && hours < 12:
      return `Good morning!`
    case 12 <= hours && hours < 18:
      return `Good afternoon!`
    case 18 <= hours && hours < 24:
      return `Good evening!`
    default:
      break;
  }
}


