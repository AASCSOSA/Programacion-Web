import React, { useEffect, useState } from "react";
import FertilizacionService from "../Controllers/FertilizacionService";
import { Link } from "react-router-dom";

export default function FertilizacionApp() {
  const [fertilizacion, setFertilizacion] = useState([]);
  const [nameRancho, setNameRancho] = useState([]);
  const [nameMarca, setNameMarca] = useState([]);

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
        setFertilizacion(fertilizacion.filter((item) => item.id_Fertilizacion !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <footer className="tittleFrm">Fertilizacion</footer>
      <div className="container">
        <div className="table-container">
          <table className="table" id="tableFertilizacion">
            <thead className="table-dark">
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
                <tr key={fertilizacionItem.id_Fertilizacion}>
                  <td>{fertilizacionItem.id_Fertilizacion}</td>
                  <td>{fertilizacionItem.cantidad_Aplicacion}</td>
                  <td>{fertilizacionItem.fecha_Aplicacion}</td>
                  <td>{nameMarca[index]}</td>
                  <td>{nameRancho[index]}</td>
                  <td>
                    <Link
                      className="btn btn-info"
                      to={`/edit-fertilizacion/${fertilizacionItem.id_Fertilizacion}`}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteFertilizacion(fertilizacionItem.id_Fertilizacion)
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/form-fertilizacion">
          <button type="button" className="btn btn-success">
            Insertar
          </button>
        </Link>
        <Link to="/form-fertilizacion">
          <button type="button" className="btn btn-success">
            Consultar
          </button>
        </Link>
      </div>
    </div>
  );
}
