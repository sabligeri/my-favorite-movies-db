import { useEffect, useState } from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import MoviesTable from './components/MoviesTable';
import MyFavorites from './components/MyFavorites';

function App() {

  const [movies, setMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    (searchInput.length > 0) ?
      fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=5b56c331`)
        .then(res => res.json())
        .then(movies => {
          if (movies.Response === 'True') {
            setMovies(movies.Search)
          }
        })
        .catch(error => {
          console.error("Error fetching movies:", error);
        })
      : setMovies([]);
  }, [searchInput]);


  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  }

  return (
    <>
      {!showFavorites ? (
        <>
          <SearchBar
            value={searchInput}
            inputChange={e => handleSearchInputChange(e)}
          />
          <button onClick={() => setShowFavorites(true)}>Favorites</button>
          <MoviesTable
            movies={movies}
          />
          {movies.length === 0 ? (
            <>
              <img id="mainGif" src="https://media.giphy.com/media/vNACsqooIUmcjzd5xR/giphy.gif"></img>
              <h1>HBO MIN</h1>
            </>
          ) : (null)
          }
        </>
      ) : (
        <>
          <button onClick={() => setShowFavorites(false)}>Back</button>
          <MyFavorites
          />
        </>
      )}
    </>
  )
}

export default App;
