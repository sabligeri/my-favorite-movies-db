import { useState } from "react";


const MoviesTable = ({ movies }) => {
  const [added, setAdded] = useState(null);
  function handleSaveToFavMovies(movie, id) {
    const poster = movie.Poster;
    const title = movie.Title;
    const year = movie.Year;
    fetch('/api/favmovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ poster, title, year })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setAdded(id)
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <table>
        <tbody>
          <tr>
            {movies.map(movie => (
              <th key={movie.imdbID}>
                <img src={(movie.Poster !== 'N/A') ? movie.Poster : './src/noMoviePoster.jpg'} />
                <h3> {movie.Title} </h3>
                <h4> {movie.Year}</h4>
                <h4> {movie.Genre}</h4>
                <button onClick={() => handleSaveToFavMovies(movie, movie.imdbID)}>{added === movie.imdbID ? '✅' : 'Add to favorites'}</button>
              </th>
            )
            )}
          </tr>
        </tbody>
      </table>
  )
}

export default MoviesTable;