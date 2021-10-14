const timeContainer = document.querySelector('.time');

export const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString('en-US', { hour12: false });
  timeContainer.textContent = currentTime;
}