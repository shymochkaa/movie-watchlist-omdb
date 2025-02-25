# Movie Watchlist 🎬

A sleek, responsive web application that allows users to search for movies and create a personalized watchlist.


## 🔗 Live Demo

Check out the live version of the app: [Movie Watchlist](https://shymochkaa.github.io/movie-watchlist-omdb/)

## 📋 Features

- **Search Movies**: Quickly find movies using the OMDb API
- **View Details**: See comprehensive information about each movie including:
  - Title
  - IMDb Rating
  - Runtime
  - Genre
  - Plot summary
- **Manage Watchlist**: 
  - Add movies to your watchlist
  - View your saved movies in a dedicated watchlist page
  - Remove movies from your watchlist

## 🛠️ Technologies Used

- **HTML5**: Modern semantic markup
- **CSS3**: Custom styling for a responsive and clean UI
- **JavaScript**: Vanilla JS for all functionality
- **Local Storage**: Persistent storage for saved watchlist items
- **OMDb API**: Movie database API for fetching film information
- **Font Awesome**: For icons and visual elements
- **Google Fonts**: Used 'Inter' font family for typography

## 🔍 How It Works

1. **Home Page**:
   - Search for any movie using the search bar
   - View search results with key details
   - Add interesting movies to your watchlist

2. **Watchlist Page**:
   - Access all saved movies
   - Review movie details
   - Remove movies from your collection

## 📱 Usage

1. Enter a movie title in the search box
2. Click "Search" to find matching movies
3. Browse through the results
4. Click the "Watchlist" button to save a movie to your personal collection
5. Navigate to "My Watchlist" page to view your saved movies
6. Click "Remove" to delete a movie from your watchlist

## 🔧 API Integration

This application uses the [OMDb API](https://www.omdbapi.com/) to fetch movie data. The API key is included in the code for demonstration purposes.

## 💾 Data Storage

The watchlist is stored in the browser's localStorage, allowing the data to persist between sessions without requiring a backend server.

## 🖥️ Project Structure

```
movie-watchlist/
├── css/
│   └── index.css         # Styling for all pages
├── scripts/
│   ├── index.js          # Main page functionality
│   └── my-watchlist-page.js # Watchlist page functionality
├── pages/
│   └── my-watchlist-page.html # Watchlist page
├── images/
│   └── header.png        # Header background image
└── index.html            # Main search page
```

## 🚀 Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/shymochkaa/movie-watchlist.git
   ```

2. Open `index.html` in your browser or use a local server:
   ```
   # Using Python to create a simple HTTP server
   python -m http.server
   ```

3. Start searching for your favorite movies!

## 🔮 Future Enhancements

- Filter movies by genre, release year, or rating
- Add sorting options for search results
- Implement user authentication for cloud-based watchlist storage
- Add movie recommendations based on watchlist items


## 🙏 Acknowledgments

This project was created as part of Scrimba's Frontend Developer Career Path. Thanks to:
* The Scrimba team for the project requirements and learning experience
* The OMDb API for providing the movie data
* Font Awesome for the icons
* Google Fonts for the typography

▶️ Check out the [Scrimba Frontend Career Path](https://scrimba.com/frontend-path-c0j)
