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
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/ventaForMonth">Venta</Link>
        </li>
        <li>
          <Link to="/rancho">Rancho</Link>
        </li>
        <li>
          <Link to="/cargaForMonth">Carga</Link>
        </li>
        <li>
          <Link to="/herramienta">Herramienta</Link>
        </li>
        <li>
          <Link to="/trabajador">Trabajador</Link>
        </li>
        <li>
          <Link to="/pago_trabajador">Pago Trabajador</Link>
        </li>
        <li>
          <Link to="/comprador">Comprador</Link>
        </li>
        <li>
          <Link to="/fertilizante">Fertilizante</Link>
        </li>
        <li>
          <Link to="/fertilizacionForMonth">Fertilización</Link>
        </li>
        <li>
          <Link to="/reporte">Reportes</Link>
        </li>
      </ul>
    </div>
  );
};

export default BarraNavegacionComponent;
