import React, { useState } from "react";
import { Link } from "react-router-dom";

const BarraNavegacionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <img
        src="Img/Logo.jpeg"
        className="toggle-menu-btn imagenLogo"
        onClick={toggleMenu}
        alt="Logo"
      />
      <ul>
        <li>
          <Link to="/ventaForMonth">Ventas</Link>
        </li>
        <li>
          <Link to="/rancho">Ranchos</Link>
        </li>
        <li>
          <Link to="/cargaForMonth">Cargas</Link>
        </li>
        <li>
          <Link to="/herramienta">Herramientas</Link>
        </li>
        <li>
          <Link to="/trabajador">Trabajadores</Link>
        </li>
        <li>
          <Link to="/pago_trabajadorForMonth">Pago Trabajadores</Link>
        </li>
        <li>
          <Link to="/comprador">Compradores</Link>
        </li>
        <li>
          <Link to="/fertilizante">Fertilizantes</Link>
        </li>
        <li>
          <Link to="/fertilizacionForMonth">Fertilizaciónes</Link>
        </li>
        <li>
          <Link to="/reporte">Reportes</Link>
        </li>
      </ul>
    </div>
  );
};

export default BarraNavegacionComponent;
