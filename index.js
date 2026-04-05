const API_URL = "https://www.omdbapi.com/?apikey=b7ae34c&s=s";

// ==========================
// CONFIG
// ==========================
const API_KEY = "b7ae34c";
const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filter");

// ==========================
// LOCAL STORE MOVIES
// ==========================
const moviesData = [
  { title: "Episode I - The Phantom Menace", price: 19.95, img: "./assets/episode 1.jpg" },
  { title: "Episode II - Attack of the Clones", price: 39.95, img: "./assets/episode 2.jpg" },
  { title: "Episode III - Revenge of the Sith", price: 9.95, img: "./assets/episode 3.jpg" },
  { title: "Episode IV - A New Hope", price: 14.95, img: "./assets/episode 4.jpg" },
  { title: "Episode V - The Empire Strikes Back", price: 29.95, img: "./assets/episode 5.jpg" }
];

// ==========================
// HELPER FUNCTIONS
// ==========================

// Display movies in container
function displayMovies(movies, isAPI = false) {
  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies to display</p>";
    return;
  }

  moviesContainer.innerHTML = movies.map(movie => `
    <div class="${isAPI ? "movie" : "movie"}">
      <img src="${isAPI ? movie.Poster : movie.img}" alt="${isAPI ? movie.Title : movie.title}">
      <h3>${isAPI ? movie.Title : movie.title}</h3>
      <p>${isAPI ? movie.Year : `$${movie.price.toFixed(2)}`}</p>
    </div>
  `).join("");
}

// Get search input value
function getUserInput() {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a movie name");
    return null;
  }
  return query;
}

// Fetch movies from OMDb API
async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();

    if (data.Search) {
      displayMovies(data.Search, true);
    } else {
      moviesContainer.innerHTML = "<p>No results found</p>";
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    moviesContainer.innerHTML = "<p>Error fetching movies</p>";
  }
}

// Handle search action
function handleSearch() {
  const query = getUserInput();
  if (!query) return;
  fetchMovies(query);
}

// Filter / sort local store movies
function filterMovies(e) {
  const value = e.target.value;
  let sorted = [...moviesData];

  if (value === "LOW_TO_HIGH") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === "HIGH_TO_LOW") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayMovies(sorted);
}

// ==========================
// EVENT LISTENERS
// ==========================
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") handleSearch();
});

filterSelect.addEventListener("change", filterMovies);

// ==========================
// INITIAL LOAD
// ==========================
displayMovies(moviesData);