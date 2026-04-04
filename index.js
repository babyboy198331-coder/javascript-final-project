// =======================
// Mobile Menu Toggle
// =======================
function openMenu() {
  const menu = document.querySelector('.menu__backdrop');
  menu.style.display = 'block';
}

function closeMenu() {
  const menu = document.querySelector('.menu__backdrop');
  menu.style.display = 'none';
}

// =======================
// Movies Data
// =======================
const moviesData = [
  {
    title: "Star wars: Episode I - The Phantom Menace",
    img: "./assets/episode 1.jpg",
    price: 14.95,
    oldPrice: 22.95,
    rating: 7.5
  },
  {
    title: "Star Wars: Episode II - Attack of the Clones",
    img: "./assets/episode 2.jpg",
    price: 14.95,
    oldPrice: 39.95,
    rating: 6.6
  },
  {
    title: "Star Wars: Episode III - Revenge of the Sith",
    img: "./assets/episode 3.jpg",
    price: 14.95,
    oldPrice: 19.95,
    rating: 7.5
  },
  {
    title: "Star Wars: Episode IV - A New Hope",
    img: "./assets/episode 4.jpg",
    price: 14.95,
    oldPrice: 19.95,
    rating: 8.6
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    img: "./assets/episode 5.jpg",
    price: 14.95,
    oldPrice: 29.95,
    rating: 8.7
  },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    img: "./assets/episode 6.jpg",
    price: 14.95,
    oldPrice: 59.95,
    rating: 8.3
  },
  {
    title: "Rogue One: A Star Wars Story",
    img: "./assets/rogue one.jpg",
    price: 14.95,
    oldPrice: 29.95,
    rating: 7.8
  },
  {
    title: "Solo: A Star Wars Story",
    img: "./assets/solo.jpg",
    price: 14.95,
    oldPrice: 29.95,
    rating: 7.0
  }
];

// =======================
// Display Movies
// =======================
const moviesContainer = document.getElementById('movies');

function displayMovies(movies) {
  moviesContainer.innerHTML = ''; // Clear container

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    movieDiv.innerHTML = `
      <figure class="movie__img--wrapper">
        <img class="movie__img" src="${movie.img}" alt="${movie.title}">
      </figure>
      <div class="movie__title">${movie.title}</div>
      <div class="movie__price">
        <span class="movie__price--normal">$${movie.oldPrice.toFixed(2)}</span> $${movie.price.toFixed(2)}
      </div>
    `;

    moviesContainer.appendChild(movieDiv);
  });
}

// Initial display
displayMovies(moviesData);

// =======================
// Filter / Sort Movies
// =======================
function filterMovies(event) {
  const value = event.target.value;
  let sortedMovies = [...moviesData];

  switch(value) {
    case "LOW_TO_HIGH":
      sortedMovies.sort((a, b) => a.price - b.price);
      break;
    case "HIGH_TO_LOW":
      sortedMovies.sort((a, b) => b.price - a.price);
      break;
    case "RATING":
      sortedMovies.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  displayMovies(sortedMovies);
}