import React, { useState, useEffect } from "react";
import CompradorService from "../../Controllers/CompradorService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioCompradorComponent = () => {
  const [nombre, setNombre] = useState("");
  const [apellido_Pat, setApellido_Pat] = useState("");
  const [apellido_Mat, setApellido_Mat] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombre_Empresa, setNombreEmpresa] = useState("");

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
  return (
    <div>
      <div className="container" id="formComprador">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Compradores</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Nombre del comprador</label>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre del Comprador"
                    name="nombre"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Apellido Paterno</label>
                  <input
                    type="text"
                    placeholder="Ingrese el apellido paterno"
                    name="apellidoPaterno"
                    className="form-control"
                    value={apellido_Pat}
                    onChange={(e) => setApellido_Pat(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Apellido Materno</label>
                  <input
                    type="text"
                    placeholder="Ingrese el apellido materno"
                    name="apellidoMaterno"
                    className="form-control"
                    value={apellido_Mat}
                    onChange={(e) => setApellido_Mat(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Telefono</label>
                  <input
                    type="text"
                    placeholder="Ingrese el telefono"
                    name="telefono"
                    className="form-control"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  ></input>
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
