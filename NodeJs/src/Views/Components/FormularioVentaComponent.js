import React, { useState, useEffect } from "react";
import VentaService from "../../Controllers/VentaService";
import CompradorService from "../../Controllers/CompradorService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioVentaComponent = () => {
  const [pago_Total, setPagoTotal] = useState("");
  const [peso_Total, setPesoTotal] = useState("");
  const [precio_LimonVerde, setPrecioLimonVerde] = useState("");
  const [precio_LimonSegunda, setPrecioLimonSegunda] = useState("");
  const [precio_LimonTercera, setPrecioLimonTercera] = useState("");
  const [id_Carga, setIdCarga] = useState("");
  const [fecha, setFecha] = useState("");
  const [id_Comprador, setIdComprador] = useState("");
  const [compradores, setCompradores] = useState([]);


  //VALIDACIONES
  const [precio_LimonVerdeError, setPrecioLimonVerdeError] = useState(false);
  const [precio_LimonSegundaError, setPrecioLimonSegundaError] = useState(false);
  const [precio_LimonTerceraError, setPrecioLimonTerceraError] = useState(false);
  const [pago_TotalError, setPagoTotalError] = useState(false);
  const [peso_TotalError, setPesoTotalError] = useState(false);

  // OBTENER FECHA ACTUAL EN FORMATO YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso se suma 1
  const day = String(today.getDate()).padStart(2, '0');
  const maxDate = `${year}-${month}-${day}`;

  const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDACION DE LLENADO DE CAMPOS


  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    CompradorService.findAll()
      .then((response) => {
        setCompradores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      VentaService.findById(id)
        .then((response) => {
          const venta = response.data;
          setPagoTotal(venta.pago_Total);
          setPesoTotal(venta.peso_Total);
          setPrecioLimonVerde(venta.precio_LimonVerde);
          setPrecioLimonSegunda(venta.precio_LimonSegunda);
          setPrecioLimonTercera(venta.precio_LimonTercera);
          setFecha(venta.fecha);

          VentaService.findByIdCarga(id)
            .then((response2) => {
              const carga = response2.data;
              setIdCarga(carga.id_Carga);
              console.log(carga);
              console.log(carga.id_Carga);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener la venta:", error);
        });

      VentaService.findByIdComprador(id)
        .then((response3) => {
          const comprador = response3.data;
          setIdComprador(comprador.id_Comprador);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const saveVenta = (e) => {
    e.preventDefault();

    // VALIDAR TODO EL LLENADO DE DATOS
    if (
      !pago_Total ||
      !peso_Total ||
      !precio_LimonVerde ||
      !precio_LimonSegunda ||
      !precio_LimonTercera ||
      !id_Carga ||
      !id_Comprador ||
      !fecha ||

      //ERRORES
      precio_LimonVerdeError ||
      precio_LimonSegundaError ||
      precio_LimonTerceraError ||
      peso_TotalError ||
      pago_TotalError
    ) {
      setCamposVaciosWarning(true);
      return; // Detiene la ejecución 
    }

    const carga = { id_Carga };
    const comprador = { id_Comprador };
    const venta = {
      pago_Total,
      peso_Total,
      precio_LimonVerde,
      precio_LimonSegunda,
      precio_LimonTercera,
      carga,
      comprador,
      fecha,
    };
    if (id) {
      VentaService.update(venta, id)
        .then((response) => {
          navigate("/ventaForMonth");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      VentaService.create(venta)
        .then((response) => {
          navigate("/ventaForMonth");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const titulo = () => {
    if (id) {
      return <h2 className="text-center">Editar Venta</h2>;
    } else {
      return <h2 className="text-center">Agregar Venta</h2>;
    }
  };

  //VALIDAR PRECIO LIMON VERDE
  const validarPrecio_LimonVerde = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPrecioLimonVerde(inputValue);
      setPrecioLimonVerdeError(false);
    } else {
      setPrecioLimonVerdeError(true);
    }
  };

  //VALIDAR PRECIO LIMON SEGUNDA
  const validarPrecio_LimonSegunda = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPrecioLimonSegunda(inputValue);
      setPrecioLimonSegundaError(false);
    } else {
      setPrecioLimonSegundaError(true);
    }
  };

  //VALIDAR PAGO LIMON TERCERA
  const validarPrecio_LimonTercera = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPrecioLimonTercera(inputValue);
      setPrecioLimonTerceraError(false);
    } else {
      setPrecioLimonTerceraError(true);
    }
  };

  //VALIDAR PESO TOTAL
  const validarPeso_Total = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPesoTotal(inputValue);
      setPesoTotalError(false);
    } else {
      setPesoTotalError(true);
    }
  };

  //VALIDAR PAGO TOTAL
  const validarPago_Total = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPagoTotal(inputValue);
      setPagoTotalError(false);
    } else {
      setPagoTotalError(true);
    }
  };

  //VALIDAR FECHA
  const validarFecha = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate <= maxDate) {
      setFecha(selectedDate);
    } else {
      alert("No puedes seleccionar una fecha futura");
    }
  };

  //LIMITE DE CARACTERES
  const maxPrecioVerde = 7;
  const maxPrecioSegunda = 7;
  const maxPrecioTercera = 7;
  const maxPeso = 7;
  const maxPago = 7;


  return (
    <div>
      <div className="container" id="formVenta">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Ventas</h2>
            <div className="card-body">
              {camposVaciosWarning && (
                <div className="alert alert-warning" role="alert">
                  Por favor, complete todos los campos.
                </div>
              )}
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Precio Limón Verde</label>
                  <input
                    type="text"
                    placeholder="Ingrese el precio del limón verde"
                    name="precioLimonVerde"
                    className={`form-control ${precio_LimonVerdeError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={precio_LimonVerde}
                    onChange={validarPrecio_LimonVerde}
                    maxLength={maxPrecioVerde}
                  />
                  <div className="form-text">
                    {precio_LimonVerde.length}/{maxPrecioVerde} caracteres ingresados
                  </div>
                  {precio_LimonVerdeError && (
                    <div className="alert alert-warning" role="alert">
                      El precio solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Precio Limón Segunda</label>
                  <input
                    type="text"
                    placeholder="Ingrese el precio del limón segunda"
                    name="precioLimonSegunda"
                    className={`form-control ${precio_LimonSegundaError ? 'is-invalid' : ''}`}
                    value={precio_LimonSegunda}
                    onChange={validarPrecio_LimonSegunda}
                    maxLength={maxPrecioSegunda}
                    />
                    <div className="form-text">
                      {precio_LimonSegunda.length}/{maxPrecioSegunda} caracteres ingresados
                    </div>
                  {precio_LimonSegundaError && (
                    <div className="alert alert-warning" role="alert">
                      El precio solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Precio Limón Tercera</label>
                  <input
                    type="text"
                    placeholder="Ingrese el precio del limón tercera"
                    name="precioLimonTercera"
                    className={`form-control ${precio_LimonTerceraError ? 'is-invalid' : ''}`}
                    value={precio_LimonTercera}
                    onChange={validarPrecio_LimonTercera}
                    maxLength={maxPrecioTercera}
                    />
                    <div className="form-text">
                      {precio_LimonTercera.length}/{maxPrecioTercera} caracteres ingresados
                    </div>
                  {precio_LimonTerceraError && (
                    <div className="alert alert-warning" role="alert">
                      El precio solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Peso Total</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el peso total de la venta"
                    name="pesoTotal"
                    className={`form-control ${peso_TotalError ? 'is-invalid' : ''}`}
                    value={peso_Total}
                    onChange={validarPeso_Total}
                    maxLength={maxPeso}
                    />
                    <div className="form-text">
                      {peso_Total.length}/{maxPeso} caracteres ingresados
                    </div>
                  {peso_TotalError && (
                    <div className="alert alert-warning" role="alert">
                      El peso solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Pago Total</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el pago total $"
                    name="precioTotal"
                    className={`form-control ${pago_TotalError ? 'is-invalid' : ''}`}
                    value={pago_Total}
                    onChange={validarPago_Total}
                    maxLength={maxPago}
                    />
                    <div className="form-text">
                      {pago_Total.length}/{maxPago} caracteres ingresados
                    </div>
                  {pago_TotalError && (
                    <div className="alert alert-warning" role="alert">
                      El pago solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    name="fechaVenta"
                    className="form-control"
                    value={fecha}
                    max={maxDate} // Establecer el atributo max
                    onChange={validarFecha}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Id de la carga</label>
                  <input
                    type="number"
                    placeholder="Ingrese el ID de la carga"
                    name="idCarga"
                    className="form-control"
                    value={id_Carga}
                    onChange={(e) => setIdCarga(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Seleccione el Comprador</label>
                  <select
                    className="form-select"
                    value={id_Comprador}
                    onChange={(e) => setIdComprador(e.target.value)}
                  >
                    <option value="">Seleccione el Comprador</option>
                    {compradores.map((comprador) => (
                      <option
                        key={comprador.id_Comprador}
                        value={comprador.id_Comprador}
                      >
                        {comprador.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveVenta(e)}
                >
                  Guardar
                </button>
                &nbsp;&nbsp;
                <Link to="/ventaForMonth" className="btn btn-danger">
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
export default FormularioVentaComponent;
