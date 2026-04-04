const API_URL = "https://www.omdbapi.com/?apikey=b7ae34c&s=s";

// API CONFIG //
const API_KEY = "b7ae34c";
const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filter");

// GET USER INPUT // 
function getUserInput() {
  const input = searchInput.value.trim();

  if (!input) {
    alert("Please enter a movie name");
    return null;
  }

  return input;
}

// FETCH MOVIES FROM API //
async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();

    if (data.Search) {
      displayAPIMovies(data.Search);
    } else {
      moviesContainer.innerHTML = "<p>No results found</p>";
    }

  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// DISPLAY API MOVIEs //
function displayAPIMovies(movies) {
  moviesContainer.innerHTML = movies.map(movie => `
    <div class="card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  `).join("");
}

// HANDLE SEARCH //
function handleSearch() {
  const query = getUserInput();

  if (!query) return;

  fetchMovies(query);
}

// ENTER KEY SUPPORT //
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});


// LOCAL MOVIE STORE DATA //
const moviesData = [
  { title: "Episode I - The Phantom Menace", price: 19.95, img: "./assets/episode 1.jpg" },
  { title: "Episode II - Attack of the Clones", price: 39.95, img: "./assets/episode 2.jpg" },
  { title: "Episode III - Revenge of the Sith", price: 9.95, img: "./assets/episode 3.jpg" },
  { title: "Episode IV - A New Hope", price: 14.95, img: "./assets/episode 4.jpg" },
  { title: "Episode V - The Empire Strikes Back", price: 29.95, img: "./assets/episode 5.jpg" }
];

// DISPLAY STORE MOVIEs //
function displayStoreMovies(movies) {
  moviesContainer.innerHTML = movies.map(movie => `
    <div class="movie">
      <img src="${movie.img}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>$${movie.price.toFixed(2)}</p>
    </div>
  `).join("");
}

// FILTER / SORT MOVIES //

function filterMovies(e) {
  const value = e.target.value;
  let sorted = [...moviesData];

  if (value === "LOW_TO_HIGH") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === "HIGH_TO_LOW") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayStoreMovies(sorted);
}



// EVENT LISTENERS //
filterSelect.addEventListener("change", filterMovies);



// INITIAL LOAD //
displayStoreMovies(moviesData);