const filmSearchInput = document.getElementById("film-search");
const searchBtn = document.getElementById("search-btn");
const searchResultsContainer = document.getElementById("search-results-container");
const myWatchlistArr = [];
let allMovies = [];
const myWatchlistContainer = document.getElementById("my-watchlist-container");
const startExploring = document.getElementById("start-exploring");
const errorMessageMain = document.getElementById("error-message-main");

searchBtn.addEventListener("click", () => {
  startExploring.classList.add("hidden");
  const userInput = filmSearchInput.value;
  if (userInput) {
    handleSearch(userInput);
  }
});

async function handleSearch(searchRequest) {
  const apiKey = "976c63cc"; 
  const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchRequest}`;

  try {
    errorMessageMain.classList.add("hidden");

    // Fetch the search results
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.Response === "True") {
      

      // Fetch full details for each movie using imdbID
      const movieDetailsPromises = data.Search.map((movie) =>
        fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`
        ).then((res) => res.json())
      );

      // Wait for all requests to complete
      const movieDetails = await Promise.all(movieDetailsPromises);

      let html = ``;

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
                `;
      });

      searchResultsContainer.innerHTML = html;
      allMovies = movieDetails;

      //Event listener for add to my watchlist button

      document.addEventListener("click", (e) => {
        const button = e.target.closest(".add-to-watchlist-btn");
        if (button && button.dataset.buttonIndex) {
          console.log(button.dataset.buttonIndex);
          handleAddMyWatchlistBtnClick(button.dataset.buttonIndex);
        }
      });
    } else {
      console.error("No movies found:", data.Error);
      errorMessageMain.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    errorMessageMain.classList.remove("hidden");
  }
}

// handling the click on the add to my watchlist button
const handleAddMyWatchlistBtnClick = (movieItemId) => {
  // Retrieve existing watchlist or initialize an empty array
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const newMovieItem = allMovies[movieItemId];
  const { imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot } =
    newMovieItem;

  // Check if the movie is already in the watchlist
  if (!watchlist.some((movie) => movie.id === imdbID)) {
    watchlist.push({
      id: imdbID,
      poster: Poster,
      title: Title,
      rating: imdbRating,
      runtime: Runtime,
      genre: Genre,
      plot: Plot,
    });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Added to watchlist!");
  } else {
    alert("Movie is already in the watchlist!");
  }
};
