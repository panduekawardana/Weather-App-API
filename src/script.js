/**
 * Fetch data api
 *
 * api -> http://www.omdbapi.com/?i=tt3896198&apikey=7af1212b
 */

// Fetch data api function
async function fetchData(keyword) {
    try {
        const apiUrl = await fetch(`http://www.omdbapi.com/?apikey=7af1212b&s=${keyword}`);

        if(!apiUrl.ok) {
            throw new Error('Terjadi kesalahan!');
        }

        const data = await apiUrl.json();

        if(!data.Search) return;
        renderMovie(data.Search);

    } catch(err) {
        console.error(err);
    }
}

function renderMovie(movies) {
    const boxContent = document.getElementById('box-content');

    const html = movies.map(movie => 
        movieBox(
            movie.Title,
            movie.Type,
            movie.Poster)).join('')

    boxContent.innerHTML = html;
}

// Search action
function searchMovie() {
    const form = document.querySelector('form');
    const input = document.getElementById('search');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    const keyword = input.value.trim();

    if(!keyword) return;

    fetchData(keyword);
    input.value = '';
}

// Box content function
function movieBox(title, type, poster) {
    return `
        <div class="min-h-56 border p-2 space-y-2">
            <img src="${poster}" alt="banner" class="h-5/6 border">
            <div class="flex items-center justify-between border">
                <span>${title}</span>
                <span>${type}</span>
            </div>
        </div>
    `;
}

function initApp() {
    fetchData('casper');
    searchMovie();
}

initApp()