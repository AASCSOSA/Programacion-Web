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
  const [warning, setWarning] = useState(false); // Validar que no sean negativos
  const [emptyFieldsWarning, setEmptyFieldsWarning] = useState(false); //Validar que se llenen todos los datos

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
    // Validar que no se ingresen valores negativos
    if (
      rejas_LimonVerde < 0 ||
      rejas_LimonSegunda < 0 ||
      rejas_LimonTercera < 0 ||
      total_PesoLimonVerde < 0 ||
      total_PesoLimonSegunda < 0 ||
      total_PesoLimonTercera < 0 ||
      total_Trabajadores < 0
    ) {
      setWarning(true);
      return;
    }

    // Validar que todos los campos estén llenos
    if (
      !fecha ||
      !rejas_LimonVerde ||
      !rejas_LimonSegunda ||
      !rejas_LimonTercera ||
      !total_PesoLimonVerde ||
      !total_PesoLimonSegunda ||
      !total_PesoLimonTercera ||
      !total_Trabajadores ||
      !id_Rancho
    ) {
      setEmptyFieldsWarning(true);
      return;
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
          navigate("/carga");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      CargaService.create(carga)
        .then((response) => {
          navigate("/carga");
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

  return (
    <div>
      <div className="container" id="formCarga">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Cargas</h2>
            <div className="card-body">
              {warning && (
                <div className="alert alert-warning" role="alert">
                  No se permiten valores negativos en los campos.
                </div>
              )}
              {emptyFieldsWarning && (
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
                    onChange={(e) => setFecha(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Rejas de limón Verde</label>
                  <input
                    type="number"
                    min="0" // No permite números negativos
                    placeholder="Ingrese las rejas de limón verde"
                    name="rejasLimonVerde"
                    className="form-control"
                    value={rejas_LimonVerde}
                    onChange={(e) => setRejasVerde(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Rejas de limón Segunda</label>
                  <input
                    type="number"
                    min="0" // No permite números negativos
                    placeholder="Ingrese las rejas de limón segunda"
                    name="rejasLimonSegunda"
                    className="form-control"
                    value={rejas_LimonSegunda}
                    onChange={(e) => setRejasSegunda(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Rejas de limón Tercera</label>
                  <input
                    type="number"
                    min="0" // No permite números negativos
                    placeholder="Ingrese las rejas de limón tercera"
                    name="rejasLimonTercera"
                    className="form-control"
                    value={rejas_LimonTercera}
                    onChange={(e) => setRejasTercera(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Total peso Limón Verde</label>
                  <input
                    type="number"
                    min="0" // No permite números negativos
                    step="0.01"
                    placeholder="Ingrese el total del peso del limón verde"
                    name="pesoLimónVerde"
                    className="form-control"
                    value={total_PesoLimonVerde}
                    onChange={(e) => setPesoTLimonVerde(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Total peso Limón Segunda</label>
                  <input
                    type="number"
                    min="0" // No permite números negativos
                    step="0.01"
                    placeholder="Ingrese el total del peso del limón segunda"
                    name="pesoLimónsegunda"
                    className="form-control"
                    value={total_PesoLimonSegunda}
                    onChange={(e) => setPesoTLimonSegunda(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Total peso Limón Tercera</label>
                  <input
                    type="number"
                    min="0" // No permite números negativos
                    step="0.01"
                    placeholder="Ingrese el total del peso del limón tercera"
                    name="pesoLimóntercera"
                    className="form-control"
                    value={total_PesoLimonTercera}
                    onChange={(e) => setPesoTLimonTercera(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Total de trabajadores</label>
                  <input
                    type="number"
                    min="0" // No permite números negativos
                    placeholder="Ingrese el total de trabajadores"
                    name="totalTrabajadores"
                    className="form-control"
                    value={total_Trabajadores}
                    onChange={(e) => setTrabajadores(e.target.value)}
                  ></input>
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
                <Link to="/carga" className="btn btn-danger">
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
