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
    const [id_Herramienta, setId_Herramienta] = useState('');
    const [herramientas, setHerramientas] = useState([]); // Lista de herramientas

    //VALIDACIONES
    const [nombreError, setNombreError] = useState(false);
    const [apellidoPatError, setApellidoPatError] = useState(false);
    const [apellidoMatError, setApellidoMatError] = useState(false);
    const [telefonoError, setTelefonoError] = useState(false);
    const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDAR EL LLENADO DE DATOS


    const navigate = useNavigate();
    const { id_Trabajador } = useParams();

    useEffect(() => {
        HerramientaService.findAll()
            .then((response) => {
                setHerramientas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (id_Trabajador) {
            TrabajadorService.findById(id_Trabajador).then(response => {
                const trabajador = response.data;
                setNombre(trabajador.nombre);
                setApellido_Pat(trabajador.apellido_Pat);
                setApellido_Mat(trabajador.apellido_Mat);
                setTelefono(trabajador.telefono);
                setDireccion(trabajador.direccion);
                // Buscar el ID de la herramienta asociado a este trabajador
                TrabajadorService.findByIdHerramienta(id_Trabajador)
                    .then((response2) => {
                        const herramienta = response2.data;
                        setId_Herramienta(herramienta.id_Herramienta); // Actualiza el estado id_Herramienta con el ID de la herramienta encontrado
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
        }
    }, [id_Trabajador]);

    const saveTrabajador = (e) => {
        e.preventDefault();

        // VALIDAR QUE SE LLENEN LOS DATOS
        if (
            !nombre ||
            !apellido_Pat ||
            !apellido_Mat ||
            !telefono ||
            !direccion ||
            !id_Herramienta
        ) {
            setCamposVaciosWarning(true);
            return;
        }

        const herramienta = { id_Herramienta };
        const trabajador = { nombre, apellido_Pat, apellido_Mat, telefono, direccion, herramienta };
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
        const inputValue = e.target.value;

        //MAYUSCULAS, MINUSCULAS Y ESPACIOS
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setNombre(inputValue);
            setNombreError(false);
        } else {
            setNombreError(true);
        }
    };

    //VALIDAR APELLIDO PATERNO
    const validarApellido_Pat = (e) => {
        const inputValue = e.target.value;

        //MAYUSCULAS, MINUSCULAS Y ESPACIOS
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setApellido_Pat(inputValue);
            setApellidoPatError(false);
        } else {
            setApellidoPatError(true);
        }
    };

    //VALIDAR APELLIDO MATERNO
    const validarApellido_Mat = (e) => {
        const inputValue = e.target.value;

        //MAYUSCULAS, MINUSCULAS Y ESPACIOS
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setApellido_Mat(inputValue);
            setApellidoMatError(false);
        } else {
            setApellidoMatError(true);
        }
    };

    //VALIDAR TELEFONO
    const validarTelefono = (e) => {
        const inputValue = e.target.value;

        //SOLO NUMEROS 
        if (/^\d*$/.test(inputValue)) {
            setTelefono(inputValue);
            setTelefonoError(false);
        } else {
            setTelefonoError(true);
        }
    };

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
                                        onChange={validarNombre}>
                                    </input>
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
                                        onChange={validarApellido_Pat}>
                                    </input>
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
                                        onChange={validarApellido_Mat}>
                                    </input>
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
                                        onChange={validarTelefono}>
                                    </input>
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
                                        className='form-control'
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Selecciona la herramienta</label>
                                    <select
                                        className="form-select"
                                        value={id_Herramienta}
                                        onChange={(e) => setId_Herramienta(e.target.value)}
                                    >
                                        <option value="">Seleccionar Herramienta</option>
                                        {herramientas.map((herramienta) => (
                                            <option key={herramienta.id_Herramienta} value={herramienta.id_Herramienta}>
                                                {herramienta.modelo}
                                            </option>
                                        ))}
                                    </select>
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
