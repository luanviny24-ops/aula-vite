import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import axios from "axios"
import { listaPokemons } from '../pokemons.js'

const maiuscula = (texto) => (texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : "")
const imagemPokemon = (numero) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numero}.png`

function Pokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idBase = Number(id) || 0;
  const dados = listaPokemons.find((p) => p.id === idBase);
  const evolucoes = dados ? dados.evolucoes : [idBase];

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [etapaEvolucao, setEtapaEvolucao] = useState(0);
  const [statusEvolucao, setStatusEvolucao] = useState({});
  const [sorteando, setSorteando] = useState(false);
  const [idRoleta, setIdRoleta] = useState(listaPokemons[0].id);

  const idEtapa = evolucoes[etapaEvolucao] ?? idBase;

  const sortearPet = () => {
    if (sorteando) return;
    const outros = listaPokemons.filter((p) => p.id !== idBase);
    const sorteado = outros[Math.floor(Math.random() * outros.length)];
    setSorteando(true);

    let passos = 0;
    const intervalo = setInterval(() => {
      const aleatorio = listaPokemons[Math.floor(Math.random() * listaPokemons.length)];
      setIdRoleta(aleatorio.id);
      passos++;
      if (passos >= 20) {
        clearInterval(intervalo);
        setIdRoleta(sorteado.id);
        setTimeout(() => {
          setSorteando(false);
          localStorage.setItem("petSorteado", sorteado.id);
          navigate(`/pokemon/${sorteado.id}`);
        }, 800);
      }
    }, 120);
  };

  useEffect(() => {
    listaPokemons.forEach((p) => {
      new Image().src = imagemPokemon(p.id);
    });
  }, []);

  useEffect(() => {
    if (!idBase) return;
    const getData = async () => {
      try {
        setLoading(true);
        setEtapaEvolucao(0);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idBase}`);
        setPokemon(res.data);
        setLoading(false);
      } catch (e) {
        console.error("Erro ao carregar API", e);
        setLoading(false);
        setError(true);
      }
    };
    getData();
  }, [idBase]);

  useEffect(() => {
    if (!idEtapa) return;
    const buscarStatus = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idEtapa}`);
        setStatusEvolucao(res.data);
      } catch (e) {
        console.error("Erro ao carregar status da evolução", e);
      }
    };
    buscarStatus();
  }, [idEtapa]);

  if (sorteando) {
    return (
      <section id="center">
        <div className="cards-container">
          <div className="perfil-card">
            <h2>Sorteando seu pet...</h2>
            <img className="roleta-img" src={imagemPokemon(idRoleta)} alt="Sorteando" width="150" />
            <p>Quem será?</p>
          </div>
        </div>
      </section>
    )
  }

  if (!idBase) {
    return (
      <section id="center">
        <div className="cards-container">
          <div className="perfil-card">
            <div className="misterio">?</div>
            <h2>Quem será o seu pet?</h2>
            <p>Aperte o botão para descobrir!</p>
            <button onClick={sortearPet}>Descobrir meu pet</button>
          </div>
        </div>
      </section>
    )
  }

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
      <div className="cards-container">
        <div className="perfil-card">
          <h2>Meu pet: {maiuscula(pokemon.name)}</h2>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} width="150" />
          <p>Tipo: {pokemon.types?.map((tipo) => tipo.type.name).join(", ")}</p>
          <div style={{ textAlign: "center" }}>
            <h3>Evolução do {maiuscula(pokemon.name)}</h3>

            <h2>{maiuscula(statusEvolucao.name)}</h2>

            <img src={imagemPokemon(idEtapa)} alt="Evolução do Pokémon" width="150" />
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
                disabled={etapaEvolucao >= evolucoes.length - 1}
              >
                Próximo ➡
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button onClick={sortearPet}>🎲 Sortear outro pet</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pokemon