const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const rec = document.querySelector('.rec');
const home = document.querySelector('.home');



const API_URL_top = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top'
const API_URL_new = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres'
const API_URL_search = "https://kinopoiskapiunofficial.tech/api/v2.2/films/search-by-keyword/keyword="

getMovies(API_URL_top);

async function getMovies(URL,searchTerm) {
    const data = [];
    if (typeof(searchTerm) == "undefined" && searchTerm == null){
        const result = await fetch(URL, {
           method: 'GET',
           headers: {
                'X-API-KEY': '79012899-2016-4077-9388-1ce05b3d8677',
                'Content-Type': 'application/json',
               },
        })
        data.push(await result.json());
    } else {
        // const result = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/keyword=${searchTerm}&page=1`, {
        //     method: 'GET',
        //     headers: {
        //         'X-API-KEY': '79012899-2016-4077-9388-1ce05b3d8677',
        //         'Content-Type': 'application/json',
        //     },
        // })
        // data.push(await result.json());
    }
    // film = data[0]['films'];
    
    // film.forEach((movie) => {
    //     const {filmId} = movie;
    //     const result = fetch(`https://kinopoiskapiunofficial.tech/api/v1/reviews/filmId=${filmId}&page=1`, {
    //         method: 'GET',
    //         headers: {
    //             'X-API-KEY': '79012899-2016-4077-9388-1ce05b3d8677',
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     console.log(await result.json) 
        

    // })
    //const movies = [];
    //data[0]['films'].forEach(movie => infoMovies(movies,movie));
    showMovies(data);
}




function showMovies(movies) {
    main.innerHTML = '';
    film = movies[0]['films'];
    film.forEach((movie) => {
        const {nameRu, posterUrl, rating, description} = movie;
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
    );
}

async function infoMovies(movies,movie){
    const{filmId} = movie;
    const result = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/'+filmId, {
        method: 'GET',
        headers: {
            'X-API-KEY': '79012899-2016-4077-9388-1ce05b3d8677',
            'Content-Type': 'application/json',
        },
    })
    console.log(await result.json())
    movies.push(await result.json());
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
    if(searchTerm !== '') {
        main.innerHTML = '';
        getMovies(API_URL_search,searchTerm);
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
