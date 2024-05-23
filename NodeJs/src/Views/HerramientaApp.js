import React, { useState, useEffect, useRef } from "react";
import HerramientaService from "../Controllers/HerramientaService";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function HerramientaApp() {
  const [herramienta, setHerramienta] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const [selectedHerramienta, setSelectedHerramienta] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);
  const [showEditAndDelete, setShowEditAndDelete] = useState(false);
  const [selectedNameHerramienta, setSelectedNameHerramienta] = useState(null);

   //FORMATO PARA TABLA
  const capitalize = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};


  const listarHerramienta = () => {
    HerramientaService.findAll()
      .then((response) => {
        const formatoData = response.data.map(item => ({
          ...item,
          modelo: capitalize(item.modelo),
      }));
        setHerramienta(formatoData);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarHerramienta();
  }, []);

  const deleteHerramienta = (id_Herramienta) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        HerramientaService.delete(id_Herramienta)
          .then((response) => {
            listarHerramienta();
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
  
  const handleRowClick = (id_Herramienta, name) => {
    setSelectedRow(id_Herramienta);
    setSelectedHerramienta(id_Herramienta);
    setShowInsertAndConsult(false); // Ocultar los botones de inserción y consulta
    setShowEditAndDelete(true); // Mostrar los botones de edición y eliminación
    setSelectedNameHerramienta(name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(null);
        setSelectedHerramienta(null);
        setShowInsertAndConsult(true); // Mostrar los botones de inserción y consulta
        setShowEditAndDelete(false); // Ocultar los botones de edición y eliminación
        setSelectedNameHerramienta(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer className="tittleFrm">Herramienta</footer>
      <div className="container">
        <p>
          {selectedNameHerramienta
            ? `Herramienta seleccionada: ${selectedNameHerramienta}`
            : ""}
        </p>
        <div className="table-container" ref={tableRef}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>Id Herramienta</th>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th>Cantidad</th>
                  {/* <th>Color</th> */}
                  <th>Costo</th>
                  <th>Fecha de Adquisición</th>
                </tr>
              </thead>
              <tbody>
                {herramienta.map((herramienta) => (
                  <tr
                    key={herramienta.id_Herramienta}
                    onClick={() =>
                      handleRowClick(
                        herramienta.id_Herramienta,
                        herramienta.modelo,
                        herramienta
                      )
                    }
                    className={
                      selectedRow === herramienta.id_Herramienta
                        ? "selected"
                        : ""
                    }
                  >
                    <td>{herramienta.id_Herramienta}</td>
                    <td>{herramienta.modelo}</td>
                    <td>{herramienta.marca}</td>
                    <td>{herramienta.cantidad}</td>
                    {/* <td>{herramienta.color}</td> */}
                    <td>{herramienta.costo}</td>
                    <td>{herramienta.fecha_Adquisicion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttonsInLine">
          {showInsertAndConsult && (
            <>
              <Link to="/form-herramienta">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Insertar.png"
                    alt="Insertar herramienta"
                    className="imgInsert"
                  ></img>
                  Insertar
                </button>
              </Link>
             
            </>
          )}
          {showEditAndDelete && (
            <div className="butonsEditandDelete">
              <Link to={`/edit-herramienta/${selectedHerramienta}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar herramienta"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteHerramienta(selectedHerramienta)}
                className="btn btn-success"
                class="btnimagen"
                type="button"
              >
                <img
                  src="icons/Eliminar.png"
                  alt="Eliminar herramienta"
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
