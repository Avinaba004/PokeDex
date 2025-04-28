import React from 'react';
import './SearchBar.css';

function SearchBar({ search, setSearch, setTypeFilter }) {
  const types = [
    '', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy', 'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock', 'bug', 'ghost', 'steel'
  ];

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="">All Types</option>
        {types.map((type, idx) => (
          type && <option key={idx} value={type}>{type.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;
