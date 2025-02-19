const filmSearchInput = document.getElementById("film-search")
const searchBtn = document.getElementById("search-btn")
const searchResultsContainer = document.getElementById("search-results-container")



searchBtn.addEventListener('click', ()=> {
    const userInput = filmSearchInput.value
    if(userInput){
        handleSearch(userInput);
    }
    
} )





async function handleSearch(searchRequest) {
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

            let html = ``


            movieDetails.forEach(movie => {
                html += `
                <div id="movie-id" class="movie">
                <img id="movie-img" class="movie-img" src="${movie.Poster}" alt="">
                <div id="movie-info" class="movie-info">
                    <div id="movie-title-container" class="movie-title-container">
                        <h2 id="movie-title" class="movie-title">${movie.Title}</h2>
                        <i class="fa-solid fa-star movie-star-icon"></i>
                        <p id="movie-raiting" class="movie-raiting">${movie.imdbRating}</p>
                    </div>
                    <div class="movie-subtitle-container">
                        <p class="movie-duration" id="movie-duration">${movie.Runtime}</p>
                        <p id="movie-genre" class="movie-genre">${movie.Genre}</p>
                        <button id="add-to-watchlist-btn" class="add-to-watchlist-btn"><span><i class="fa-solid fa-circle-plus add-to-my-watchlist-icon"></i></span> Watchlist</button>
                    </div>
                    
                    <p id="movie-plot" class="movie-plot">${movie.Plot}</p>
                    
                </div>
                
            </div>
            <div id="movie-separator" class="movie-separator"></div>
                `
              
            })

           
            

            searchResultsContainer.innerHTML= html


            

            console.log(movieDetails); // Full details of all movies
        } else {
            console.error("No movies found:", data.Error);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}



//poster
//movie title
//rating
//duration
//genre
//plot