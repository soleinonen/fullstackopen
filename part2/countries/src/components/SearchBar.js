const SearchBar = ({searchText, handleSearchChange}) => {
    return (
      <div>
        <div>Find countries</div>
        <input
          value = {searchText}
          onChange={handleSearchChange}
        />
      </div>
    )
  }

export default SearchBar