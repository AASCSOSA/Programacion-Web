import React, { useEffect, useState, useRef } from "react";
import FertilizanteService from "../Controllers/FertilizanteService";
import { Link } from "react-router-dom";

export default function FertilizanteApp() {
  const [fertilizante, setFertilizante] = useState([]);
  const [selectedFertilizante, setSelectedFertilizante] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);
  const tableRef = useRef(null);
  const [selectdNameFertilizante, setSelectdNameFertilizante] = useState(null);

  const listarFertilizante = () => {
    FertilizanteService.findAll()
      .then((response) => {
        setFertilizante(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarFertilizante();
  }, []);

  const deleteFertilizante = (id) => {
    FertilizanteService.delete(id)
      .then((response) => {
        listarFertilizante();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (id, name) => {
    setSelectedFertilizante(id);
    setShowInsertAndConsult(false); // Ocultar los botones de "Insertar" y "Consultar"
    setSelectdNameFertilizante(name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedFertilizante(null);
        setShowInsertAndConsult(true); // Mostrar los botones de "Insertar" y "Consultar" cuando se hace clic fuera de la tabla
        setSelectdNameFertilizante(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer className="tittleFrm">Fertilizante</footer>
      <div className="container">
        <p>
          {selectdNameFertilizante
            ? `Nombre del Fertilizante: ${selectdNameFertilizante}`
            : ""}
        </p>
        <div className="table-container" ref={tableRef}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>Id Fertilizante</th>
                  <th>Cantidad</th>
                  <th>Clasificación</th>
                  <th>Costo total</th>
                  <th>Costo unitario</th>
                  <th>Domicilio distribuidora</th>
                  <th>Fecha de caducidad</th>
                  <th>Fecha de adquisicion</th>
                  <th>Lote</th>
                  <th>Marca</th>
                </tr>
              </thead>
              <tbody>
                {fertilizante.map((fertilizante) => (
                  <tr
                    key={fertilizante.id_Fertilizante}
                    onClick={() =>
                      handleRowClick(
                        fertilizante.id_Fertilizante,
                        fertilizante.clasificacion
                      )
                    }
                    className={
                      selectedFertilizante === fertilizante.id_Fertilizante
                        ? "selected"
                        : ""
                    }
                  >
                    <td>{fertilizante.id_Fertilizante}</td>
                    <td>{fertilizante.cantidad}</td>
                    <td>{fertilizante.clasificacion}</td>
                    <td>{fertilizante.costo_Total}</td>
                    <td>{fertilizante.costo_Unitario}</td>
                    <td>{fertilizante.domicilio_Distribuidora}</td>
                    <td>{fertilizante.fecha_Caducidad}</td>
                    <td>{fertilizante.fecha_Adquisicion}</td>
                    <td>{fertilizante.lote}</td>
                    <td>{fertilizante.marca}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttonsInLine">
          {showInsertAndConsult && (
            <>
              <Link to="/form-fertilizante">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  {" "}
                  <img
                    src="icons/Insertar.png"
                    alt="Insertar fertilizante"
                    className="imgInsert"
                  ></img>
                  Insertar
                </button>
              </Link>
              
            </>
          )}
          {selectedFertilizante && (
            <div className="butonsEditandDelete">
              <Link to={`/edit-fertilizante/${selectedFertilizante}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar fertilizante"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteFertilizante(selectedFertilizante)}
                className="btn btn-success"
                class="btnimagen"
                type="button"
              >
                <img
                  src="icons/Eliminar.png"
                  alt="Eliminar fertilizante"
                  className="imgEliminar"
                ></img>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
