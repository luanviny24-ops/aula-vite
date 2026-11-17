import { useState, useEffect } from 'react'
import '../App.css'
import axios from "axios"
import MovieE from '../components/movieEe.jsx';
import MovieF from "../components/movieIf.jsx";
import MovieT from '../components/movieTe.jsx';

function Filme() {
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?i=tt10872600&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
        );
        setFilme(res.data);
        setLoading(false);
      } catch (e) {
        console.error("Erro ao carregar API", e);
        setLoading(false);
        setError(true);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="carregando">
        <div className="carregando-circulo"></div>
        <p>Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="erro-tela">
        <div className="erro-icone">⚠</div>
        <h2>Ops! Algo deu errado</h2>
        <p>Não foi possível carregar os dados. Verifique sua internet e tente novamente.</p>
        <button onClick={() => window.location.reload()}>Tentar de novo</button>
      </div>
    )
  }

  return (
    <section id="center">
      <div className="hero">
        <div className="filmes-grid">
          <MovieE />
          <MovieF />
          <MovieT />
        </div>
      </div>
      <div className="cards-container">
        <div className="filme-card">
          <h2>Meu filme favorito: {filme.Title}</h2>
          {filme.Poster && filme.Poster !== "N/A" && (
            <img src={filme.Poster} alt={`Pôster de ${filme.Title}`} className="poster-filme" />
          )}
          <p>Gênero: {filme.Genre}</p>
          <p>Premiações: {filme.Awards}</p>
          <p>Nota IMDb: {filme.imdbRating}</p>
          <p>Rotten Tomatoes: {filme.Ratings?.find((nota) => nota.Source === "Rotten Tomatoes")?.Value || "Não disponível"}</p>
        </div>
      </div>
    </section>
  )
}

export default Filme