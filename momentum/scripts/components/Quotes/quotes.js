import { getRandomNum } from '../../helpers/index.js';
export const changeQuoteBtn = document.querySelector('.change-quote');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

export const getQuote = async () => {
  const url = 'https://type.fit/api/quotes'
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
  console.log(currentQuote)
}

function getRandomQuote(arr) {
  let randomNum = getRandomNum(0, 99);
  return arr[randomNum];
}
