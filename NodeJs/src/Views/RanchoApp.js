import React, { useState, useEffect, useRef } from "react";
import RanchoService from "../Controllers/RanchoService";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function RanchoApp() {
  const [rancho, setRancho] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const [selectedRancho, setSelectedRancho] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);

  //FORMATO EN TABLA 
  const capitalize = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};


  const listarCarga = () => {
    RanchoService.findAll()
      .then((response) => {
        const formatoData = response.data.map(item => ({
          ...item,
          nombre_Rancho: capitalize(item.nombre_Rancho),
          ubicacion_Rancho: capitalize(item.ubicacion_Rancho),
          extension_Rancho: capitalize(item.extension_Rancho)
      }));
      setRancho(formatoData);
      console.log(formatoData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarCarga();
  }, []);

  const deleteRancho = (id) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        RanchoService.delete(id)
        .then((response) => {
          listarCarga();
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