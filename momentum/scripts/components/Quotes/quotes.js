import { getRandomNum } from '../../helpers/index.js';
export const changeQuoteBtn = document.querySelector('.change-quote');
export const langForQuote = document.querySelectorAll('.lang__item');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

let quoteLang;

//'https://type.fit/api/quotes'
export const getQuote = async () => {
  langForQuote.forEach(el => el.classList.contains('lang-active') ? quoteLang = el.textContent : null);
  const url = quoteLang === 'EN' ? 'scripts/constants/quotesEN.json' : 'scripts/constants/quotesRU.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderQuote(data);
  } catch (error) {
    console.error(error);
  }
}

function renderQuote(data) {
  let currentQuote = getRandomQuote(data);
  quote.textContent = `"${currentQuote.text}"`;
  author.textContent = currentQuote.author ? currentQuote.author : 'Noname:)';
}

function getRandomQuote(arr) {
  let randomNum = getRandomNum(0, 31);
  return arr[randomNum];
}
