import {
    getPopularMovies,
    getTopRatedMovies,
    searchMovies
} from "./api.js";

import {
    displayMovies,
    displayFeaturedMovie
} from "./ui.js";


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



const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    
    if (query === "") {
        return;
    }
    
    const data = await searchMovies(query);
    displayMovies(
        data.results,
        document.getElementById("searchResults")
    );

})