import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import axios from "axios"
import MovieE from './components/movieEe.jsx';
import MovieF from "./components/movieIf.jsx";
import MovieT from './components/movieTe.jsx';

function App() {
 const [count, setCount] = useState(0);
const [person, setPerson] = useState({});
const [dragonBall, setDragonBall] = useState({});
const [loading, setLoading] = useState(true);
const [pokemon, setPokemon] = useState({});
const [filme, setFilme] = useState({});
const [error, setError] = useState(false);
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

if(loading){return (<div>Carregando</div>)}
if(error){return(<div>Ocorreu um erro</div>)}
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={dragonBall.image} className="base" width="170" height="179" alt="" />
          <MovieE />
          <MovieF />
          <MovieT />
        </div>
        <div>
          <h1>{person[44].nome}</h1>
          <p>Raça: {dragonBall.race}</p>
          <h2>Meu pet: {pokemon.name}</h2>
          <img src={pokemon.sprites?.front_default} alt="Bulbasaur" width="150" />
          <p>Tipo: {pokemon.types?.map((tipo) => tipo.type.name).join(", ")}</p>
        </div>
        
        <h2>Meu filme favorito: {filme.Title}</h2>
          <p>Gênero: {filme.Genre}</p>
          <p>Premiações: {filme.Awards}</p>
          <p>Nota IMDb: {filme.imdbRating}</p>
          <p>Rotten Tomatoes: {filme.Ratings?.find((nota) => nota.Source === "Rotten Tomatoes")?.Value || "Não disponível"}</p>
      </section> 
      
    
    </>
  )
}

export default App
