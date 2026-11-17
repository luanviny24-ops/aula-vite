import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="menu-topo">
      <NavLink to="/" end>Início</NavLink>
      <NavLink to="/pokemon">Meu pet</NavLink>
      <NavLink to="/dragonball">Dragon Ball</NavLink>
      <NavLink to="/filme">Filmes</NavLink>
    </nav>
  );
}

export default Menu;