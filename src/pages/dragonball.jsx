import { useState, useEffect } from 'react'
import '../App.css'
import axios from "axios"

function DragonBall() {
  const [person, setPerson] = useState({});
  const [dragonBall, setDragonBall] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://6a79e554674f43f4db11ebc8.mockapi.io/api/person");
        setPerson(res.data);
        const res2 = await axios.get("https://dragonball-api.com/api/characters/8");
        setDragonBall(res2.data);
        console.log("Success:", res.data);
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
        <img src={dragonBall.image} className="base" width="170" height="179" alt="Ginyu" />
        <p>Raça: {dragonBall.race}</p>
      </div>
    </section>
  )
}

export default DragonBall