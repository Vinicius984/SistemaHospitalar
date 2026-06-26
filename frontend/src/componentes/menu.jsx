import { Link } from "react-router-dom";
import {
  FaHospital,
  FaTachometerAlt,
  FaUserInjured,
  FaUserMd,
  FaClinicMedical,
  FaClipboardList
} from "react-icons/fa";

function Menu() {
  return (
    <nav className="menu">
      <div className="logo-menu">
        <FaHospital className="logo-icone" />

        <h2>MedCore</h2>

        <span>Sistema Hospitalar</span>
      </div>

      <Link to="/">
        <FaTachometerAlt />
        <span>Dashboard</span>
      </Link>

      <Link to="/pacientes">
        <FaUserInjured />
        <span>Pacientes</span>
      </Link>

      <Link to="/profissionais">
        <FaUserMd />
        <span>Profissionais</span>
      </Link>

      <Link to="/especialidades">
        <FaClinicMedical />
        <span>Especialidades</span>
      </Link>

      <Link to="/atendimentos">
        <FaClipboardList />
        <span>Atendimentos</span>
      </Link>
    </nav>
  );
}

export default Menu;