import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Pago_TrabajadorService from "../Controllers/Pago_TrabajadorService";
import Swal from 'sweetalert2';


export default function Pago_TrabajadorApp() {
  const [pago_Trabajador, setPago_Trabajador] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const [selectedPagoTrabajador, setSelectedPagoTrabajador] = useState(null);
  const [showInsertAndConsult, setShowInsertAndConsult] = useState(true);
  const [selectedNamePagoTrabajador, setSelectedNamePagoTrabajador] =
    useState(null);

  const listarPago = () => {
    Pago_TrabajadorService.findAll()
      .then((response) => {
        setPago_Trabajador(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listarPago();
  }, []);

  useEffect(() => {
    const obtenerNombresTrabajadores = async () => {
      try {
        const nombresTrabajadores = await Promise.all(
          pago_Trabajador.map(async (pago_TrabajadorItem) => {
            const response = await Pago_TrabajadorService.getNameTrabajador(
              pago_TrabajadorItem.id_Pago_Trabajador
            );
            return response.data;
          })
        );
        setTrabajadores(nombresTrabajadores);
      } catch (error) {
        console.log(error);
      }
    };

    if (pago_Trabajador.length > 0) {
      obtenerNombresTrabajadores();
    }
  }, [pago_Trabajador]);

  const deletePago_Trabajador = (id_Pago_Trabajador) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Pago_TrabajadorService.delete(id_Pago_Trabajador)
          .then((response) => {
            listarPago();
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

  const handleRowClick = (id_Pago_Trabajador, nombre) => {
    setSelectedRow(id_Pago_Trabajador);
    console.log(id_Pago_Trabajador);
    setSelectedPagoTrabajador(id_Pago_Trabajador);
    setSelectedNamePagoTrabajador(nombre);
    setShowInsertAndConsult(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(null);
        setSelectedPagoTrabajador(null);
        setShowInsertAndConsult(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer className="tittleFrm">Pago de Trabajador</footer>
      <div className="container">
        <p>
          {selectedPagoTrabajador
            ? `Nombre del Trabajador: ${selectedPagoTrabajador}`
            : ""}
        </p>
        <div className="table-container" ref={tableRef}>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th id="id_IdPago_Trabajador">Id Pago Trabajador</th>
                  <th>Monto</th>
                  <th>Fecha de Pago</th>
                  <th>Nombre del trabajador</th>
                </tr>
              </thead>
              <tbody>
                {pago_Trabajador.map((pago_TrabajadorItem, index) => (
                  <tr
                    key={pago_TrabajadorItem.id_Pago_Trabajador}
                    onClick={() =>
                      handleRowClick(
                        pago_TrabajadorItem.id_Pago_Trabajador,
                        trabajadores[index]
                      )
                    }
                    className={
                      selectedRow === pago_TrabajadorItem.id_Pago_Trabajador
                        ? "selected"
                        : ""
                    }
                  >
                    <td>{pago_TrabajadorItem.id_Pago_Trabajador}</td>
                    <td>{pago_TrabajadorItem.monto}</td>
                    <td>{pago_TrabajadorItem.fecha_Pago}</td>
                    <td>{trabajadores[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttonsInLine">
          {showInsertAndConsult && (
            <>
              <Link to="/form-pago_trabajador">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  {" "}
                  <img
                    src="icons/Insertar.png"
                    alt="Insertar Pago"
                    className="imgInsert"
                  ></img>
                  Insertar
                </button>
              </Link>

              <Link to="/pago_trabajadorForMonth">
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
          {selectedPagoTrabajador && (
            <>
              <Link to={`/edit-pago_trabajador/${selectedPagoTrabajador}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar Pago"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deletePago_Trabajador(selectedRow)}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
