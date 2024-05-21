import React, { useState, useEffect } from 'react';
import RanchoService from '../../Controllers/RanchoService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const FormularioRanchoComponent = () => {
    const [nombre_Rancho, setNombreRancho] = useState('');
    const [ubicacion_Rancho, setUbicacionRancho] = useState('');
    const [extension_Rancho, setExtensionRancho] = useState('');

    //VALIDACIONES
    const [nombre_RanchoError, setNombreRanchoError] = useState(false);
    const [ubicacion_RanchoError, setUbicacionRanchoError] = useState(false);
    const [extension_RanchoError, setExtensionRanchoError] = useState(false);
    const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDACION DE LLENADO DE CAMPOS


    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        RanchoService.findById(id).then(response => {
            setNombreRancho(response.data.nombre_Rancho);
            setUbicacionRancho(response.data.ubicacion_Rancho);
            setExtensionRancho(response.data.extension_Rancho);
        }).catch(e => {
            console.log(e);
        })
    }, [id]);

    const saveRancho = (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (
            !nombre_Rancho ||
            !ubicacion_Rancho ||
            !extension_Rancho
        ) {
            setCamposVaciosWarning(true);
            return;
        }

        const rancho = { nombre_Rancho, ubicacion_Rancho, extension_Rancho };
        if (id) {
            RanchoService.update(id, rancho).then(response => {
                navigate("/rancho");
            }).catch(e => {
                console.log(e);
            })
        } else {
            RanchoService.create(rancho).then(response => {
                navigate("/rancho");
            }).catch(e => {
                console.log(e);
            })
        }
    }

    const titulo = () => {
        if (id) {
            return <h2 className="text-center">Editar Rancho</h2>
        } else {
            return <h2 className="text-center">Agregar Rancho</h2>
        }
    }

    //VALIDAR NOMBRE RANCHO
    const validarNombre_Rancho = (e) => {
        const valor = e.target.value.toUpperCase();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]*$/; //LETRAS, ACENTOS Y Ñ
        if (regex.test(valor)) {
            setNombreRancho(valor);
            setNombreRanchoError(false);
        } else {
            setNombreRanchoError(true);
        }
    };

    //VALIDAR UBICACION RANCHO
    const validarUbicacion_Rancho = (e) => {
        const valor = e.target.value.toUpperCase();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9.,\s]*$/; //LETRAS,NUMEROS, ACENTOS, Ñ, PUNTOS Y COMAS
        if (regex.test(valor)) {
            setUbicacionRancho(valor);
            setUbicacionRanchoError(false);
        } else {
            setUbicacionRanchoError(true);
        }
    };

    //VALIDAR EXTENSION RANCHO
    const validarExtension_Rancho = (e) => {
        const valor = e.target.value.toUpperCase();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9.,\s]*$/; //LETRAS,NUMEROS, ACENTOS, Ñ, PUNTOS Y COMAS
        if (regex.test(valor)) {
            setExtensionRancho(valor);
            setExtensionRanchoError(false);
        } else {
            setExtensionRanchoError(true);
        }
    };

    //LIMITE DE CARACTERES
    const maxNombre = 30;
    const maxUbicacion = 100;
    const maxExtension = 20;

    return (
        <div>
            <div className='container' id="formRancho">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 classsName="text-center">
                            {titulo()}
                        </h2>
                        <h2 className='text-center'>Gestión de Ranchos</h2>
                        <div className='card-body'>
                            {camposVaciosWarning && (
                                <div className="alert alert-warning" role="alert">
                                    Por favor, complete todos los campos.
                                </div>
                            )}
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre del Rancho</label>
                                    <input type='text'
                                        placeholder='Ingrese el nombre del rancho'
                                        name='NombreRancho'
                                        className={`form-control ${nombre_RanchoError ? 'is-invalid' : ''}`}
                                        value={nombre_Rancho}
                                        onChange={validarNombre_Rancho}
                                        maxLength={maxNombre}
                                    />
                                    <div className="form-text">
                                        {nombre_Rancho.length}/{maxNombre} caracteres ingresados
                                    </div>
                                    {nombre_RanchoError && (
                                        <div className="alert alert-warning" role="alert">
                                             El nombre solo debe contener letras.
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Ubicación del rancho</label>
                                    <input type='text'
                                        placeholder='Ingrese la ubicación del rancho'
                                        name='ubicacionRancho'
                                        className={`form-control ${ubicacion_RanchoError ? 'is-invalid' : ''}`}
                                        value={ubicacion_Rancho}
                                        onChange={validarUbicacion_Rancho}
                                        maxLength={maxUbicacion}
                                    />
                                    <div className="form-text">
                                        {ubicacion_Rancho.length}/{maxUbicacion} caracteres ingresados
                                    </div>
                                    {ubicacion_RanchoError && (
                                        <div className="alert alert-warning" role="alert">
                                            La ubicacion no debe de contener caracteres especiales.
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Extensión del rancho</label>
                                    <input type='text'
                                        placeholder='Ingrese la extensión del rancho'
                                        name='extensionRancho'
                                        className={`form-control ${extension_RanchoError ? 'is-invalid' : ''}`}
                                        value={extension_Rancho}
                                        onChange={validarExtension_Rancho}
                                        maxLength={maxExtension}
                                    />
                                    <div className="form-text">
                                        {extension_Rancho.length}/{maxExtension} caracteres ingresados
                                    </div>
                                    {extension_RanchoError && (
                                        <div className="alert alert-warning" role="alert">
                                            La extension no debe de contener caracteres especiales.
                                        </div>
                                    )}
                                </div>

                                <button className='btn btn-success' onClick={(e) => saveRancho(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/rancho' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormularioRanchoComponent;