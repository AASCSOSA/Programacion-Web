import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TrabajadorService from '../../Controllers/TrabajadorService';
import HerramientaService from '../../Controllers/HerramientaService';

export const FormularioTrabajadorComponent = () => {
    const [nombre, setNombre] = useState('');
    const [apellido_Pat, setApellido_Pat] = useState('');
    const [apellido_Mat, setApellido_Mat] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    // const [id_Herramienta, setId_Herramienta] = useState('');
    // const [herramientas, setHerramientas] = useState([]); // Lista de herramientas

    //VALIDACIONES
    const [nombreError, setNombreError] = useState(false);
    const [apellidoPatError, setApellidoPatError] = useState(false);
    const [apellidoMatError, setApellidoMatError] = useState(false);
    const [telefonoError, setTelefonoError] = useState(false);
    const [direccionError, setDireccionError] = useState(false);

    const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDAR EL LLENADO DE DATOS

    const navigate = useNavigate();
    const { id_Trabajador } = useParams();

    useEffect(() => {
        TrabajadorService.findById(id_Trabajador).then(response => {
            const trabajador = response.data;
            setNombre(trabajador.nombre);
            setApellido_Pat(trabajador.apellido_Pat);
            setApellido_Mat(trabajador.apellido_Mat);
            setTelefono(String(trabajador.telefono));
            setDireccion(trabajador.direccion)
        }).catch(e => {
            console.log(e);
        })
    }, [id_Trabajador]);

    const saveTrabajador = (e) => {
        e.preventDefault();

        // VALIDAR QUE SE LLENEN LOS DATOS
        if (
            !nombre ||
            !apellido_Pat ||
            !apellido_Mat ||
            !telefono ||
            !direccion 
        ) {
            setCamposVaciosWarning(true);
            return;
        }


        const trabajador = { nombre, apellido_Pat, apellido_Mat, telefono, direccion };
        if (id_Trabajador) {
            TrabajadorService.update(id_Trabajador, trabajador).then(response => {
                navigate('/trabajador');
            }).catch(e => {
                console.log(e);
            })
        } else {
            TrabajadorService.create(trabajador).then(response => {
                navigate('/trabajador');
            }).catch(e => {
                console.log(e);
            })
        }
    }

    const titulo = () => {
        if (id_Trabajador) {
            return <h2 className="text-center">Editar Trabajador</h2>
        } else {
            return <h2 className="text-center">Agregar Trabajador</h2>
        }
    }

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

    //VALIDAR APELLIDO PATERNO
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

    //VALIDAR APELLIDO MATERNO
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

    //VALIDAR DIRECCION
    const validarDireccion = (e) => {
        const valor = e.target.value.toUpperCase();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9.,\s]*$/; //LETRAS,NUMEROS, ACENTOS, Ñ, PUNTOS Y COMAS
        if (regex.test(valor)) {
            setDireccion(valor);
            setDireccionError(false);
        } else {
            setDireccionError(true);
        }
    };

    //LIMITE DE CARACTERES
    const maxNombre = 30;
    const maxApellidoP = 20;
    const maxApellidoM = 20;
    const maxTelefono = 10;
    const maxDireccion = 70;

    return (
        <div>
            <div className='container' id="formTrabajador">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className="text-center">
                            {titulo()}
                        </h2>
                        <h2 className='text-center'>Gestión de Trabajadores</h2>
                        <div className='card-body'>
                            {camposVaciosWarning && (
                                <div className="alert alert-warning" role="alert">
                                    Por favor, complete todos los campos.
                                </div>
                            )}
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre</label>
                                    <input type='text'
                                        placeholder='Ingrese el nombre del trabajador'
                                        name='nombreTrabajador'
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

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Apellido Paterno</label>
                                    <input type='text'
                                        placeholder='Ingrese el apellido paterno del trabajador'
                                        name='apellido_PatTrabajador'
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


                                <div className='form-group mb-2'>
                                    <label className='form-label'>Apellido Materno</label>
                                    <input type='text'
                                        placeholder='Ingrese el apellido materno del trabajador'
                                        name='apellido_MatTrabajador'
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


                                <div className='form-group mb-2'>
                                    <label className='form-label'>Teléfono</label>
                                    <input type='text'
                                        placeholder='Ingrese el teléfono del trabajador'
                                        name='telefonoTrabajador'
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


                                <div className='form-group mb-2'>
                                    <label className='form-label'>Dirección</label>
                                    <input type='text'
                                        placeholder='Ingrese la dirección del trabajador'
                                        name='direccionTrabajador'
                                        className={`form-control ${direccionError ? 'is-invalid' : ''}`}
                                        value={direccion}
                                        onChange={validarDireccion}
                                        maxLength={maxDireccion}
                                    />
                                    <div className="form-text">
                                        {direccion.length}/{maxDireccion} caracteres ingresados
                                    </div>
                                    {direccionError && (
                                        <div className="alert alert-warning" role="alert">
                                            La direccion no debe de contener caracteres especiales.
                                        </div>
                                    )}
                                </div>

                                <button className='btn btn-success' onClick={(e) => saveTrabajador(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/trabajador' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormularioTrabajadorComponent;
