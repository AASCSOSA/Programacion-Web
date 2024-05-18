import React, { useState, useEffect } from "react";
import CompradorService from "../../Controllers/CompradorService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioCompradorComponent = () => {
  const [nombre, setNombre] = useState("");
  const [apellido_Pat, setApellido_Pat] = useState("");
  const [apellido_Mat, setApellido_Mat] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombre_Empresa, setNombreEmpresa] = useState("");


  //Validaciones
  const [emptyFieldsWarning, setEmptyFieldsWarning] = useState(false); //Validar que se llenen todos los datos
  const [telefonoError, setTelefonoError] = useState(false);
  const [nombreError, setNombreError] = useState(false);
  const [apellidoPatError, setApellidoPatError] = useState(false);
  const [apellidoMatError, setApellidoMatError] = useState(false);
  const [nombre_EmpresaError, setNombreEmpresaError] = useState(false);



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
  }, [id]);
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

  //VALIDAR NOMBRE
  const validarNombre = (e) => {
    const valor = e.target.value.toUpperCase();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]*$/; //LETRAS, ACENTOS Y Ñ
    if (regex.test(valor)) {
      setNombre(valor);
      setNombreError(false);
    } else {
      setNombreError(true);
    }
  };


  //VALIDAR APELLIDO PAT
  const validarApellido_Pat = (e) => {
    const valor = e.target.value.toUpperCase();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]*$/; //LETRAS, ACENTOS Y Ñ
    if (regex.test(valor)) {
      setApellido_Pat(valor);
      setApellidoPatError(false);
    } else {
      setApellidoPatError(true);
    }
  };

  //VALIDAR APAELLIDO MAT
  const validarApellido_Mat = (e) => {
    const valor = e.target.value.toUpperCase();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]*$/; //LETRAS, ACENTOS Y Ñ
    if (regex.test(valor)) {
      setApellido_Mat(valor);
      setApellidoMatError(false);
    } else {
      setApellidoMatError(true);
    }
  };

  //VALIDAR TELEFONO
  const validarTelefono = (e) => {
    const valor = e.target.value;
    const regex = /^[0-9]*$/; //NUMEROS 
    if (regex.test(valor)) {
      setTelefono(valor);
      setTelefonoError(false);
    } else {
      setTelefonoError(true);
    }
  };

  //VALIDAR NOMBRE EMPRESA
  const validarNombreEmpresa = (e) => {
    const valor = e.target.value.toUpperCase();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9.,\s]*$/; //LETRAS,NUMEROS, ACENTOS, Ñ, PUNTOS Y COMAS
    if (regex.test(valor)) {
      setNombreEmpresa(valor);
      setNombreEmpresaError(false);
    } else {
      setNombreEmpresaError(true);
    }
  };

  //LIMITE DE CARACTERES
  const maxNombre = 30;
  const maxApellidoP = 20;
  const maxApellidoM = 20;
  const maxTelefono = 10;
  const maxNEmpresa = 20;

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
                    className={`form-control ${nombreError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                    value={nombre}
                    onChange={validarNombre}
                    maxLength={maxNombre}
                  />
                  <div className="form-text">
                    {nombre.length}/{maxNombre} caracteres ingresados
                  </div>
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
                    onChange={validarApellido_Pat}
                    maxLength={maxApellidoP}
                  />
                  <div className="form-text">
                    {apellido_Pat.length}/{maxApellidoP} caracteres ingresados
                  </div>
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
                    onChange={validarApellido_Mat}
                    maxLength={maxApellidoM}
                  />
                  <div className="form-text">
                    {apellido_Mat.length}/{maxApellidoM} caracteres ingresados
                  </div>
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
                    onChange={validarTelefono}
                    maxLength={maxTelefono}
                  />
                  <div className="form-text">
                    {telefono.length}/{maxTelefono} caracteres ingresados
                  </div>
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
                    className={`form-control ${nombre_EmpresaError ? 'is-invalid' : ''}`}
                    value={nombre_Empresa}
                    onChange={validarNombreEmpresa}
                    maxLength={maxNEmpresa}
                  />
                  <div className="form-text">
                    {nombre_Empresa.length}/{maxNEmpresa} caracteres ingresados
                  </div>
                  {nombre_EmpresaError && (
                    <div className="alert alert-warning" role="alert">
                      El nombre de la empresa no debe de contener caracteres especiales.
                    </div>
                  )}
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
