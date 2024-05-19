import React, { useState, useEffect, useRef } from "react";
import CargaService from "../Controllers/CargaService";
import RanchoService from "../Controllers/RanchoService";
import { Link } from "react-router-dom";

export default function CargaApp() {
  const [carga, setCarga] = useState([]);
  const [ranchos, setRanchos] = useState([]);
  const [selectedCarga, setSelectedCarga] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);
  const tableRef = useRef(null);
  console.log(global.miVariableGlobal);
    const listarCarga = () => {
    CargaService.findAll()
      .then((response) => {
        setCarga(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarCarga();
  }, []);

  useEffect(() => {
    const obtenerNombresRanchos = async () => {
      try {
        const nombresRanchos = await Promise.all(
          carga.map(async (cargaItem) => {
            const response = await RanchoService.getNameRancho(
              cargaItem.id_Carga
            );
            return response.data;
          })
        );
        setRanchos(nombresRanchos);
      } catch (error) {}
    };

    if (carga.length > 0) {
      obtenerNombresRanchos();
    }
  }, [carga]);

  const deleteCarga = (id) => {
    CargaService.delete(id)
      .then((response) => {
        listarCarga();
        setSelectedCarga(null); // Deselect the row after deletion
        setShowInsertAndConsult(true); // Show the Insert and Consult buttons after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (id) => {
    setSelectedCarga(id);
    setShowInsertAndConsult(false); // Hide the Insert and Consult buttons when a row is selected
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedCarga(null);
        setShowInsertAndConsult(true); // Show the Insert and Consult buttons when clicked outside the table
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer className="tittleFrm">Carga</footer>
      <div className="container">
        <p>
          {selectedCarga
            ? `Numero de carga: ${selectedCarga}`
            : ""}
        </p>
        <p>{global.miVariableGlobal}</p>
        <div className="table-container" ref={tableRef}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th id="id_IdCarga">Id Carga</th>
                  <th>Fecha</th>
                  <th>Rejas de limón verde</th>
                  <th>Rejas de limón segunda</th>
                  <th>Rejas de limón tercera</th>
                  <th>Total peso de limón verde</th>
                  <th>Total peso de limón segunda</th>
                  <th>Total peso de limón tercera</th>
                  <th>Trabajadores</th>
                  <th>Nombre del Rancho</th>
                </tr>
              </thead>
              <tbody>
                {carga.map((cargaItem, index) => (
                  <tr
                    key={cargaItem.id_Carga}
                    onClick={() => handleRowClick(cargaItem.id_Carga)}
                    className={
                      selectedCarga === cargaItem.id_Carga ? "selected" : ""
                    }
                  >
                    <td>{cargaItem.id_Carga}</td>
                    <td>{cargaItem.fecha}</td>
                    <td>{cargaItem.rejas_LimonVerde}</td>
                    <td>{cargaItem.rejas_LimonSegunda}</td>
                    <td>{cargaItem.rejas_LimonTercera}</td>
                    <td>{cargaItem.total_PesoLimonVerde}</td>
                    <td>{cargaItem.total_PesoLimonSegunda}</td>
                    <td>{cargaItem.total_PesoLimonTercera}</td>
                    <td>{cargaItem.total_Trabajadores}</td>
                    <td>{ranchos[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttonsInLine">
          {showInsertAndConsult && (
            <>
              <Link to="/form-carga">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  {" "}
                  <img
                    src="icons/Insertar.png"
                    alt="Insertar carga"
                    className="imgInsert"
                  ></img>
                  Insertar
                </button>
              </Link>
              
              <Link to="/cargaForMonth">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Regresar.png"
                    alt="Regresar carga"
                    className="imgBuscar"
                  ></img>
                  Regresar
                </button>
              </Link>
            </>
          )}
          {selectedCarga && (
            <div className="butonsEditandDelete">
              <Link to={`/edit-carga/${selectedCarga}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar carga"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteCarga(selectedCarga)}
                className="btn btn-success"
                class="btnimagen"
                type="button"
              >
                <img
                  src="icons/Eliminar.png"
                  alt="Eliminar carga"
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
