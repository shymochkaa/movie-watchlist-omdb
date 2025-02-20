const filmSearchInput = document.getElementById("film-search")
const searchBtn = document.getElementById("search-btn")
const searchResultsContainer = document.getElementById("search-results-container")
const myWatchlistArr = [];
let allMovies = []
const myWatchlistContainer = document.getElementById("my-watchlist-container")
console.log(myWatchlistContainer)

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


            movieDetails.forEach((movie, index) => {
                html += `
                <div id="movie-id-${index}" class="movie">
                <img id="movie-img-${index}" class="movie-img" src="${movie.Poster}" alt="">
                <div id="movie-info-${index}" class="movie-info">
                    <div id="movie-title-container-${index}" class="movie-title-container">
                        <h2 id="movie-title-${index}" class="movie-title">${movie.Title}</h2>
                        <i class="fa-solid fa-star movie-star-icon"></i>
                        <p id="movie-raiting-${index}" class="movie-raiting">${movie.imdbRating}</p>
                    </div>
                    <div class="movie-subtitle-container">
                        <p id="movie-duration-${index}" class="movie-duration" >${movie.Runtime}</p>
                        <p id="movie-genre-${index}" class="movie-genre">${movie.Genre}</p>
                        <button id="add-to-watchlist-btn--${index}" class="add-to-watchlist-btn" data-button-index="${index}" ><span><i class="fa-solid fa-circle-plus add-to-my-watchlist-icon"></i></span> Watchlist</button>
                    </div>
                    
                    <p id="movie-plot-${index}" class="movie-plot">${movie.Plot}</p>
                    
                </div>
                
            </div>
            <div id="movie-separator-${index}" class="movie-separator"></div>
                `
              
            })

           
            

            searchResultsContainer.innerHTML= html


            allMovies = movieDetails

            console.log(movieDetails); // Full details of all movies
        } else {
            console.error("No movies found:", data.Error);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

//Event listener for add to my watchlist button

document.addEventListener("click", (e) => {
    const button = e.target.closest(".add-to-watchlist-btn"); 
    if(button && button.dataset.buttonIndex) {
        console.log(button.dataset.buttonIndex)
        handleAddMyWatchlistBtnClick(button.dataset.buttonIndex)
    }
    // button && button.dataset.buttonIndex &&  handleAddToOrderBtnClick(button.dataset.buttonIndex);
  });


// handling the click on the order button
const  handleAddMyWatchlistBtnClick = (movieItemId) => {
    const newMovieItem = allMovies[movieItemId];
    console.log(newMovieItem)
    myWatchlistArr.push(newMovieItem);
    console.log(myWatchlistArr)
    const movieItemIndex = myWatchlistArr.length - 1;
    renderMovieItem(newMovieItem, movieItemIndex);
    
    
    // orderDetails.scrollIntoView({ behavior: "smooth" });
  };

  // rendering a new order item

const renderMovieItem= (movieItem, index) => {
    const { Poster, Title, imdbRating, Runtime, Genre, Plot } = movieItem;
    console.log(Poster)
    myWatchlistContainer.innerHTML  += `  
                                <div id="movie-id-${index}" class="movie">
                                <img id="movie-img-${index}" class="movie-img" src="${Poster}" alt="">
                                <div id="movie-info-${index}" class="movie-info">
                                    <div id="movie-title-container-${index}" class="movie-title-container">
                                        <h2 id="movie-title-${index}" class="movie-title">${Title}</h2>
                                        <i class="fa-solid fa-star movie-star-icon"></i>
                                        <p id="movie-raiting-${index}" class="movie-raiting">${imdbRating}</p>
                                    </div>
                                    <div class="movie-subtitle-container">
                                        <p id="movie-duration-${index}" class="movie-duration" >${Runtime}</p>
                                        <p id="movie-genre-${index}" class="movie-genre">${Genre}</p>
                                        <button id="remove-from-watchlist-btn" class="remove-from-watchlist-btn" data-remove-button-index="${index}"> <span><i class="fa-solid fa-circle-minus remove-from-my-watchlist-icon"></i></span> Remove</button>
                                    </div>
                                    
                                    <p id="movie-plot-${index}" class="movie-plot">${Plot}</p>
                                    
                                </div>
                                
                            </div>
                            <div id="movie-separator-${index}" class="movie-separator"></div>
                              `;
  
   
   
  };





//poster
//movie title
//rating
//duration
//genre
//plot