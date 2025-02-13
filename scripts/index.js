let searchRequest = 'frozen'


async function handleSearch() {
    const apiKey = "976c63cc"; // Your API key
    const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchRequest}`;

    try {
        // Step 1: Fetch the search results
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.Response === "True") {
            console.log(data.Search); // List of movies
            console.log(data.Search[1].imdbID); // Example: Print the second movie's IMDb ID

            // Step 2: Fetch full details for each movie using imdbID
            const movieDetailsPromises = data.Search.map(movie =>
                fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`).then(res => res.json())
            );

            // Step 3: Wait for all requests to complete
            const movieDetails = await Promise.all(movieDetailsPromises);

            console.log(movieDetails); // Full details of all movies
        } else {
            console.error("No movies found:", data.Error);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

handleSearch();
