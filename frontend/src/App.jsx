import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Pacientes from "./pages/Pacientes";
import Profissionais from "./pages/Profissionais";
import Especialidades from "./pages/Especialidades";
import Atendimentos from "./pages/Atendimentos";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/profissionais" element={<Profissionais />} />
                <Route path="/especialidades" element={<Especialidades />} />
                <Route path="/atendimentos" element={<Atendimentos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;