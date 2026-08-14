export function displayMovies(movies, container) {
    container.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const posterUrl =
            `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const poster = document.createElement("img");

        poster.src = posterUrl;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const releaseDate = document.createElement("p");
        releaseDate.textContent = movie.release_date;

        const rating = document.createElement("p");
        rating.textContent = `⭐ ${movie.vote_average}`;

        card.appendChild(poster);
        card.appendChild(title);
        card.appendChild(releaseDate);
        card.appendChild(rating);

        container.appendChild(card);
    });
}


export function displayFeaturedMovie(movie, container) {
    container.innerHTML = "";
    const backdropUrl =
        `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    container.style.backgroundImage = `url(${backdropUrl})`;
    const content = document.createElement("div");
    content.classList.add("featured-content");

    const title = document.createElement("h1");
    title.textContent = movie.title;
    content.appendChild(title);

    const rating = document.createElement("p");
    rating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
    content.appendChild(rating);

    const year = document.createElement("p");
    year.textContent = movie.release_date.split("-")[0];
    content.appendChild(year);

    const overview = document.createElement("p");
    overview.textContent = movie.overview;
    content.appendChild(overview);

    container.appendChild(content);
}