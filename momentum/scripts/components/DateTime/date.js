const dateContainer = document.querySelector('.date');

export const showDate = () => {
  const date = new Date();
  const options = { month: 'long', day: 'numeric', weekday: 'long' };
  const currentDate = date.toLocaleDateString('en-US', options);
  dateContainer.textContent = currentDate;
}