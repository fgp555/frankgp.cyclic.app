const movieListContainer = document.getElementById("movieList");

const movieElements = tempData.map((movie) => {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("card_item");

  movieDiv.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>Year: ${movie.year}</p>
    <p>Director: ${movie.director}</p>
    <p>Duration: ${movie.duration}</p>
    <p>Genre: ${movie.genre.join(", ")}</p>
    <p>Rating: ${movie.rate}</p>
  `;

  movieListContainer.appendChild(movieDiv);

  return movieDiv;
});
