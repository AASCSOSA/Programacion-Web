import React, { useEffect, useState } from "react";
import FertilizanteService from "../Controllers/FertilizanteService";
import { Link } from "react-router-dom";

export default function FertilizanteApp() {
  const [fertilizante, setFertilizante] = useState([]);

  const listarFertilizante = () => {
    FertilizanteService.findAll()
      .then((response) => {
        setFertilizante(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    FertilizanteService.findAll()
      .then((response) => {
        setFertilizante(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    listarFertilizante();
  });

  const deleteFertilizante = (id) => {
    FertilizanteService.delete(id)
      .then((response) => {
        listarFertilizante();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <footer className="tittleFrm">Fertilizante</footer>
      <div className="container">
        <div className="table-container">
          <table className="table" id="tableFertilizante">
            <thead className="table-dark">
              <tr>
                <th>Id Fertilizante</th>
                <th>Cantidad</th>
                <th>Clasificación</th>
                <th>Costo total</th>
                <th>Costo unitario</th>
                <th>Domicilio distribuidora</th>
                <th>Fecha de caducidad</th>
                <th>Lote</th>
                <th>Marca</th>
              </tr>
            </thead>
            <tbody>
              {fertilizante.map((fertilizante) => (
                <tr key={fertilizante.id_Fertilizante}>
                  <td>{fertilizante.id_Fertilizante}</td>
                  <td>{fertilizante.cantidad}</td>
                  <td>{fertilizante.clasificacion}</td>
                  <td>{fertilizante.costo_Total}</td>
                  <td>{fertilizante.costo_Unitario}</td>
                  <td>{fertilizante.domicilio_Distribuidora}</td>
                  <td>{fertilizante.fecha_Caducidad}</td>
                  <td>{fertilizante.lote}</td>
                  <td>{fertilizante.marca}</td>
                  <td>
                    <Link
                      className="btn btn-info"
                      to={`/edit-fertilizante/${fertilizante.id_Fertilizante}`}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteFertilizante(fertilizante.id_Fertilizante)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/form-fertilizante">
          <button type="button" className="btn btn-success">
            Insertar
          </button>
        </Link>
        <Link to="/form-fertilizante">
          <button type="button" className="btn btn-success">
            Consultar
          </button>
        </Link>
      </div>
    </div>
  );
}
