export async function getPopularMovies() {
    try {

        const url = "https://api.themoviedb.org/3/movie/popular";
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGY2ZWQwMWVmYTk2MTVkMjM2MjM4OTY1N2ZhODViYyIsIm5iZiI6MTc4NjYyOTc0Mi44ODk5OTk5LCJzdWIiOiI2YTdkY2U2ZTQ3OWVkM2Q1YjE1Zjg1MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._F7oHR5t_rWXcw-u4Q2V5gacbscae3TT_uf5_RXzpkM`
            }
        })
        const popularMoviesData = await response.json();
        console.log(popularMoviesData)
        return popularMoviesData;
        

    } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
}
    
}







export async function getTopRatedMovies() {
    try {
        const url = "https://api.themoviedb.org/3/movie/top_rated";
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGY2ZWQwMWVmYTk2MTVkMjM2MjM4OTY1N2ZhODViYyIsIm5iZiI6MTc4NjYyOTc0Mi44ODk5OTk5LCJzdWIiOiI2YTdkY2U2ZTQ3OWVkM2Q1YjE1Zjg1MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._F7oHR5t_rWXcw-u4Q2V5gacbscae3TT_uf5_RXzpkM`
            }
        })

        const topRatedMoviesData = await response.json();
        console.log(topRatedMoviesData);
        return topRatedMoviesData;
        
    } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
}

}





export async function searchMovies(query) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGY2ZWQwMWVmYTk2MTVkMjM2MjM4OTY1N2ZhODViYyIsIm5iZiI6MTc4NjYyOTc0Mi44ODk5OTk5LCJzdWIiOiI2YTdkY2U2ZTQ3OWVkM2Q1YjE1Zjg1MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._F7oHR5t_rWXcw-u4Q2V5gacbscae3TT_uf5_RXzpkM`
            }
        })

        const searchMoviesData = await response.json();
        console.log(searchMoviesData);
        return searchMoviesData;
    } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
}

}


export async function getMovieTrailer(movieId) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos`,
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGY2ZWQwMWVmYTk2MTVkMjM2MjM4OTY1N2ZhODViYyIsIm5iZiI6MTc4NjYyOTc0Mi44ODk5OTk5LCJzdWIiOiI2YTdkY2U2ZTQ3OWVkM2Q1YjE1Zjg1MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._F7oHR5t_rWXcw-u4Q2V5gacbscae3TT_uf5_RXzpkM`
                }
            }
        );

        const movieTrailerData = await response.json();

        return movieTrailerData.results;

    } catch (error) {
    console.error("Error fetching trailer:", error);
    throw error;
}
}