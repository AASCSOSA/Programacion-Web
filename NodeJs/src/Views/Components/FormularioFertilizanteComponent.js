import React, { useEffect, useState } from "react";
import FertilizanteService from "../../Controllers/FertilizanteService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioFertilizanteComponent = () => {
  const [cantidad, setCantidad] = useState("");
  const [clasificacion, setClasificacion] = useState("");
  const [costo_Total, setCostoTotal] = useState("");
  const [costo_Unitario, setCostoUnitario] = useState("");
  const [domicilio_Distribuidora, setDomicilioDistribuidora] = useState("");
  const [fecha_Caducidad, setfechaCaducidad] = useState("");
  const [lote, setLote] = useState("");
  const [marca, setMarca] = useState("");

  //VALIDACIONES
  const [cantidadError, setCantidadError] = useState(false);
  const [costo_TotalError, setCostoTotalError] = useState(false);
  const [costo_UnitarioError, setCostoUnitarioError] = useState(false);
  const [loteError, setLoteError] = useState(false);
  const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDACION DE LLENADO DE CAMPOS


  const navigate = useNavigate();
  const { id_Fertilizante } = useParams();

  useEffect(() => {
    FertilizanteService.findById(id_Fertilizante)
      .then((response) => {
        const fertilizante = response.data;
        setCantidad(fertilizante.cantidad);
        setClasificacion(fertilizante.clasificacion);
        setCostoTotal(fertilizante.costo_Total);
        setDomicilioDistribuidora(fertilizante.domicilio_Distribuidora);
        setfechaCaducidad(fertilizante.fecha_Caducidad);
        setLote(fertilizante.lote);
        setMarca(fertilizante.marca);
        setCostoUnitario(fertilizante.costo_Unitario);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id_Fertilizante]);

  const saveFertilizante = (e) => {
    e.preventDefault();

    // VALIDAR TODO EL LLENADO DE DATOS
    if (
      !cantidad ||
      !clasificacion ||
      !costo_Total ||
      !costo_Unitario ||
      !domicilio_Distribuidora ||
      !fecha_Caducidad ||
      !lote ||
      !marca ||

      //ERRORES
      cantidadError ||
      costo_TotalError ||
      costo_UnitarioError ||
      loteError
    ) {
      setCamposVaciosWarning(true);
      return; // Detiene la ejecución de la función si hay un error en el mont
    }

    const fertilizante = {
      cantidad,
      clasificacion,
      costo_Total,
      costo_Unitario,
      domicilio_Distribuidora,
      fecha_Caducidad,
      lote,
      marca
    };
    console.log(fertilizante);
    if (id_Fertilizante) {
      FertilizanteService.update(id_Fertilizante, fertilizante)
        .then(() => {
          navigate("/fertilizante");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      FertilizanteService.create(fertilizante)
        .then(() => {
          navigate("/fertilizante");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const titulo = () => {
    if (id_Fertilizante) {
      return <h2 className="text-center">Editar Fertilizante</h2>;
    } else {
      return <h2 className="text-center">Agregar Fertilizante</h2>;
    }
  };

  //VALIDAR LA CANTIDAD
  const validarCantidad = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue) && parseFloat(inputValue) >= 0) {// SOLO NUMEROS Y NO CARACTERES ESPECIALES
      setCantidad(inputValue);
      setCantidadError(false);
    } else {
      setCantidad(inputValue);
      setCantidadError(true);
    }
  };

  //VALIDAR COSTO TOTAL
  const validarCostoTotal = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue) && parseFloat(inputValue) >= 0) {// SOLO NUMEROS Y NO CARACTERES ESPECIALES
      setCostoTotal(inputValue);
      setCostoTotalError(false);
    } else {
      setCostoTotal(inputValue);
      setCostoTotalError(true);
    }
  };

  //VALIDAR COSTO UNITARIO
  const validarCostoUnitario = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue) && parseFloat(inputValue) >= 0) {// SOLO NUMEROS Y NO CARACTERES ESPECIALES
      setCostoUnitario(inputValue);
      setCostoUnitarioError(false);
    } else {
      setCostoUnitario(inputValue);
      setCostoUnitarioError(true);
    }
  };

  //VALIDAR LOTE
  const validarLote = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue) && parseFloat(inputValue) >= 0) {// SOLO NUMEROS Y NO CARACTERES ESPECIALES
      setLote(inputValue);
      setLoteError(false);
    } else {
      setLote(inputValue);
      setLoteError(true);
    }
  };

  const listadeClasificacion = [
    "Abono Orgánico",
    "Abono Inorgánico/Sintético",
    "Micronutrientes",
    "Granulado",
    "Líquido",
    "Polvos",
  ];

  return (
    <div>
      <div className="container" id="formFertilizante">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Fertilizante</h2>
            <div className="card-body">
            {camposVaciosWarning && (
                <div className="alert alert-warning" role="alert">
                  Por favor, complete todos los campos.
                </div>
              )}
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Cantidad</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingresa la cantidad adquirida"
                    name="cantidad"
                    className={`form-control ${cantidadError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={cantidad}
                    onChange={validarCantidad}>
                  </input>
                  {cantidadError && (
                    <div className="alert alert-warning" role="alert">
                      La cantidad solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Clasificación</label>
                  <select
                    className="form-select"
                    value={clasificacion}
                    onChange={(e) => setClasificacion(e.target.value)}
                  >
                    <option value="">Selecciona la Clasificación</option>
                    {listadeClasificacion.map((lista, index) => (
                      <option key={index} value={lista}>
                        {lista}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Costo Total</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el costo $total"
                    name="costoTotal"
                    className={`form-control ${costo_TotalError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={costo_Total}
                    onChange={validarCostoTotal}>
                  </input>
                  {costo_TotalError && (
                    <div className="alert alert-warning" role="alert">
                      El costo total solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Costo Unitario</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el costo unitario"
                    name="costoUnitario"
                    className={`form-control ${costo_UnitarioError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={costo_Unitario}
                    onChange={validarCostoUnitario}>
                  </input>
                  {costo_UnitarioError && (
                    <div className="alert alert-warning" role="alert">
                      El costo unitario solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Domicilio Distribuidora</label>
                  <input
                    type="text"
                    placeholder="Ingrese el domicilio de la distribuidora"
                    name="domicilioDistribuidora"
                    className="form-control"
                    value={domicilio_Distribuidora}
                    onChange={(e) => setDomicilioDistribuidora(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Fecha Caducidad</label>
                  <input
                    type="date"
                    name="fechaCaducidad"
                    className="form-control"
                    value={fecha_Caducidad}
                    onChange={(e) => setfechaCaducidad(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Lote</label>
                  <input
                    type="number"
                    placeholder="Ingrese el lote del producto"
                    name="lote"
                    className={`form-control ${loteError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={lote}
                    onChange={validarLote}>
                  </input>
                  {loteError && (
                    <div className="alert alert-warning" role="alert">
                      El lote solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Marca</label>
                  <input
                    type="text"
                    placeholder="Ingrese la marca del Producto"
                    name="marcaProducto"
                    className="form-control"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveFertilizante(e)}
                >
                  Guardar
                </button>
                &nbsp;&nbsp;
                <Link to="/fertilizante" className="btn btn-danger">
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

export default FormularioFertilizanteComponent;
