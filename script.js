const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote-text');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// Show Loading
const loading = function () {
    loader.hidden = false; 
    quoteContainer.hidden = true;
}

// Hide Loading
const complete = function () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
const newQuote = () => {
    loading();
    // Pick a random Quote from API quotes array
    const randomIndex = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[randomIndex];
    // Check if author field is black and replace it with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    // Check the Quote left to determine styling
    if (quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log("Sth goes wrong!", error)
    }
}

// Tweet Quote
const tweetQuote = function () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();