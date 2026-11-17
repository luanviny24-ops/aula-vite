import { Route, BrowserRouter, Routes } from "react-router-dom";
import TrainerPage from "./pages/trainer.jsx";
import Pokemon from "./pages/pokemon.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrainerPage />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;