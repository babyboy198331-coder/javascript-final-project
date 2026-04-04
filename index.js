let movies = getMovies();

function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

async function renderBooks(filter) {
    const moviesWrapper = document.querySelector('.movies');
    const movies = await getMovies();

    if (filter === "LOW_TO_HIGH") {
        movies.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    } else if (filter === "HIGH_TO_LOW") {
        movies.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    } else if (filter === "RATING") {
        movies.sort((a, b) => b.rating - a.rating);
    }

    const moviesHtml = movies
    .map(movie => {
        return `<div class="movie">
              <figure class="movie__img--wrapper">
                <img class="movie__img" src="${movie.url}" alt="">
              </figure>
             <div class="movie__title">
            ${movie.title}
        </div>
        <div class="movie__ratings">
            ${ratingsHTML(movie.rating)}
        </div>
        <div class="movie__price">
            ${priceHTML(movie.originalPrice, movie.salePrice)}
        </div>
        </div>`;
    }).join("");

    moviesWrapper.innerHTML = moviesHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (salePrice) {
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`;
  }
  return `$${originalPrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";

  for (let i = 0; i < Math.floor(rating); ++i){
      ratingHTML += `<i class="fas fa-star"></i>`
  }

  if (!Number.isInteger(rating)){
      ratingHTML += `<i class="fas fa-star-half-alt"></i>`
  }
  return ratingHTML;
  }


function filterBooks(event) {
    renderMovies(event.target.value);
}

renderMovies();
function getBooks() {
  return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
    {
      id: 1,
      title: "Crack the Coding Interview",
      url: "assets/crack the coding interview.png",
      originalPrice: 49.95,
      salePrice: 14.95,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Atomic Habits",
      url: "assets/atomic habits.jpg",
      originalPrice: 39.95,
      salePrice: null,
      rating: 5,
    },
    {
      id: 3,
      title: "Can't Hurt Me",
      url: "assets/david goggins.jpeg",
      originalPrice: 29.95,
      salePrice: 14.95,
      rating: 5,
    },
    {
      id: 4,
      title: "Deep Work",
      url: "assets/deep work.jpeg",
      originalPrice: 44.95,
      salePrice: 19.95,
      rating: 5,
    },
    {
      id: 5,
      title: "The 10X Rule",
      url: "assets/book-1.jpeg",
      originalPrice: 59.95,
      salePrice: 14.95,
      rating: 4.5,
    },
    {
      id: 6,
      title: "Be Obsessed Or Be Average",
      url: "assets/book-2.jpeg",
      originalPrice: 32.95,
      salePrice: 17.95,
      rating: 4,
    },
    {
      id: 7,
      title: "Rich Dad Poor Dad",
      url: "assets/book-3.jpeg",
      originalPrice: 70.95,
      salePrice: 12.95,
      rating: 5,
    },
    {
      id: 8,
      title: "Cashflow Quadrant",
      url: "assets/book-4.jpeg",
      originalPrice: 11.95,
      salePrice: 10.95,
      rating: 4.5,
    },
    {
      id: 9,
      title: "48 Laws of Power",
      url: "assets/book-5.jpeg",
      originalPrice: 38.95,
      salePrice: 17.95,
      rating: 4.5,
    },
    {
      id: 10,
      title: "The 5 Second Rule",
      url: "assets/book-6.jpeg",
      originalPrice: 35,
      salePrice: null,
      rating: 2,
    },
    {
      id: 11,
      title: "Your Next Five Moves",
      url: "assets/book-7.jpg",
      originalPrice: 40,
      salePrice: null,
      rating: 4,
    },
    {
      id: 12,
      title: "Mastery",
      url: "assets/book-8.jpeg",
      originalPrice: 30,
      salePrice: null,
      rating: 4.5,
    }
  ]);
        }, 1000);
    });
}