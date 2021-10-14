const greetingContainer = document.querySelector('.greeting');

const showGreeting = () => {
  const greeting = getTimeOfDay();
  greetingContainer.textContent = greeting;

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    switch (true) {
      case 0 < hours && hours < 6:
        return `Good night!`
      case 6 < hours && hours < 12:
        return `Good morning!`
      case 12 < hours && hours < 18:
        return `Good afternoon !`
      case 0 < hours && hours < 6:
        return `Good evening!`
      default:
        break;
    }
  }
}

export default showGreeting;


