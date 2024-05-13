import React, { useEffect, useState } from "react";
import FertilizacionService from "../../Controllers/FertilizacionService";
import FertilizanteService from "../../Controllers/FertilizanteService";
import RanchoService from "../../Controllers/RanchoService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioFertilizacionComponent = () => {
  const [cantidad_Aplicacion, setCantidadAplicacion] = useState("");
  const [fecha_Aplicacion, setFechaAplicacion] = useState("");
  const [id_Fertilizante, setIdFertilizante] = useState("");
  const [id_Rancho, setIdRancho] = useState("");
  const [ranchos, setRanchos] = useState([]);
  const [fertilizantes, setFertilizantes] = useState([]);

  const navigate = useNavigate();
  const { id_Fertilizacion } = useParams();
  useEffect(() => {
    FertilizanteService.findAll()
      .then((response) => {
        setFertilizantes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    RanchoService.findAll()
      .then((response) => {
        setRanchos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    FertilizacionService.findById(id_Fertilizacion)
      .then((response) => {
        const fertilizacion = response.data;
        setCantidadAplicacion(fertilizacion.cantidad_Aplicacion);
        setFechaAplicacion(fertilizacion.fecha_Aplicacion);

        // Obtener todos los fertilizantes
        FertilizacionService.findByIdFertilizante(id_Fertilizacion)
          .then((response) => {
            const fertilizante = response.data;
            setIdFertilizante(fertilizante.id_Fertilizante);
          })
          .catch((error) => {
            console.log(error);
          });

        // Obtener todos los ranchos
        FertilizacionService.findByIdRancho(id_Fertilizacion)
          .then((response) => {
            const rancho = response.data;
            setIdRancho(rancho.id_Rancho);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id_Fertilizacion]); // Ejecutar cuando el ID de la fertilización cambie

  const saveFertilizacion = (e) => {
    e.preventDefault();
    const normalizedFecha = new Date(fecha_Aplicacion)
      .toISOString()
      .split("T")[0];

    const rancho = { id_Rancho };
    const fertilizante = { id_Fertilizante };
    const fertilizacion = {
      cantidad_Aplicacion,
      fecha_Aplicacion: normalizedFecha, // Usar la fecha normalizada
      rancho,
      fertilizante,
    };
    console.log(fertilizacion);
    if (id_Fertilizacion) {
      FertilizacionService.update(id_Fertilizacion, fertilizacion)
        .then(() => {
          navigate("/fertilizacion");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      FertilizacionService.create(fertilizacion)
        .then(() => {
          navigate("/fertilizacion");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const titulo = () => {
    if (id_Fertilizacion) {
      return <h2 className="text-center">Editar Fertilización</h2>;
    } else {
      return <h2 className="text-center">Agregar Fertilización</h2>;
    }
  };

  return (
    <div>
      <div className="container" id="formFertilizacion">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Fertilización</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Cantidad de aplicación</label>
                  <input
                    type="number"
                    step="0.0"
                    placeholder="Ingresa la cantidad aplicada"
                    name="cantidad"
                    className="form-control"
                    value={cantidad_Aplicacion}
                    onChange={(e) => setCantidadAplicacion(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Fecha de la Apliación</label>
                  <input
                    type="date"
                    name="fechaAplicacion"
                    className="form-control"
                    value={fecha_Aplicacion}
                    onChange={(e) => setFechaAplicacion(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Marca Fertilizante</label>
                  <select
                    className="form-select"
                    value={id_Fertilizante}
                    onChange={(e) => setIdFertilizante(e.target.value)}
                  >
                    <option value="">Seleccione el Comprador</option>
                    {fertilizantes.map((fertilizante) => (
                      <option
                        key={fertilizante.id_Fertilizante}
                        value={fertilizante.id_Fertilizante}
                      >
                        {fertilizante.marca}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Nombre rancho</label>
                  <select
                    className="form-select"
                    value={id_Rancho}
                    onChange={(e) => setIdRancho(e.target.value)}
                  >
                    <option value="">Seleccione nombre del rancho</option>
                    {ranchos.map((rancho) => (
                      <option key={rancho.id_Rancho} value={rancho.id_Rancho}>
                        {rancho.nombre_Rancho}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveFertilizacion(e)}
                >
                  Guardar
                </button>
                &nbsp;&nbsp;
                <Link to="/fertilizacion" className="btn btn-danger">
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioFertilizacionComponent;
