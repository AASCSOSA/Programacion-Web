import React, { useState, useEffect } from "react";
import CargaService from "../Controllers/CargaService";
import RanchoService from "../Controllers/RanchoService";
import { Link } from "react-router-dom";

export default function CargaApp() {
  const [carga, setCarga] = useState([]);
  const [ranchos, setRanchos] = useState([]);

  const capitalize = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

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
            const response = await RanchoService.getNameRancho(cargaItem.id_Carga);
            return capitalize(response.data); //APLICA EL FORMATO CAPITALIZADO
          })
        );
        setRanchos(nombresRanchos);
      } catch (error) {
      }
    };
  
    if (carga.length > 0) {
      obtenerNombresRanchos();
    }
  }, [carga]);

  const deleteCarga = (id) => {
    const confirmarDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
    if (confirmarDelete) {
      CargaService.delete(id)
        .then((response) => {
          listarCarga();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div >
      <footer className="tittleFrm">Carga</footer>
      <div className="container">
        <div className="table-container">
          <table className="table" id="tableCarga">
            <thead className="table-dark">
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
                <tr key={cargaItem.id_Carga}>
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
                  <td>
                    <Link
                      className="btn btn-info"
                      to={`/edit-carga/${cargaItem.id_Carga}`}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCarga(cargaItem.id_Carga)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/form-carga">
          <button type="button" className="btn btn-success" >
            Insertar
          </button>
        </Link>
        <Link to="/form-carga">
          <button type="button" className="btn btn-success" >
            Consultar
          </button>
        </Link>
      </div>
    </div>
  );
}
