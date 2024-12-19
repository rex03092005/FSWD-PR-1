let movieCollection = [];


function addMovie(title, genre, rating, releaseYear) {
    const newMovie = { title, genre, rating, releaseYear };
    movieCollection.push(newMovie);
}

function listMoviesByGenre(genre) {
    const movies = movieCollection.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    return movies.length ? movies.map(movie => `${movie.title} (${movie.releaseYear})`).join('<br>') : 'No movies found in this genre.';
}


function findHighestRatedMovie() {
    if (movieCollection.length === 0) return 'No movies available.';
    const highestRated = movieCollection.reduce((prev, current) => (prev.rating > current.rating) ? prev : current);
    return `Highest rated movie: ${highestRated.title} (${highestRated.rating})`;
}


function listAllMovieTitles() {
    return movieCollection.length > 0 ? movieCollection.map(movie => movie.title).join(', ') : 'No movies available.';
}


function listMoviesAfterYear(year) {
    const movies = movieCollection.filter(movie => movie.releaseYear > year);
    return movies.length ? movies.map(movie => `${movie.title} (${movie.releaseYear})`).join('<br>') : `No movies released after ${year}.`;
}


document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const releaseYear = parseInt(document.getElementById('releaseYear').value);

    addMovie(title, genre, rating, releaseYear);

    
    const genreList = listMoviesByGenre(genre);
    const highestRated = findHighestRatedMovie();
    const allTitles = listAllMovieTitles();
    const recentMovies = listMoviesAfterYear(2000);
    document.getElementById('output').innerHTML = `
        <div class="section">
            <h3>Movies in Genre "${genre}":</h3>
            <div class="list">${genreList}</div>
        </div>
        <div class="section">
            <h3>Highest Rated Movie:</h3>
            <p>${highestRated}</p>
        </div>
        <div class="section">
            <h3>All Movie Titles:</h3>
            <p>${allTitles}</p>
        </div>
        <div class="section">
            <h3>Movies Released After 2000:</h3>
            <div class="list">${recentMovies}</div>
        </div>
    `;

    document.getElementById('movieForm').reset();
});