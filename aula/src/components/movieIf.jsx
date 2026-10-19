import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieIf() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('star wars');
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
        } else {
          setMovies([]); // Limpa se não encontrar nada
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        getMovies();
      } else {
        setMovies([]); // Limpa a lista se a busca estiver vazia
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [query]); // Executa sempre que a 'query' for alterada

  if (loading) {
    return (
      <div className="card">
        <h2>Nível Médio: Consumo de API OMDb com Debounce</h2>
        <p>Busca filmes assim que você para de digitar.</p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar filme..."
        />
        <p>Carregando filmes...</p>
      </div>
    );
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="card">
        <h2>Nível Médio: Consumo de API OMDb com Debounce</h2>
        <p>Busca filmes assim que você para de digitar.</p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar filme..."
        />
        <p>Nenhum filme encontrado.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Nível Médio: Consumo de API OMDb com Debounce</h2>
      <p>Busca filmes assim que você para de digitar.</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filme..."
      />
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <strong>{movie.Title}</strong> ({movie.Year})
          </li>
        ))}
      </ul>
    </div>
  );
}