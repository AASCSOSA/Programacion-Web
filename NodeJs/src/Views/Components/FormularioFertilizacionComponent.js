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

  //VALIDACIONES
  const [cantidad_AplicacionError, setCantidadAplicacionError] = useState(false);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso se suma 1
  const day = String(today.getDate()).padStart(2, '0');
  const maxDate = `${year}-${month}-${day}`;

  const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDACION DE LLENADO DE CAMPOS

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
        setCantidadAplicacion(String(fertilizacion.cantidad_Aplicacion));
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

    // VALIDAR TODO EL LLENADO DE DATOS
    if (
      !cantidad_Aplicacion ||
      !fecha_Aplicacion ||
      !id_Rancho ||
      !id_Fertilizante ||

      //ERRORES
      cantidad_AplicacionError
    ) {
      setCamposVaciosWarning(true);
      return; // Detiene la ejecución de la función si hay un error en el mont
    }

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
          navigate("/fertilizacionForMonth");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      FertilizacionService.create(fertilizacion)
        .then(() => {
          navigate("/fertilizacionForMonth");
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

  //VALIDAR LA CANTIDAD DE APLICACION
  const validarCantidad_Aplicacion = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setCantidadAplicacion(inputValue);
      setCantidadAplicacionError(false);
    } else {
      setCantidadAplicacionError(true);
    }
  };

  //Validar fecha
  const validarFecha = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate <= maxDate) {
      setFechaAplicacion(selectedDate);
    } else {
      alert("No puedes seleccionar una fecha futura");
    }
  };

  //LIMITE DE CARACTERES
  const maxCantidad = 7;

  return (
    <div>
      <div className="container" id="formFertilizacion">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Fertilización</h2>
            <div className="card-body">
              {camposVaciosWarning && (
                <div className="alert alert-warning" role="alert">
                  Por favor, complete todos los campos.
                </div>
              )}
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Cantidad de aplicación</label>
                  <input
                    type="text"
                    placeholder="Ingresa la cantidad aplicada"
                    name="cantidad"
                    className={`form-control ${cantidad_AplicacionError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={cantidad_Aplicacion}
                    onChange={validarCantidad_Aplicacion}
                    maxLength={maxCantidad}
                    />
                    <div className="form-text">
                      {cantidad_Aplicacion.length}/{maxCantidad} caracteres ingresados
                    </div>
                  {cantidad_AplicacionError && (
                    <div className="alert alert-warning" role="alert">
                      -La cantidad solo debe contener números. <br></br>
                      -Después de un punto solo puede ingresar dos digitos
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Fecha de la Apliación</label>
                  <input
                    type="date"
                    name="fechaAplicacion"
                    className="form-control"
                    value={setFechaAplicacion}
                    max={maxDate} // Establecer el atributo max
                    onChange={validarFecha}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Marca Fertilizante</label>
                  <select
                    className="form-select"
                    value={id_Fertilizante}
                    onChange={(e) => setIdFertilizante(e.target.value)}
                  >
                    <option value="">Seleccione nombre del fertilizante</option>
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
