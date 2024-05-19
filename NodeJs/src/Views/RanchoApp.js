import React, { useState, useEffect, useRef } from "react";
import RanchoService from "../Controllers/RanchoService";
import { Link } from "react-router-dom";

export default function RanchoApp() {
  const [rancho, setRancho] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const [selectedRancho, setSelectedRancho] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);

  const listarCarga = () => {
    RanchoService.findAll()
      .then((response) => {
        setRancho(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarCarga();
  }, []);

  const deleteRancho = (id) => {
    RanchoService.delete(id)
      .then((response) => {
        listarCarga();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (id, nombreRancho) => {
    setSelectedRow(id);
    setSelectedRancho(nombreRancho);
    setShowInsertAndConsult(false); // Ocultar los botones de insertar y consultar
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(null);
        setSelectedRancho(null);
        setShowInsertAndConsult(true); // Mostrar los botones de insertar y consultar cuando se hace clic fuera de la tabla
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer className="tittleFrm">Rancho</footer>

      <div className="container">
        <p>
          {selectedRancho
            ? `Rancho seleccionado: ${selectedRancho}`
            : ""}
        </p>
        <div className="table-container" ref={tableRef}>
          <div className="table-responsive">
            <table
              className="table table-hover table-bordered"
            >
              <thead className="table-success">
                <tr>
                  <th>Id Rancho</th>
                  <th>Nombre del Rancho</th>
                  <th>Ubicación del rancho</th>
                  <th>Extensión del rancho</th>
                </tr>
              </thead>
              <tbody>
                {rancho.map((ranchoItem) => (
                  <tr
                    key={ranchoItem.id_Rancho}
                    onClick={() =>
                      handleRowClick(
                        ranchoItem.id_Rancho,
                        ranchoItem.nombre_Rancho
                      )
                    }
                    className={
                      selectedRow === ranchoItem.id_Rancho ? "selected" : ""
                    }
                  >
                    <td>{ranchoItem.id_Rancho}</td>
                    <td>{ranchoItem.nombre_Rancho}</td>
                    <td>{ranchoItem.ubicacion_Rancho}</td>
                    <td>{ranchoItem.extension_Rancho}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="buttonsInLine">
            {showInsertAndConsult && (
              <>
                <Link to="/form-rancho">
                  <button
                    type="button"
                    className="btn btn-success"
                    class="btnimagen"
                  >
                    {" "}
                    <img
                      src="icons/Insertar.png"
                      alt="Insertar rancho"
                      className="imgInsert"
                    ></img>
                    Insertar
                  </button>
                </Link>
               
              </>
            )}

            {selectedRow && (
              <div className="butonsEditandDelete">
                <Link to={`/edit-rancho/${selectedRow}`}>
                  <button
                    type="button"
                    className="btn btn-success"
                    class="btnimagen"
                  >
                    <img
                      src="icons/Actualizar.png"
                      alt="Editar rancho"
                      className="imgEditar"
                    ></img>
                    Editar
                  </button>
                </Link>
                <button
                  onClick={() => deleteRancho(selectedRow)}
                  className="btn btn-success"
                  class="btnimagen"
                  type="button"
                >
                  <img
                    src="icons/Eliminar.png"
                    alt="Eliminar rancho"
                    className="imgEliminar"
                  ></img>
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
