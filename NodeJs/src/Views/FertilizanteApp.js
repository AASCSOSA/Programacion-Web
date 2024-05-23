import React, { useEffect, useState, useRef } from "react";
import FertilizanteService from "../Controllers/FertilizanteService";
import { Link } from "react-router-dom";

import Swal from 'sweetalert2';
export default function FertilizanteApp() {
  const [fertilizante, setFertilizante] = useState([]);
  const [selectedFertilizante, setSelectedFertilizante] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);
  const tableRef = useRef(null);
  const [selectdNameFertilizante, setSelectdNameFertilizante] = useState(null);

  //FORMATO EN TABLA 
  const capitalize = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const listarFertilizante = () => {
    FertilizanteService.findAll()
      .then((response) => {
        const formatoData = response.data.map(item => ({
          ...item,
          domicilio_Distribuidora: capitalize(item.domicilio_Distribuidora),
          marca: capitalize(item.marca)
        }));
        setFertilizante(formatoData);
        console.log(formatoData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarFertilizante();
  }, []);

  const deleteFertilizante = (id) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        FertilizanteService.delete(id)
        .then((response) => {
          listarFertilizante();
          console.log(response.data);
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          );
        })
        .catch((error) => {
          console.log(error);
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar el registro.',
            'error'
          );
        });
      }
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
