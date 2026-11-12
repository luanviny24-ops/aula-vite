import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import MovieE from './components/movieEe.jsx';
import MovieF from "./components/movieIf.jsx";
import MovieT from './components/movieTe.jsx';

function App() {
const [person, setPerson] = useState({});
const [dragonBall, setDragonBall] = useState({});
const [loading, setLoading] = useState(true);
const [pokemon, setPokemon] = useState({});
const [filme, setFilme] = useState({});
const [error, setError] = useState(false);
const [etapaEvolucao, setEtapaEvolucao] = useState(0);
const [statusEvolucao, setStatusEvolucao] = useState({});
useEffect(() => { 
const getData = async () => { 
try { 
const res = await axios.get( "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person" ); 
setPerson(res.data); 
const res2 = await axios.get(
  "https://dragonball-api.com/api/characters/8"
);
setDragonBall(res2.data);
const res3 = await axios.get(
  "https://pokeapi.co/api/v2/pokemon/1"
);

setPokemon(res3.data);
const res4 = await axios.get(
   `https://www.omdbapi.com/?i=tt10872600&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
);
setFilme(res4.data);
console.log("Success:", res.data); 
setLoading(false); 
} 
catch (e) { 
console.error( "Erro ao carregar API", e ); 
setLoading(false); 
setError(true); 
} 
} 
getData(); 
}, []);

useEffect(() => {
  const buscarStatus = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${etapaEvolucao + 1}`
      );
      setStatusEvolucao(res.data);
    } catch (e) {
      console.error("Erro ao carregar status da evolução", e);
    }
  };
  buscarStatus();
}, [etapaEvolucao]);

if(loading){return (<div className="carregando"><div className="carregando-circulo">
  </div><p>Carregando...</p></div>)}
if(error){return(<div>Ocorreu um erro</div>)}
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={dragonBall.image} className="base" width="170" height="179" alt="" />
          <div className="filmes-grid">
          <MovieE />
          <MovieF />
          <MovieT />
        </div>
        </div>
        <div className="cards-container">
       <div className="perfil-card">
  <p>Raça: {dragonBall.race}</p>
  <h2>Meu pet: {pokemon.name}</h2>
  <img src={pokemon.sprites?.front_default} alt="Bulbasaur" width="150" />
  <p>Tipo: {pokemon.types?.map((tipo) => tipo.type.name).join(", ")}</p>
  <div style={{ textAlign: "center" }}>
  <h3>Evolução do Bulbasaur</h3>

  <h2>
    {["Bulbasaur", "Ivysaur", "Venusaur"][etapaEvolucao]}
  </h2>

  <img
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${etapaEvolucao + 1}.png`}
    alt="Evolução do Pokémon"
    width="150"
  />
  <div className="status-pokemon">
  {statusEvolucao.stats?.map((s) => (
    <div className="status-linha" key={etapaEvolucao + s.stat.name}>
      <span>{{ hp: "HP", attack: "Ataque", defense: "Defesa", "special-attack": "Atq. Esp.", "special-defense": "Def. Esp.", speed: "Veloc." }[s.stat.name]}</span>
      <div className="status-barra">
        <div className="status-preenchimento" style={{ width: `${Math.min(s.base_stat, 100)}%` }}></div>
      </div>
      <span>{s.base_stat}</span>
    </div>
  ))}
</div>

  <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
    <button
      onClick={() => setEtapaEvolucao(etapaEvolucao - 1)}
      disabled={etapaEvolucao === 0}
    >
      ⬅ Anterior
    </button>

    <button
      onClick={() => setEtapaEvolucao(etapaEvolucao + 1)}
      disabled={etapaEvolucao === 2}
    >
      Próximo ➡
    </button>
  </div>
</div>
        </div>
        <div className="filme-card">
        <h2>Meu filme favorito: {filme.Title}</h2>
          <p>Gênero: {filme.Genre}</p>
          <p>Premiações: {filme.Awards}</p>
          <p>Nota IMDb: {filme.imdbRating}</p>
          <p>Rotten Tomatoes: {filme.Ratings?.find((nota) => nota.Source === "Rotten Tomatoes")?.Value || "Não disponível"}</p>
          </div>
          </div>
      </section> 
      
      
    
    </>
  )
}

export default App
