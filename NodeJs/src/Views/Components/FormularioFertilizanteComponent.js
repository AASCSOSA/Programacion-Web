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
  const [fecha_Adquisicion, setfechaAdquisicion] = useState("");

  const [lote, setLote] = useState("");
  const [marca, setMarca] = useState("");

  //VALIDACIONES
  const [cantidadError, setCantidadError] = useState(false);
  const [costo_TotalError, setCostoTotalError] = useState(false);
  const [costo_UnitarioError, setCostoUnitarioError] = useState(false);
  const [loteError, setLoteError] = useState(false);
  const [domicilio_DistribuidoraError, setDomicilioDistribuidoraError] = useState(false);
  const [marcaError, setMarcaError] = useState(false);


  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso se suma 1
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;
  const maxDate = `${year}-${month}-${day}`;

  const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDACION DE LLENADO DE CAMPOS


  const navigate = useNavigate();
  const { id_Fertilizante } = useParams();

  useEffect(() => {
    FertilizanteService.findById(id_Fertilizante)
      .then((response) => {
        const fertilizante = response.data;
        setCantidad(String(fertilizante.cantidad));
        setClasificacion(fertilizante.clasificacion);
        setCostoTotal(String(fertilizante.costo_Total));
        setCostoUnitario(String(fertilizante.costo_Unitario));
        setDomicilioDistribuidora(fertilizante.domicilio_Distribuidora);
        setfechaCaducidad(fertilizante.fecha_Caducidad);
        setfechaAdquisicion(fertilizante.fecha_Adquisicion);
        setLote(String(fertilizante.lote));
        setMarca(fertilizante.marca);

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
      !fecha_Adquisicion ||
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
      fecha_Adquisicion,
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
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setCantidad(inputValue);
      setCantidadError(false);
    } else {
      setCantidadError(true);
    }
  };

  //VALIDAR COSTO TOTAL
  const validarCostoTotal = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setCostoTotal(inputValue);
      setCostoTotalError(false);
    } else {
      setCostoTotalError(true);
    }
  };

  //VALIDAR COSTO UNITARIO
  const validarCostoUnitario = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setCostoUnitario(inputValue);
      setCostoUnitarioError(false);
    } else {
      setCostoUnitarioError(true);
    }
  };

  //VALIDAR DOMICILIO DISTRIBUIDORA
  const validarDomicilio = (e) => {
    const valor = e.target.value.toUpperCase();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9.,\s]*$/; //LETRAS,NUMEROS, ACENTOS, Ñ, PUNTOS Y COMAS
    if (regex.test(valor)) {
      setDomicilioDistribuidora(valor);
      setDomicilioDistribuidoraError(false);
    } else {
      setDomicilioDistribuidoraError(true);
    }
  };

  //VALIDAR LOTE
  const validarLote = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/; //NUMEROS 
    if (regex.test(inputValue)) {
      setLote(inputValue);
      setLoteError(false);
    } else {
      setLoteError(true);
    }
  };

  // VALIDAR FECHA CADUCIDAD
  const validarFechaC = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate >= minDate) {
      setfechaCaducidad(selectedDate);
    } else {
      alert("No puedes seleccionar una fecha anterior a la actual");
    }
  };

  //VALIDAR  FECHA ADQUISICION
  const validarFechaA = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate <= maxDate) {
      setfechaAdquisicion(selectedDate);
    } else {
      alert("No puedes seleccionar una fecha superior a la actual");
    }
  };

  //VALIDAR MARCA
  const validarMarca = (e) => {
    const valor = e.target.value.toUpperCase();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]*$/; //LETRAS, ACENTOS Y Ñ
    if (regex.test(valor)) {
      setMarca(valor);
      setMarcaError(false);
    } else {
      setMarcaError(true);
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

  //LIMITE DE CARACTERES
  const maxCantidad = 7;
  const maxCTotal = 7;
  const maxCUnitario = 7;
  const maxDomicilio = 70;
  const maxLote = 3;
  const maxMarca = 20;

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
                    type="text"
                    placeholder="Ingresa la cantidad adquirida"
                    name="cantidad"
                    className={`form-control ${cantidadError ? 'is-invalid' : ''}`}
                    value={cantidad}
                    onChange={validarCantidad}
                    maxLength={maxCantidad}
                  />
                  <div className="form-text">
                    {cantidad.length}/{maxCantidad} caracteres ingresados
                  </div>
                  {cantidadError && (
                    <div className="alert alert-warning" role="alert">
                      La cantidad solo debe contener numeros.
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
                    type="text"
                    placeholder="Ingrese el costo $total"
                    name="costoTotal"
                    className={`form-control ${costo_TotalError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={costo_Total}
                    onChange={validarCostoTotal}
                    maxLength={maxCTotal}
                  />
                  <div className="form-text">
                    {costo_Total.length}/{maxCTotal} caracteres ingresados
                  </div>
                  {costo_TotalError && (
                    <div className="alert alert-warning" role="alert">
                      -El costo solo debe contener números. <br></br>
                      -Después de un punto solo puede ingresar dos digitos
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Costo Unitario</label>
                  <input
                    type="text"
                    placeholder="Ingrese el costo unitario"
                    name="costoUnitario"
                    className={`form-control ${costo_UnitarioError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={costo_Unitario}
                    onChange={validarCostoUnitario}
                    maxLength={maxCUnitario}
                  />
                  <div className="form-text">
                    {costo_Unitario.length}/{maxCUnitario} caracteres ingresados
                  </div>
                  {costo_UnitarioError && (
                    <div className="alert alert-warning" role="alert">
                      -El costo solo debe contener números. <br></br>
                      -Después de un punto solo puede ingresar dos digitos
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Domicilio Distribuidora</label>
                  <input
                    type="text"
                    placeholder="Ingrese el domicilio de la distribuidora"
                    name="domicilioDistribuidora"
                    className={`form-control ${domicilio_DistribuidoraError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={domicilio_Distribuidora}
                    onChange={validarDomicilio}
                    maxLength={maxDomicilio}
                  />
                  <div className="form-text">
                    {domicilio_Distribuidora.length}/{maxDomicilio} caracteres ingresados
                  </div>
                  {domicilio_DistribuidoraError && (
                    <div className="alert alert-warning" role="alert">
                      El domicilio no debe contener caracteres especiales.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Fecha Caducidad</label>
                  <input
                    type="date"
                    name="fechaCaducidad"
                    className="form-control"
                    value={fecha_Caducidad}
                    min={minDate} // Establecer el atributo min
                    onChange={validarFechaC}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Fecha Adquisicon</label>
                  <input
                    type="date"
                    name="fechaAdquisicion"
                    className="form-control"
                    value={fecha_Adquisicion}
                    max={maxDate} // Establecer el atributo min
                    onChange={validarFechaA}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Lote</label>
                  <input
                    type="text"
                    placeholder="Ingrese el lote del producto"
                    name="lote"
                    className={`form-control ${loteError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={lote}
                    onChange={validarLote}
                    maxLength={maxLote}
                  />
                  <div className="form-text">
                    {lote.length}/{maxLote} caracteres ingresados
                  </div>
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
                    className={`form-control ${marcaError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={marca}
                    onChange={validarMarca}
                    maxLength={maxMarca}
                  />
                  <div className="form-text">
                    {marca.length}/{maxMarca} caracteres ingresados
                  </div>
                  {marcaError && (
                    <div className="alert alert-warning" role="alert">
                      La marca no debe de contener caracteres especiales.
                    </div>
                  )}
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
