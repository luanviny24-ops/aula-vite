import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const treinador = {
  nome: "Rafael Augusto Lima",
  idade: 22,
  nickname: "Rafa Trovão",
  pokemons: ["Pokébola 1", "Pokébola 2", "Pokébola 3"],
};

const maiuscula = (texto) => (texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : "");

function TrainerPage() {
  const petId = localStorage.getItem("petSorteado");
  const [pet, setPet] = useState(null);

  useEffect(() => {
    if (!petId) return;
    const buscarPet = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${petId}`);
        setPet(res.data);
      } catch (e) {
        console.error("Erro ao carregar o pet", e);
      }
    };
    buscarPet();
  }, [petId]);

  return (
    <div className="main-bg">
      <div className="container trainer-container">
        <h1>Treinador Pokémon</h1>
        <div className="card trainer-card">
          <img className="trainer-avatar" src="/avatar.svg" alt="Avatar do treinador" />
          <p><strong>Nome:</strong> {treinador.nome}</p>
          <p><strong>Idade:</strong> {treinador.idade} anos</p>
          <p><strong>Nickname:</strong> {treinador.nickname}</p>
          <p><strong>Quantidade de Pokémons:</strong> {treinador.pokemons.length}</p>

          {pet && (
            <Link to={`/pokemon/${petId}`} className="meu-pet">
              <img src={pet.sprites?.front_default} alt={pet.name} width="80" />
              <span>Meu pet: {maiuscula(pet.name)}</span>
            </Link>
          )}

          <div className="pokebolas">
            {treinador.pokemons.map((nome) => (
              <Link to="/pokemon" className="pokebola" key={nome}>
                <span className="pokebola-bola"></span>
                {nome}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerPage;