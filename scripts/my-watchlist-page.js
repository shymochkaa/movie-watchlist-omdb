const myWatchlistContainer = document.getElementById("my-watchlist-container");
const errorMessageMyWatchlist = document.getElementById("error-message-my-watchlist");

// Render the watchlist
const renderMyWatchlist = () => {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (watchlist.length === 0) {
    errorMessageMyWatchlist.classList.remove("hidden");
  } else {
    errorMessageMyWatchlist.classList.add("hidden");
  }

  // Clear the container before rendering
  myWatchlistContainer.innerHTML = "";

  watchlist.forEach((movie, index) => {
    const { id, poster, title, rating, runtime, genre, plot } = movie;

    // Create the movie HTML string
    const movieHTML = `  
            <div id="movie-id-${index}" class="movie">
                <img class="movie-img" src="${poster}" alt="${title}">
                <div class="movie-info">
                    <div class="movie-title-container">
                        <h2 class="movie-title">${title}</h2>
                        <i class="fa-solid fa-star movie-star-icon"></i>
                        <p class="movie-rating">${rating}</p>
                    </div>
                    <div class="movie-subtitle-container">
                        <p class="movie-duration">${runtime}</p>
                        <p class="movie-genre">${genre}</p>
                        <button class="remove-from-watchlist-btn" data-movie-id="${id}">
                            <span><i class="fa-solid fa-circle-minus remove-from-my-watchlist-icon"></i></span> Remove
                        </button>
                    </div>
                    <p class="movie-plot">${plot}</p>
                </div>
            </div>
            <div class="movie-separator"></div>
        `;

    // Append the movie HTML to the container
    myWatchlistContainer.insertAdjacentHTML("beforeend", movieHTML);
  });
};

// Initial render
renderMyWatchlist();

// Handle "Remove" button clicks
document.addEventListener("click", (e) => {
  const button = e.target.closest(".remove-from-watchlist-btn");
  if (button && button.dataset.movieId) {
    handleRemoveFromMyWatchlistBtnClick(button.dataset.movieId);
  }
});

// Remove movie from watchlist
const handleRemoveFromMyWatchlistBtnClick = (movieId) => {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  // Filter out the movie with the matching ID
  watchlist = watchlist.filter((movie) => movie.id !== movieId);

  // Save the updated watchlist to localStorage
  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  // Re-render the watchlist to reflect changes
  renderMyWatchlist();
};
