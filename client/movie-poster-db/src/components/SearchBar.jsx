const SearchBar = ({value, inputChange}) => {
  return (
    <input
    type="text"
    value={value}
    placeholder="Look around among the movies"
    onChange={inputChange}
    />
  )
}

export default SearchBar;

