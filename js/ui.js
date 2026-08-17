import { getMovieTrailer } from "./api.js";

function addToWatchlist(movie) {
    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    const alreadySaved = watchlist.some(
        savedMovie => savedMovie.id === movie.id
    );

    if (alreadySaved) {
        alert("Movie is already in your watchlist.");
        return;
    }

    watchlist.push(movie);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    alert(`${movie.title} added to your watchlist.`);


    // Refresh the watchlist on the page
    displayWatchlist(
        getWatchlist(),
        document.getElementById("watchlistMovies")
    );
}


export function displayMovies(movies, container) {
    container.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.addEventListener("click", () => {
            displayMovieDetails(movie)
        })


        const watchlistButton = document.createElement("button");

        watchlistButton.textContent = "Add to Watchlist";

        watchlistButton.classList.add("watchlist-btn");

        watchlistButton.addEventListener("click", (event) => {
            event.stopPropagation();
            addToWatchlist(movie);
        })


        const poster = document.createElement("img");

        if (movie.poster_path) {
            poster.src =
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        } else {
            poster.src = "./images/no-poster.jpg";
        }

        poster.alt = movie.title;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const releaseDate = document.createElement("p");
        releaseDate.textContent =
            movie.release_date || "Release date unavailable";

        const rating = document.createElement("p");
        rating.textContent = `⭐ ${movie.vote_average}`;
        
        releaseDate.classList.add("movie-year");
        rating.classList.add("movie-rating");

        card.appendChild(poster);
        card.appendChild(title);
        card.appendChild(releaseDate);
        card.appendChild(rating);
        card.appendChild(watchlistButton);

        container.appendChild(card);
    });
}


export function getWatchlist() {
    return JSON.parse(
        localStorage.getItem("watchlist")
    ) || [];
}

export function removeFromWatchlist(movieId) {
    let watchlist = getWatchlist();

    watchlist = watchlist.filter(
        movie => movie.id !== movieId
    );

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );
}


export function displayWatchlist(movies, container) {
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML = "<p>Your watchlist is empty.</p>";
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("watchlist-card");

        const poster = document.createElement("img");

        if (movie.poster_path) {
            poster.src =
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        } else {
            poster.src = "./images/no-poster.jpg";
        }

        poster.alt = movie.title;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const rating = document.createElement("p");
        rating.textContent = `⭐ ${movie.vote_average}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("watchlist-btn");

        removeButton.addEventListener("click", () => {
            removeFromWatchlist(movie.id);
            displayWatchlist(
                getWatchlist(),
                container
            );
        });

        card.appendChild(poster);
        card.appendChild(title);
        card.appendChild(rating);
        card.appendChild(removeButton);

        container.appendChild(card);
    });
}




export function displayFeaturedMovie(movie, container) {
    container.innerHTML = "";

    if (movie.backdrop_path) {

        const backdropUrl =
            `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

        container.style.backgroundImage =
            `url(${backdropUrl})`;

    } else {

        container.style.backgroundImage =
            "none";

    }

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


    // WATCH TRAILER BUTTON
    const trailerButton = document.createElement("button");

    trailerButton.textContent = "▶ Watch Trailer";

    trailerButton.classList.add("trailer-btn");


    trailerButton.addEventListener("click", async () => {

        const videos = await getMovieTrailer(movie.id);

        const trailer = videos.find(video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if (!trailer) {
            alert("Trailer not available.");
            return;
        }


        const modal = document.createElement("div");

        modal.classList.add("trailer-modal");


        const modalContent = document.createElement("div");

        modalContent.classList.add("trailer-modal-content");


        const closeButton = document.createElement("button");

        closeButton.textContent = "✕";

        closeButton.classList.add("close-trailer");


        const iframe = document.createElement("iframe");

        iframe.src =
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;

        iframe.title = `${movie.title} Trailer`;

        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

        iframe.allowFullscreen = true;


        modalContent.appendChild(closeButton);

        modalContent.appendChild(iframe);

        modal.appendChild(modalContent);

        document.body.appendChild(modal);


        closeButton.addEventListener("click", () => {
            modal.remove();
        });


        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                modal.remove();
            }

        });

    });


    content.appendChild(trailerButton);


    // Add everything to the page
    container.appendChild(content);
}





export function displayMovieDetails(movie) {

    const modal = document.createElement("div");
    modal.classList.add("movie-details-modal");

    const content = document.createElement("div");
    content.classList.add("movie-details-content");

    const closeButton = document.createElement("button");
    closeButton.textContent = "✕";
    closeButton.classList.add("close-details");

    const poster = document.createElement("img");

    poster.src =
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    poster.alt = movie.title;

    const info = document.createElement("div");
    info.classList.add("movie-details-info");

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const rating = document.createElement("p");
    rating.textContent =
        `⭐ ${movie.vote_average.toFixed(1)}`;

    const releaseDate = document.createElement("p");
    releaseDate.textContent =
        `Release: ${movie.release_date || "Unavailable"}`;

    const overview = document.createElement("p");
    overview.textContent =
        movie.overview || "No description available.";


    // WATCH TRAILER BUTTON
    const trailerButton = document.createElement("button");

    trailerButton.textContent = "▶ Watch Trailer";

    trailerButton.classList.add("trailer-btn");


    trailerButton.addEventListener("click", async () => {

        const videos = await getMovieTrailer(movie.id);

        const trailer = videos.find(video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if (!trailer) {
            alert("Trailer not available.");
            return;
        }


        const trailerModal = document.createElement("div");

        trailerModal.classList.add("trailer-modal");


        const trailerContent =
            document.createElement("div");

        trailerContent.classList.add(
            "trailer-modal-content"
        );


        const closeTrailer =
            document.createElement("button");

        closeTrailer.textContent = "✕";

        closeTrailer.classList.add(
            "close-trailer"
        );


        const iframe =
            document.createElement("iframe");

        iframe.src =
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;

        iframe.title =
            `${movie.title} Trailer`;

        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

        iframe.allowFullscreen = true;


        trailerContent.appendChild(closeTrailer);

        trailerContent.appendChild(iframe);

        trailerModal.appendChild(trailerContent);

        document.body.appendChild(trailerModal);


        closeTrailer.addEventListener("click", () => {
            trailerModal.remove();
        });


        trailerModal.addEventListener("click", (event) => {

            if (event.target === trailerModal) {
                trailerModal.remove();
            }

        });

    });


    // Add elements to movie information
    info.appendChild(title);

    info.appendChild(rating);

    info.appendChild(releaseDate);

    info.appendChild(overview);

    info.appendChild(trailerButton);


    // Add elements to modal
    content.appendChild(closeButton);

    content.appendChild(poster);

    content.appendChild(info);

    modal.appendChild(content);

    document.body.appendChild(modal);


    // Close movie details modal
    closeButton.addEventListener("click", () => {
        modal.remove();
    });


    // Close when clicking outside
    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            modal.remove();
        }

    });

}