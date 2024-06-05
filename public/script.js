const TMDB_API_KEY = 'af5d59325a310881a3af0db5878d94f3';
const OMDB_API_KEY = '23d3a334';

document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchMovieData();
    }
});

async function fetchMovieData() {
    const query = document.getElementById('search').value;
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
    const tmdbData = await tmdbResponse.json();
    const movie = tmdbData.results[0];

    if (movie) {
        const omdbResponse = await fetch(`http://www.omdbapi.com/?t=${movie.title}&apikey=${OMDB_API_KEY}`);
        const omdbData = await omdbResponse.json();

        displayMovieData(movie, omdbData);
    } else {
        document.getElementById('results').innerHTML = '<p>No movie found</p>';
    }
}

function displayMovieData(movie, reviews) {
    const results = document.getElementById('results');
    results.innerHTML = `
        <div class="movie">
            <h2>${movie.title} (${movie.release_date.split('-')[0]})</h2>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>Ratings</h3>
            <p>IMDB: ${reviews.imdbRating} ${convertToStars(reviews.imdbRating)}</p>
            <p>Rotten Tomatoes: ${reviews.Ratings.find(rating => rating.Source === "Rotten Tomatoes")?.Value || 'N/A'}</p>
            <h3>Reviews</h3>
            <p>${reviews.Plot}</p>
        </div>
    `;
}

function convertToStars(rating) {
    const starsTotal = 5;
    const ratingOutOf5 = (rating / 10) * starsTotal;
    let starDisplay = '';
    for (let i = 0; i < starsTotal; i++) {
        if (i < ratingOutOf5) {
            starDisplay += '★';
        } else {
            starDisplay += '☆';
        }
    }
    return `<span class="stars">${starDisplay}</span>`;
}

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.error) {
        document.getElementById('results').innerHTML = `<p>${data.error}</p>`;
    } else {
        displayMovieData(data.movie, data.ratings);
    }
};

function fetchMovieData() {
    const query = document.getElementById('search').value;
    ws.send(query);
}

function displayMovieData(movie, ratings) {
    const results = document.getElementById('results');
    results.innerHTML = `
        <div class="movie">
            <h2>${movie.title} (${movie.release_date.split('-')[0]})</h2>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <div class="ratings">
                <h3>Ratings</h3>
                <p>IMDB: ${ratings.imdbRating}</p>
                <p>Rotten Tomatoes: ${ratings.Ratings.find(rating => rating.Source === "Rotten Tomatoes")?.Value || 'N/A'}</p>
            </div>
        </div>
    `;
}
