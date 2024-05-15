import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TrabajadorService from "../Controllers/TrabajadorService";
import HerramientaService from "../Controllers/HerramientaService";

export default function TrabajadorApp() {
  const [trabajador, setTrabajador] = useState([]);
  const [herramientas, setHerramientas] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const tableRef = useRef(null);
  const [selectedTrabajador, setSelectedTrabajador] = useState(null);

  const listarTrabajador = () => {
    TrabajadorService.findAll()
      .then((response) => {
        setTrabajador(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarTrabajador();
  }, []);

  useEffect(() => {
    const obtenerModelosHerramientas = async () => {
      try {
        const modelosHerramientas = await Promise.all(
          trabajador.map(async (trabajador) => {
            const response = await HerramientaService.getModeloHerramienta(
              trabajador.id_Trabajador
            );
            return response.data;
          })
        );
        setHerramientas(modelosHerramientas);
      } catch (error) {
        console.log(error);
      }
    };

    if (trabajador.length > 0) {
      obtenerModelosHerramientas();
    }
  }, [trabajador]);

  const deleteTrabajador = (id_Trabajador) => {
    TrabajadorService.delete(id_Trabajador)
      .then((response) => {
        listarTrabajador();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (id_Trabajador, nombreTrabajador) => {
    setSelectedRow(id_Trabajador);
    setShowButtons(true);
    setSelectedTrabajador(nombreTrabajador);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setShowButtons(false);
        setSelectedRow(null);
        setSelectedTrabajador(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer className="tittleFrm">Trabajador</footer>
      <div className="container">
        <p>
          {selectedTrabajador
            ? `Nombre del trabajador seleccionado: ${selectedTrabajador}`
            : "No se esta seleccionando un trabajador"}
        </p>
        <div className="table-container" ref={tableRef}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>Id Trabajador</th>
                  <th>Nombre</th>
                  <th>Apellido Paterno</th>
                  <th>Apellido Materno</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Modelo de la herramienta</th>
                </tr>
              </thead>
              <tbody>
                {trabajador.map((trabajador, index) => (
                  <tr
                    key={trabajador.id_Trabajador}
                    onClick={() =>
                      handleRowClick(
                        trabajador.id_Trabajador,
                        trabajador.nombre + " " + trabajador.apellido_Pat
                      )
                    }
                    className={
                      selectedRow === trabajador.id_Trabajador ? "selected" : ""
                    }
                  >
                    <td>{trabajador.id_Trabajador}</td>
                    <td>{trabajador.nombre}</td>
                    <td>{trabajador.apellido_Pat}</td>
                    <td>{trabajador.apellido_Mat}</td>
                    <td>{trabajador.telefono}</td>
                    <td>{trabajador.direccion}</td>
                    <td>{herramientas[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttonsInLine">
          {showButtons && (
            <div className="butonsEditandDelete">
              <Link to={`/edit-trabajador/${selectedRow}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar trabajador"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteTrabajador(selectedRow)}
                className="btn btn-success"
                class="btnimagen"
                type="button"
              >
                <img
                  src="icons/Eliminar.png"
                  alt="Eliminar trabajador"
                  className="imgEliminar"
                ></img>
                Eliminar
              </button>
            </div>
          )}
          {!selectedRow && (
            <Link to="/form-trabajador">
              <button
                type="button"
                className="btn btn-success"
                class="btnimagen"
              >
                <img
                  src="icons/Insertar.png"
                  alt="Insertar trabajador"
                  className="imgInsert"
                ></img>
                Insertar
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
