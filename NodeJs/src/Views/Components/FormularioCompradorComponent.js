import React, { useState, useEffect } from "react";
import CompradorService from "../../Controllers/CompradorService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioCompradorComponent = () => {
  const [nombre, setNombre] = useState("");
  const [apellido_Pat, setApellido_Pat] = useState("");
  const [apellido_Mat, setApellido_Mat] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombre_Empresa, setNombreEmpresa] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [apellidoPatError, setApellidoPatError] = useState(false);
  const [apellidoMatError, setApellidoMatError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);
  const [emptyFieldsWarning, setEmptyFieldsWarning] = useState(false); //Validar que se llenen todos los datos

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    CompradorService.findById(id)
      .then((response) => {
        setNombre(response.data.nombre);
        setApellido_Pat(response.data.apellido_Pat);
        setApellido_Mat(response.data.apellido_Mat);
        setTelefono(response.data.telefono);
        setNombreEmpresa(response.data.nombre_Empresa);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const saveComprador = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (
      !nombre ||
      !apellido_Pat ||
      !apellido_Mat ||
      !telefono ||
      !nombre_Empresa
    ) {
      setEmptyFieldsWarning(true);
      return;
    }

    const comprador = {
      nombre,
      apellido_Pat,
      apellido_Mat,
      telefono,
      nombre_Empresa,
    };
    if (id) {
      CompradorService.update(id, comprador)
        .then((response) => {
          navigate("/comprador");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      CompradorService.create(comprador)
        .then((response) => {
          navigate("/comprador");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const titulo = () => {
    if (id) {
      return <h2 className="text-center">Editar Comprador</h2>;
    } else {
      return <h2 className="text-center">Agregar Comprador</h2>;
    }
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      setNombre(inputValue);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };

  const handleApellidoPatChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      setApellido_Pat(inputValue);
      setApellidoPatError(false);
    } else {
      setApellidoPatError(true);
    }
  };

  const handleApellidoMatChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      setApellido_Mat(inputValue);
      setApellidoMatError(false);
    } else {
      setApellidoMatError(true);
    }
  };

  const handleTelefonoChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setTelefono(inputValue);
      setTelefonoError(false);
    } else {
      setTelefonoError(true);
    }
  };
  return (
    <div>
      <div className="container" id="formComprador">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Compradores</h2>
            <div className="card-body">
              {emptyFieldsWarning && (
                <div className="alert alert-warning" role="alert">
                  Por favor, complete todos los campos.
                </div>
              )}
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Nombre del comprador</label>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre del Comprador"
                    name="nombre"
                    className={`form-control ${nombreError ? 'is-invalid' : ''}`}
                    value={nombre}
                    onChange={handleNombreChange}>
                  </input>
                  {nombreError && (
                    <div className="alert alert-warning" role="alert">
                      El nombre no debe contener números.
                    </div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Apellido Paterno</label>
                  <input
                    type="text"
                    placeholder="Ingrese el apellido paterno"
                    name="apellidoPaterno"
                    className={`form-control ${apellidoPatError ? 'is-invalid' : ''}`}
                    value={apellido_Pat}
                    onChange={handleApellidoPatChange}>
                  </input>
                  {apellidoPatError && (
                    <div className="alert alert-warning" role="alert">
                      El apellido paterno no debe contener números.
                    </div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Apellido Materno</label>
                  <input
                    type="text"
                    placeholder="Ingrese el apellido materno"
                    name="apellidoMaterno"
                    className={`form-control ${apellidoMatError ? 'is-invalid' : ''}`}
                    value={apellido_Mat}
                    onChange={handleApellidoMatChange}>
                  </input>
                  {apellidoMatError && (
                    <div className="alert alert-warning" role="alert">
                      El apellido materno no debe contener números.
                    </div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Telefono</label>
                  <input
                    type="text"
                    placeholder="Ingrese el telefono"
                    name="telefono"
                    className={`form-control ${telefonoError ? 'is-invalid' : ''}`}
                    value={telefono}
                    onChange={handleTelefonoChange}>
                  </input>
                  {telefonoError && (
                    <div className="alert alert-warning" role="alert">
                      El teléfono solo debe contener números.
                    </div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Nombre de la empresa</label>
                  <input
                    type="text"
                    placeholder="Ingresa el nombre de la empresa"
                    name="nombreEmpresa"
                    className="form-control"
                    value={nombre_Empresa}
                    onChange={(e) => setNombreEmpresa(e.target.value)}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveComprador(e)}
                >
                  Guardar
                </button>
                &nbsp;&nbsp;
                <Link to="/comprador" className="btn btn-danger">
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormularioCompradorComponent;
