import React, { useState, useEffect } from 'react';
import RanchoService from '../../Controllers/RanchoService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const FormularioRanchoComponent = () => {
    const [nombre_Rancho, setNombreRancho] = useState('');
    const [ubicacion_Rancho, setUbicacionRancho] = useState('');
    const [extension_Rancho, setExtensionRancho] = useState('');
    
    //VALIDACIONES
    const [nombre_RanchoError, setNombreRanchoError] = useState(false);
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
        const inputValue = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setNombreRancho(inputValue);
            setNombreRanchoError(false);
        } else {
            setNombreRanchoError(true);
        }
    };
    
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
                                        onChange={validarNombre_Rancho}>
                                    </input>
                                    {nombre_RanchoError && (
                                        <div className="alert alert-warning" role="alert">
                                            El nombre no debe contener números.
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Ubicación del rancho</label>
                                    <input type='text'
                                        placeholder='Ingrese la ubicación del rancho'
                                        name='ubicacionRancho'
                                        className='form-control'
                                        value={ubicacion_Rancho}
                                        onChange={(e) => setUbicacionRancho(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Extensión del rancho</label>
                                    <input type='text'
                                        placeholder='Ingrese la extensión del rancho'
                                        name='extensionRancho'
                                        className='form-control'
                                        value={extension_Rancho}
                                        onChange={(e) => setExtensionRancho(e.target.value)}>
                                    </input>
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