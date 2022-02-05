const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');


const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=42e6fa3f7868233b9d9dc6a7f1e3c93a&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=42e6fa3f7868233b9d9dc6a7f1e3c93a&query='

getMovies(API_URL);

async function getMovies(url) {
    const result = await fetch(url);
    const data = await result.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Обзор</h3>
        ${overview}
        <a class = "kino" href = "https://www.kinopoisk.ru/index.php?kp_query=${title}"></br>Смотреть на кинопоиске.</a>
        </div>
        `
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote_average) {
    if(vote_average>=8) {
        return 'green';
    } else if (vote_average>=5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm && search.term !== '') {
        main.innerHTML = '';
        getMovies(SEARCH_API + searchTerm);
    } else {
        window.location.reload();
    }
});
