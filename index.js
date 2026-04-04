//  API CONFIG //
const API_KEY = "b7ae34c&search=star wars";
let currentMovies = [];

// FETCH MOVIES //
async function fetchMovies(search = "star wars") {
  const moviesContainer = document.querySelector("#features .movies");

  moviesContainer.classList.add("movies__loading");

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const data = await res.json();

    if (data.Search) {
      // Map //
      currentMovies = data.Search.map(movie => ({
        title: movie.Title,
        year: parseInt(movie.Year),
        img: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300",
        price: (Math.random() * 20 + 10).toFixed(2), 
        rating: (Math.random() * 2 + 3).toFixed(1)   
      }));

      renderMovies(currentMovies);
    } else {
      moviesContainer.innerHTML = "<p>No movies found.</p>";
    }

  } catch (error) {
    moviesContainer.innerHTML = "<p>Error loading movies.</p>";
  }

  moviesContainer.classList.remove("movies__loading");
}

// ===== RENDER =====
function renderMovies(movies) {
  const moviesContainer = document.querySelector("#features .movies");

  moviesContainer.innerHTML = movies.map(movie => `
    <div class="movie">
      <figure class="movie__img--wrapper">
        <img class="movie__img" src="${movie.img}" alt="${movie.title}">
      </figure>
      <div class="movie__title">${movie.title}</div>
      <div class="movie__year">${movie.year}</div>
      <div class="movie__price">$${movie.price}</div>
      <div class="movie__rating">⭐ ${movie.rating}</div>
    </div>
  `).join("");
}

// ===== SORT =====
function filterMovies(event) {
  const value = event.target.value;

  if (value === "LOW_TO_HIGH") {
    currentMovies.sort((a, b) => a.price - b.price);

  } else if (value === "HIGH_TO_LOW") {
    currentMovies.sort((a, b) => b.price - a.price);

  } else if (value === "RATING") {
    currentMovies.sort((a, b) => b.rating - a.rating);

  } else if (value === "NEWEST") {
    currentMovies.sort((a, b) => b.year - a.year);

  } else if (value === "OLDEST") {
    currentMovies.sort((a, b) => a.year - b.year);
  }

  renderMovies(currentMovies);
}

// ===== MENU =====
function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

// ===== SEARCH =====
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies(); 
  const searchInput = document.querySelector(".topnav input");

  let timeout;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchMovies(e.target.value);
    }, 500); 
  });
});
