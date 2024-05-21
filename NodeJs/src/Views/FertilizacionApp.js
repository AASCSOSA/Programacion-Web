import React, { useEffect, useState, useRef } from "react";
import FertilizacionService from "../Controllers/FertilizacionService";
import { Link } from "react-router-dom";

export default function FertilizacionApp() {
  const [fertilizacion, setFertilizacion] = useState([]);
  const [nameRancho, setNameRancho] = useState([]);
  const [nameMarca, setNameMarca] = useState([]);
  const [selectedFertilizacion, setSelectedFertilizacion] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);
  const tableRef = useRef(null);
  const [selectedNameFertilizacion, setSelectedNameFertilizacion] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FertilizacionService.findAll();
        setFertilizacion(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const obtenerDetallesFertilizantes = async () => {
      try {
        const detallesFertilizantesPromises = fertilizacion.map((fertiliza) =>
          FertilizacionService.getFertilizacion(fertiliza.id_Fertilizacion)
        );
        const nombreRanchosPromises = fertilizacion.map((fertiliza) =>
          FertilizacionService.getNameRancho(fertiliza.id_Fertilizacion)
        );

        const detallesFertilizantes = await Promise.all(
          detallesFertilizantesPromises
        );
        const nombreRanchos = await Promise.all(nombreRanchosPromises);

        setNameMarca(detallesFertilizantes.map((response) => response.data));
        setNameRancho(nombreRanchos.map((response) => response.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (fertilizacion.length > 0) {
      obtenerDetallesFertilizantes();
    }
  }, [fertilizacion]);

  const deleteFertilizacion = (id) => {
    FertilizacionService.delete(id)
      .then(() => {
        setFertilizacion(
          fertilizacion.filter((item) => item.id_Fertilizacion !== id)
        );
        setSelectedFertilizacion(null); // Deselect the row after deletion
        setShowInsertAndConsult(true); // Show the Insert and Consult buttons after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (id, name) => {
    setSelectedFertilizacion(id);
    setShowInsertAndConsult(false); // Hide the Insert and Consult buttons when a row is selected
    setSelectedNameFertilizacion(name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedFertilizacion(null); // Deselect the row when clicking outside the table
        setShowInsertAndConsult(true); // Show the Insert and Consult buttons when clicking outside the table
        setSelectedNameFertilizacion(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer className="tittleFrm">Fertilizacion</footer>
      <div className="container">
        <p>
          {selectedNameFertilizacion
            ? `Fertilización del rancho: ${selectedNameFertilizacion}`
            : "No se esta seleccionando una fertilización"}
        </p>
        <div className="table-container" ref={tableRef}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>Id Fertilizacion</th>
                  <th>Cantidad de Aplicación</th>
                  <th>Fecha de Aplicación</th>
                  <th>Nombre del fertilizante</th>
                  <th>Nombre del rancho</th>
                </tr>
              </thead>
              <tbody>
                {fertilizacion.map((fertilizacionItem, index) => (
                  <tr
                    key={fertilizacionItem.id_Fertilizacion}
                    onClick={() =>
                      handleRowClick(
                        fertilizacionItem.id_Fertilizacion,
                        nameRancho[index]
                      )
                    }
                    className={
                      selectedFertilizacion ===
                      fertilizacionItem.id_Fertilizacion
                        ? "selected"
                        : ""
                    }
                  >
                    <td>{fertilizacionItem.id_Fertilizacion}</td>
                    <td>{fertilizacionItem.cantidad_Aplicacion}</td>
                    <td>{fertilizacionItem.fecha_Aplicacion}</td>
                    <td>{fertilizacionItem.nombre_Rancho}</td>
                    <td>{nameRancho[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttonsInLine">
          {showInsertAndConsult && (
            <>
              <Link to="/form-fertilizacion">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  {" "}
                  <img
                    src="icons/Insertar.png"
                    alt="Insertar fertilizacion"
                    className="imgInsert"
                  ></img>
                  Insertar
                </button>
              </Link>
              <Link to="/form-fertilizacion">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Buscar.png"
                    alt="Buscar fertilizacion"
                    className="imgBuscar"
                  ></img>
                  Consultar
                </button>
              </Link>
            </>
          )}
          {selectedFertilizacion && (
            <div className="butonsEditandDelete">
              <Link to={`/edit-fertilizacion/${selectedFertilizacion}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar fertilizacion"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteFertilizacion(selectedFertilizacion)}
                className="btn btn-success"
                class="btnimagen"
                type="button"
              >
                <img
                  src="icons/Eliminar.png"
                  alt="Eliminar fertilizacion"
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
