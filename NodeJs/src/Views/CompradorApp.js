import React, { useState, useEffect, useRef } from "react";
import CompradorService from "../Controllers/CompradorService";
import { Link } from "react-router-dom";

export default function CompradorApp() {
  const [comprador, setComprador] = useState([]);
  const [selectedCompradorId, setSelectedCompradorId] = useState(null);
  const [rowSelected, setRowSelected] = useState(false);
  const [clickedInsideTable, setClickedInsideTable] = useState(false);
  const tableRef = useRef(null);
  const [selectNameComprador, setSelectNameComprador] = useState(null);
  const listarComprador = () => {
    CompradorService.findAll()
      .then((response) => {
        setComprador(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarComprador();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setClickedInsideTable(false);
        setRowSelected(false);
        setSelectNameComprador(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const deleteComprador = (id) => {
    CompradorService.delete(id)
      .then((response) => {
        listarComprador();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (id, name) => {
    setSelectedCompradorId(id);
    setRowSelected(true);
    setClickedInsideTable(true);
    setSelectNameComprador(name);
  };

  return (
    <div>
      <footer className="tittleFrm">Comprador</footer>
      <div className="container">
        <p>
          {selectNameComprador
            ? `Nombre del comprador seleccionado: ${selectNameComprador}`
            : "No se esta seleccionando un comprador"}
        </p>
        <div className="table-container" ref={tableRef}>
          <table className="table" id="tableComprador">
            <thead className="table-dark">
              <tr>
                <th>Id Comprador</th>
                <th>Nombre del comprador</th>
                <th>Telefono</th>
                <th>Nombre de la empresa</th>
              </tr>
            </thead>
            <tbody>
              {comprador.map((comprador) => (
                <tr
                  key={comprador.id_Comprador}
                  onClick={() =>
                    handleRowClick(
                      comprador.id_Comprador,
                      comprador.nombre + " " + comprador.apellido_Pat
                    )
                  }
                  className={
                    selectedCompradorId === comprador.id_Comprador ? "selected" : ""
                  }
                >
                  <td>{comprador.id_Comprador}</td>
                  <td>
                    {comprador.nombre} {comprador.apellido_Pat}{" "}
                    {comprador.apellido_Mat}
                  </td>
                  <td>{comprador.telefono}</td>
                  <td>{comprador.nombre_Empresa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttonsInLine">
          {!clickedInsideTable && (
            <>
              <Link to="/form-comprador">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  {" "}
                  <img
                    src="icons/Insertar.png"
                    alt="Insertar comprador"
                    className="imgInsert"
                  ></img>
                  Insertar
                </button>
              </Link>
              <Link to="/form-comprador">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Buscar.png"
                    alt="Buscar comprador"
                    className="imgBuscar"
                  ></img>
                  Consultar
                </button>
              </Link>
            </>
          )}
          {rowSelected && (
            <div className="butonsEditandDelete">
              <Link to={`/edit-comprador/${selectedCompradorId}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar comprador"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteComprador(selectedCompradorId)}
                className="btn btn-success"
                class="btnimagen"
                type="button"
              >
                <img
                  src="icons/Eliminar.png"
                  alt="Eliminar comprador"
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
