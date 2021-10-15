export const weatherCity = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windData = document.querySelector('.wind');
const humidityData = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
let currentCity;

export async function getWeather() {
  try {
    let storage = localStorage.getItem('city');
    currentCity = (storage || storage === '') ? storage : 'Minsk';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&lang=en&appid=3c06443cc386f2d22606bf6d85515307&units=metric`;
    const res = await fetch(url);
    let weatherData = await res.json();
    renderWeatherData(weatherData);
  } catch (error) {
    console.log(error);
    showError();
  }
}

function renderWeatherData(data = {}) {
  weatherError.textContent = '';
  weatherIcon.classList = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windData.textContent = `Wind speed: ${data.wind.speed.toFixed(0)}m/s`;
  humidityData.textContent = `Humidity: ${data.main.humidity.toFixed(0)}%`;
  weatherCity.value = currentCity;
}

export function getCityWeather() {
  let currentCity = weatherCity.value;
  localStorage.setItem('city', currentCity);
  getWeather();
}

function clearWeatherError() {
  weatherIcon.textContent = '';
  temperature.textContent = '';
  windData.textContent = '';
  humidityData.textContent = '';
  weatherDescription.textContent = '';
}
function showError() {
  clearWeatherError();
  weatherError.textContent = `Hey! City not found!`;
  localStorage.removeItem('city');
}