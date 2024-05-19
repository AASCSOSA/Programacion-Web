import React, { useState, useEffect } from "react";
import CargaService from "../../Controllers/CargaService";
import RanchoService from "../../Controllers/RanchoService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioRanchoComponent = () => {
  const [fecha, setFecha] = useState("");
  const [rejas_LimonVerde, setRejasVerde] = useState("");
  const [rejas_LimonSegunda, setRejasSegunda] = useState("");
  const [rejas_LimonTercera, setRejasTercera] = useState("");
  const [total_PesoLimonVerde, setPesoTLimonVerde] = useState("");
  const [total_PesoLimonSegunda, setPesoTLimonSegunda] = useState("");
  const [total_PesoLimonTercera, setPesoTLimonTercera] = useState("");
  const [total_Trabajadores, setTrabajadores] = useState("");
  const [id_Rancho, setId_Rancho] = useState("");
  const [ranchos, setRanchos] = useState([]); // Lista de ranchos

  //VALIDACIONES
  const [rejas_LimonVerdeError, setRejasVerdeError] = useState(false);
  const [rejas_LimonSegundaError, setRejasSegundaError] = useState(false);
  const [rejas_LimonTerceraError, setRejasTerceraError] = useState(false);
  const [total_PesoLimonVerdeError, setPesoTLimonVerdeError] = useState(false);
  const [total_PesoLimonSegundaError, setPesoTLimonSegundaError] = useState(false);
  const [total_PesoLimonTerceraError, setPesoTLimonTerceraError] = useState(false);
  const [total_TrabajadoresError, setTrabajadoresError] = useState(false);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso se suma 1
  const day = String(today.getDate()).padStart(2, '0');
  const maxDate = `${year}-${month}-${day}`;

  const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDACION DE LLENADO DE CAMPOS


  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    RanchoService.findAll()
      .then((response) => {
        setRanchos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      CargaService.findById(id)
        .then((response) => {
          const carga = response.data;
          setFecha(carga.fecha);
          setRejasVerde(carga.rejas_LimonVerde);
          setRejasSegunda(carga.rejas_LimonSegunda);
          setRejasTercera(carga.rejas_LimonTercera);
          setPesoTLimonVerde(carga.total_PesoLimonVerde);
          setPesoTLimonSegunda(carga.total_PesoLimonSegunda);
          setPesoTLimonTercera(carga.total_PesoLimonTercera);
          setTrabajadores(carga.total_Trabajadores);
          // Buscar el ID del rancho asociado a esta carga
          CargaService.findByIdRancho(id)
            .then((response2) => {
              const rancho = response2.data;
              setId_Rancho(rancho.id_Rancho); // Actualiza el estado id_Rancho con el ID del rancho encontrado
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener la carga:", error);
        });
    }
  }, [id]);



  const saveCarga = (e) => {
    e.preventDefault();

    // VALIDAR TODO EL LLENADO DE DATOS
    if (
      !fecha ||
      !rejas_LimonVerde ||
      !rejas_LimonSegunda ||
      !rejas_LimonTercera ||
      !total_PesoLimonVerde ||
      !total_PesoLimonSegunda ||
      !total_PesoLimonTercera ||
      !total_Trabajadores ||
      !id_Rancho ||

      //ERRORES
      rejas_LimonVerdeError ||
      rejas_LimonSegundaError ||
      rejas_LimonTerceraError ||
      total_PesoLimonVerdeError ||
      total_PesoLimonSegundaError ||
      total_PesoLimonTerceraError ||
      total_TrabajadoresError
    ) {
      setCamposVaciosWarning(true);
      return; // Detiene la ejecución de la función si hay un error en el mont
    }

    const rancho = { id_Rancho };
    const carga = {
      fecha,
      rejas_LimonVerde,
      rejas_LimonSegunda,
      rejas_LimonTercera,
      total_PesoLimonVerde,
      total_PesoLimonSegunda,
      total_PesoLimonTercera,
      total_Trabajadores,
      rancho,
    };
    if (id) {
      CargaService.update(id, carga)
        .then((response) => {
          navigate("/cargaForMonth");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      CargaService.create(carga)
        .then((response) => {
          navigate("/cargaForMonth");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const titulo = () => {
    if (id) {
      return <h2 className="text-center">Editar Carga</h2>;
    } else {
      return <h2 className="text-center">Agregar Carga</h2>;
    }
  };

  //VALIDAR REJAS LIMON VERDE
  const validarRejas_LimonVerde = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/; //NUMEROS 
    if (regex.test(inputValue)) {
      setRejasVerde(inputValue);
      setRejasVerdeError(false);
    } else {
      setRejasVerdeError(true);
    }
  };

  //VALIDAR REJAS LIMON SEGUNDA
  const validarRejas_LimonSegunda = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/; //NUMEROS 
    if (regex.test(inputValue)) {
      setRejasSegunda(inputValue);
      setRejasSegundaError(false);
    } else {
      setRejasSegundaError(true);
    }
  };

  //VALIDAR REJAS LIMON TERCERA
  const validarRejas_LimonTercera = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/; //NUMEROS 
    if (regex.test(inputValue)) {
      setRejasTercera(inputValue);
      setRejasTerceraError(false);
    } else {
      setRejasTerceraError(true);
    }
  };

  //VALIDAR TOTAL PESO LIMON VERDE
  const validarTotal_PesoLimonVerde = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPesoTLimonVerde(inputValue);
      setPesoTLimonVerdeError(false);
    } else {
      setPesoTLimonVerdeError(true);
    }
  };

  //VALIDAR TOTAL PESO LIMON SEGUNDA
  const validarTotal_PesoLimonSegunda = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPesoTLimonSegunda(inputValue);
      setPesoTLimonSegundaError(false);
    } else {
      setPesoTLimonSegundaError(true);
    }
  };

  //VALIDAR TOTAL PESO LIMON TERCERA
  const validarTotal_PesoLimonTercera = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setPesoTLimonTercera(inputValue);
      setPesoTLimonTerceraError(false);
    } else {
      setPesoTLimonTerceraError(true);
    }
  };

  //VALIDAR TOTAL DE TRABAJADORES
  const validarTotal_Trabajadores = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
    if (regex.test(inputValue)) {
      setTrabajadores(inputValue);
      setTrabajadoresError(false);
    } else {
      setTrabajadores(inputValue);
      setTrabajadoresError(true);
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
  const maxRVerde = 4;
  const maxRSegunda = 4;
  const maxRTercera = 4;
  const maxPVerde = 7;
  const maxPSegunda = 7;
  const maxPTercera = 7;
  const maxTrabajadores = 3;

  return (
    <div>
      <div className="container" id="formCarga">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Cargas</h2>
            <div className="card-body">
              {camposVaciosWarning && (
                <div className="alert alert-warning" role="alert">
                  Por favor, complete todos los campos.
                </div>
              )}
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    name="NombreRancho"
                    className="form-control"
                    value={fecha}
                    max={maxDate} // Establecer el atributo max
                    onChange={validarFecha}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Rejas de limón Verde</label>
                  <input
                    type="text"
                    placeholder="Ingrese las rejas de limón verde"
                    name="rejasLimonVerde"
                    className={`form-control ${rejas_LimonVerdeError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={rejas_LimonVerde}
                    onChange={validarRejas_LimonVerde}
                    maxLength={maxRVerde}
                  />
                  <div className="form-text">
                    {rejas_LimonVerde.length}/{maxRVerde} caracteres ingresados
                  </div>
                  {rejas_LimonVerdeError && (
                    <div className="alert alert-warning" role="alert">
                      La cantidad de rejas solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Rejas de limón Segunda</label>
                  <input
                    type="text"
                    placeholder="Ingrese las rejas de limón segunda"
                    name="rejasLimonSegunda"
                    className={`form-control ${rejas_LimonSegundaError ? 'is-invalid' : ''}`}
                    value={rejas_LimonSegunda}
                    onChange={validarRejas_LimonSegunda}
                    maxLength={maxRSegunda}
                  />
                  <div className="form-text">
                    {rejas_LimonSegunda.length}/{maxRSegunda} caracteres ingresados
                  </div>
                  {rejas_LimonSegundaError && (
                    <div className="alert alert-warning" role="alert">
                      La cantidad de rejas solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Rejas de limón Tercera</label>
                  <input
                    type="text"
                    placeholder="Ingrese las rejas de limón tercera"
                    name="rejasLimonTercera"
                    className={`form-control ${rejas_LimonTerceraError ? 'is-invalid' : ''}`}
                    value={rejas_LimonTercera}
                    onChange={validarRejas_LimonTercera}
                    maxLength={maxRTercera}
                    />
                    <div className="form-text">
                      {rejas_LimonTercera.length}/{maxRTercera} caracteres ingresados
                    </div>
                  {rejas_LimonTerceraError && (
                    <div className="alert alert-warning" role="alert">
                      La cantidad de rejas solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Total peso Limón Verde</label>
                  <input
                    type="text"
                    placeholder="Ingrese el total del peso del limón verde"
                    name="pesoLimónVerde"
                    className={`form-control ${total_PesoLimonVerdeError ? 'is-invalid' : ''}`}
                    value={total_PesoLimonVerde}
                    onChange={validarTotal_PesoLimonVerde}
                    maxLength={maxPVerde}
                    />
                    <div className="form-text">
                      {total_PesoLimonVerde.length}/{maxPVerde} caracteres ingresados
                    </div>
                  {total_PesoLimonVerdeError && (
                    <div className="alert alert-warning" role="alert">
                      El total del peso solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Total peso Limón Segunda</label>
                  <input
                    type="text"
                    placeholder="Ingrese el total del peso del limón segunda"
                    name="pesoLimónSegunda"
                    className={`form-control ${total_PesoLimonSegundaError ? 'is-invalid' : ''}`}
                    value={total_PesoLimonSegunda}
                    onChange={validarTotal_PesoLimonSegunda}
                    maxLength={maxPSegunda}
                    />
                    <div className="form-text">
                      {total_PesoLimonSegunda.length}/{maxPSegunda} caracteres ingresados
                    </div>
                  {total_PesoLimonSegundaError && (
                    <div className="alert alert-warning" role="alert">
                      El total del peso solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Total peso Limón Tercera</label>
                  <input
                    type="text"
                    placeholder="Ingrese el total del peso del limón tercera"
                    name="pesoLimóntercera"
                    className={`form-control ${total_PesoLimonTerceraError ? 'is-invalid' : ''}`}
                    value={total_PesoLimonTercera}
                    onChange={validarTotal_PesoLimonTercera}
                    maxLength={maxPTercera}
                    />
                    <div className="form-text">
                      {total_PesoLimonTercera.length}/{maxPTercera} caracteres ingresados
                    </div>
                  {total_PesoLimonTerceraError && (
                    <div className="alert alert-warning" role="alert">
                      El total del peso solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Total de trabajadores</label>
                  <input
                    type="text"
                    placeholder="Ingrese el total de trabajadores"
                    name="totalTrabajadores"
                    className={`form-control ${total_TrabajadoresError ? 'is-invalid' : ''}`}
                    value={total_Trabajadores}
                    onChange={validarTotal_Trabajadores}
                    maxLength={maxTrabajadores}
                    />
                    <div className="form-text">
                      {total_Trabajadores.length}/{maxTrabajadores} caracteres ingresados
                    </div>
                  {total_TrabajadoresError && (
                    <div className="alert alert-warning" role="alert">
                      El total de trabajadores solo debe contener números.
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Seleccione el Rancho</label>
                  <select
                    className="form-select"
                    value={id_Rancho}
                    onChange={(e) => setId_Rancho(e.target.value)}
                  >
                    <option value="">Seleccionar Rancho</option>
                    {ranchos.map((rancho) => (
                      <option key={rancho.id_Rancho} value={rancho.id_Rancho}>
                        {rancho.nombre_Rancho}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveCarga(e)}
                >
                  Guardar
                </button>
                &nbsp;&nbsp;
                <Link to="/cargaForMonth" className="btn btn-danger">
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
export default FormularioRanchoComponent;