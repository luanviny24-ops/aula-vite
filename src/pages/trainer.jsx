import { Link } from "react-router-dom";

const treinador = {
  nome: "Rafael Augusto Lima",
  idade: 22,
  nickname: "Rafa Trovão",
  pokemons: ["Bulbasaur", "Ivysaur", "Venusaur"],
};

function TrainerPage() {
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