import { Route, BrowserRouter, Routes } from "react-router-dom";
import Menu from "./menu.jsx";
import TrainerPage from "./pages/trainer.jsx";
import Pokemon from "./pages/pokemon.jsx";
import DragonBall from "./pages/dragonball.jsx";
import Filme from "./pages/filme.jsx";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<TrainerPage />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/dragonball" element={<DragonBall />} />
        <Route path="/filme" element={<Filme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;