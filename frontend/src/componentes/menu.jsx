import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="menu">
      <Link to="/">Dashboard</Link>
      <Link to="/pacientes">Pacientes</Link>
      <Link to="/profissionais">Profissionais</Link>
      <Link to="/especialidades">Especialidades</Link>
      <Link to="/atendimentos">Atendimentos</Link>
    </nav>
  );
}

export default Menu;