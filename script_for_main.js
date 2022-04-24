const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const rec = document.querySelector('.rec');
const home = document.querySelector('.home');



const API_URL_top = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top'
const API_URL_new = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=JANUARY'
const API_URL_search = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

getMovies(API_URL_top);
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
    if (film == undefined) {
        film = movies[0]['items'];
    }
    for (let index = 0; index < 25; index++) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("готово!"), 50)
          });
        
        let res = await promise; 
        resultMovies(film[index]);
        
    }
}
async function resultMovies(movie){
        const {description,rating} = movie;
        let {filmId} = movie;
        if (filmId == undefined){
            const {kinopoiskId} = movie;
            filmId = kinopoiskId;
        }
        if (description == null){
            if (rating !== 'null'){
                getResult(filmId);                
            }
        } else {
            if (rating !== 'null'){
                createMovie(movie);
            }
        }
}
async function getResult(filmId){
    let data = [];
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 100)
      });
    
    let res = await promise; 
    const results = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/'+filmId, {
        method: 'GET',
        headers: {
            'X-API-KEY': '79012899-2016-4077-9388-1ce05b3d8677',
            'accept': 'application/json',
        },
    })
    data = (await results.json());
    createMovie(data)
}

function createMovie(movie) {
        const {nameRu,posterUrl,description} = movie
        let {rating} = movie;
        if (rating == undefined){
            const {ratingKinopoisk} = movie
            rating = ratingKinopoisk;
        }
        if (posterUrl !== null && description !== '' && nameRu !== 'Свингеры') {
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
    if(vote_average>=7) {
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
    if(searchTerm !== '') {
        main.innerHTML = '';
        getMovies(API_URL_search+searchTerm+'&page=1');
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
