import React, { useEffect, useState, useRef } from "react";
import FertilizacionService from "../Controllers/FertilizacionService";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import globals from "../Views/Global"; 

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
  const clickMove=()=>{
    globals.miVariableGlobal="/fertilizacion"
  }
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
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        FertilizacionService.delete(id)
          .then(() => {
            setFertilizacion(
              fertilizacion.filter((item) => item.id_Fertilizacion !== id)
            );
            setSelectedFertilizacion(null); // Deselect the row after deletion
            setShowInsertAndConsult(true); // Show the Insert and Consult buttons after deletion
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
  }


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
  const handleInsertClick = () => {
    // Guardar el nombre en la variable global
    globals.miVariableGlobal = "/cargaForMonth";
  };
  return (
    <div>
      <footer className="tittleFrm">Fertilizacion</footer>
      <div className="container">
        <p>
          {selectedNameFertilizacion
            ? `Fertilización del rancho: ${selectedNameFertilizacion}`
            : ""}
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
                    <td>{nameMarca[index]}</td>
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
                  onClick={()=> clickMove()  }

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
              <Link to="/fertilizacionForMonth">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Regresar.png"
                    alt="Regresar fertilizacion"
                    className="imgBuscar"
                  ></img>
                  Regresar
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
                  onClick={()=> clickMove()  }

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
