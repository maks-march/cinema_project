const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const rec = document.querySelector('.rec');
const home = document.querySelector('.home');



const API_URL_top = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top'
const API_URL_new = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres'
const API_URL_search = "https://kinopoiskapiunofficial.tech/api/v2.2/films/search-by-keyword/keyword="

getMovies(API_URL_top);

async function getResult(filmId){
    const results = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/'+filmId, {
        method: 'GET',
        headers: {
            'X-API-KEY': '79012899-2016-4077-9388-1ce05b3d8677',
            'accept': 'application/json',
        },
    })
    return results;
    
}

async function getMovies(URL) {
    const data = [];
    const result = await fetch(URL, {
        method: 'GET',
        headers: {
            'X-API-KEY': '79012899-2016-4077-9388-1ce05b3d8677',
            'accept': 'application/json',
        },
    })
    data.push(await result.json());
    showMovies(data);
}




async function showMovies(movies) {
    main.innerHTML = '';
    film = movies[0]['films'];
    film.forEach((movie) => createMovies(movie));
}

async function createMovies(movie){
        const {nameRu,posterUrl,description,rating,filmId} = movie;
        setTimeout(()=>{}, 200);
        const film = getResult(filmId)
        console.log(film)
        if (posterUrl !== null && description !== '') {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${posterUrl}" alt="">
        <div class="movie-info">
        <h3>${nameRu}</h3>
        <span class="${getClassByRate(rating)}">${rating}</span>
        </div>
        <div class="overview">
        <h3>Описание</h3>
        ${description}
        </br>
        <a class= "hyperlink" href = "https://www.kinopoisk.ru/index.php?kp_query=${nameRu}">Смотреть на кинопоиске.</a>
        </div>
        `
        main.appendChild(movieEl);    
        }
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
    if(typeof(searchTerm) == "undefined" && searchTerm !== '') {
        main.innerHTML = '';
        getMovies(API_URL_search+searchTerm+'&page=1');
    } else {
        window.location.reload();
    }
});

home.addEventListener('click',()=>{
    main.innerHTML = '';
    getMovies(API_URL_top);
});
rec.addEventListener('click',()=>{
    main.innerHTML = '';
    getMovies(API_URL_new);
});
