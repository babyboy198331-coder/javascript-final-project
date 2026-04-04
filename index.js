const API_URL = "https://www.omdbapi.com/?apikey=b7ae34c&s=s";

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log(data); 

    displayData(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayData(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  items.forEach(movies => {
    const div = document.createElement("div");
    div.classList.add("card");

     div.innerHTML = `
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
    `;

    container.appendChild(div);
  });
}

fetchData();
const moviesData = [
  { title: "Episode I - The Phantom Menace", price: 19.95, img: "./assets/episode 1.jpg" },
  { title: "Episode II - Attack of the Clones", price: 39.95, img: "./assets/episode 2.jpg" },
  { title: "Episode III - Revenge of the Sith", price: 9.95, img: "./assets/episode 3.jpg" },
  { title: "Episode IV - A New Hope", price: 14.95, img: "./assets/episode 4.jpg" },
  { title: "Episode V - The Empire Strikes Back", price: 29.95, img: "./assets/episode 5.jpg" }
];

const moviesContainer = document.getElementById('movies');
const filterSelect = document.getElementById('filter');

function displayMovies(movies) {
  moviesContainer.innerHTML = movies.map(movie => `
    <div class="movie">
      <figure class="movie__img--wrapper">
        <img class="movie__img" src="${movie.img}" alt="${movie.title}">
      </figure>
      <div class="movie__title">${movie.title}</div>
      <div class="movie__price">$${movie.price.toFixed(2)}</div>
    </div>
  `).join('');
}

displayMovies(moviesData);

function filterMovies(event) {
  const value = event.target.value;
  let sortedMovies = [...moviesData];

  if (value === "LOW_TO_HIGH") {
    sortedMovies.sort((a, b) => a.price - b.price); // low to high
  } else if (value === "HIGH_TO_LOW") {
    sortedMovies.sort((a, b) => b.price - a.price); // high to low
  }

  displayMovies(sortedMovies);
}

filterSelect.addEventListener('change', filterMovies);