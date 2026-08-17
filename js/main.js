import {
    getPopularMovies,
    getTopRatedMovies,
    searchMovies
} from "./api.js";

import {
    displayMovies,
    displayFeaturedMovie,
    displayWatchlist,
    getWatchlist
} from "./ui.js";


const loading = document.getElementById("loading");


// ============================
// LOAD INITIAL MOVIES
// ============================

async function loadMovies() {

    loading.textContent = "⏳ Loading movies...";

    try {

        const movies = await getPopularMovies();

        const featuredMovie = movies.results[0];

        const topRatedMovies = await getTopRatedMovies();


        console.log("Popular:", movies);
        console.log("Top Rated:", topRatedMovies);
        console.log("Featured:", featuredMovie);


        displayFeaturedMovie(
            featuredMovie,
            document.getElementById("featuredMovie")
        );


        displayMovies(
            movies.results,
            document.getElementById("popularMovies")
        );


        displayMovies(
            topRatedMovies.results,
            document.getElementById("topRatedMovies")
        );


    } catch (error) {

        console.error("Error loading movies:", error);

        loading.textContent =
            "⚠️ Failed to load movies. Please try again.";

    } finally {

        // Remove loading message after everything finishes
        setTimeout(() => {
            loading.textContent = "";
        }, 500);

    }
}


loadMovies();


// ============================
// SEARCH
// ============================

const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("searchInput");


searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const query = searchInput.value.trim();


    if (query === "") {
        return;
    }


    loading.textContent =
        `Searching for "${query}"...`;


    try {

        const data = await searchMovies(query);


        if (!data.results || data.results.length === 0) {

            loading.textContent =
                `No movies found for "${query}"`;

            return;
        }


        displayMovies(
            data.results,
            document.getElementById("searchResults")
        );
        document.getElementById("searchResults").scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error("Search error:", error);

        loading.textContent =
            "Something went wrong while searching.";


    } finally {

        setTimeout(() => {

            loading.textContent = "";

        }, 1500);

    }

});


displayWatchlist(
    getWatchlist(),
    document.getElementById("watchlistMovies")
);