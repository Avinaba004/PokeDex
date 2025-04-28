import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import Loader from './components/Loader';
import Error from './components/Error';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';  
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(details);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? pokemon.types.some(t => t.type.name === typeFilter) : true;
    return matchesSearch && matchesType;
  });

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="app">
      <Header />
      <SearchBar search={search} setSearch={setSearch} setTypeFilter={setTypeFilter} />
      {filteredPokemons.length ? (
        <PokemonList pokemons={filteredPokemons} />
      ) : (
        <EmptyState />
      )}
      <Footer /> 
    </div>
  );
}

export default App;
