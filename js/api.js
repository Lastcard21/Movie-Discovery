export async function getPopularMovies() {
    try {

        const url = "https://api.themoviedb.org/3/movie/popular";
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2JjOTdkZjM5ODUwNjQ0N2IxNTc4MTdlMWExYmZmMSIsIm5iZiI6MTc4NjYyOTc0Mi44ODk5OTk5LCJzdWIiOiI2YTdkY2U2ZTQ3OWVkM2Q1YjE1Zjg1MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iPZZVKMPM96vZa2_j3MrIQcznPlwGYMmGttssjscZjE`
            }
        })
        const popularMoviesData = await response.json();
        console.log(popularMoviesData)
        return popularMoviesData;
        

    } catch (error) {
        console.log(error);
    }
    
}







export async function getTopRatedMovies() {
    try {
        const url = "https://api.themoviedb.org/3/movie/top_rated";
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2JjOTdkZjM5ODUwNjQ0N2IxNTc4MTdlMWExYmZmMSIsIm5iZiI6MTc4NjYyOTc0Mi44ODk5OTk5LCJzdWIiOiI2YTdkY2U2ZTQ3OWVkM2Q1YjE1Zjg1MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iPZZVKMPM96vZa2_j3MrIQcznPlwGYMmGttssjscZjE`
            }
        })

        const topRatedMoviesData = await response.json();
        console.log(topRatedMoviesData);
        return topRatedMoviesData;
        
    } catch (error) {
        console.log(error);
    }

}





export async function searchMovies(query) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2JjOTdkZjM5ODUwNjQ0N2IxNTc4MTdlMWExYmZmMSIsIm5iZiI6MTc4NjYyOTc0Mi44ODk5OTk5LCJzdWIiOiI2YTdkY2U2ZTQ3OWVkM2Q1YjE1Zjg1MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iPZZVKMPM96vZa2_j3MrIQcznPlwGYMmGttssjscZjE`
            }
        })

        const searchMoviesData = await response.json();
        console.log(searchMoviesData);
        return searchMoviesData;
    } catch (error) {
        console.log(error);
    }

}