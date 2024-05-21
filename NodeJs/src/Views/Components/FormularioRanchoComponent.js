import React, { useState, useEffect } from 'react';
import RanchoService from '../../Controllers/RanchoService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const FormularioRanchoComponent = () => {
    const [nombre_Rancho, setNombreRancho] = useState('');
    const [ubicacion_Rancho, setUbicacionRancho] = useState('');
    const [extension_Rancho, setExtensionRancho] = useState('');
    const [emptyFieldsWarning, setEmptyFieldsWarning] = useState(false); //Validar que se llenen todos los datos
    const [nombreRanchoWarning, setNombreRanchoWarning] = useState(false); // Advertencia para el campo nombre_Rancho
    const [ubicacionRanchoWarning, setUbicacionRanchoWarning] = useState(false); // Advertencia para el campo ubicacion_Rancho

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
    }, []);

    const saveRancho = (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (
            !nombre_Rancho ||
            !ubicacion_Rancho ||
            !extension_Rancho
        ) {
            setEmptyFieldsWarning(true);
            return;
        }

        const rancho = { nombre_Rancho, ubicacion_Rancho, extension_Rancho };
        if (id) {
            RanchoService.update(id, rancho).then(response => {
                navigate('/rancho');
            }).catch(e => {
                console.log(e);
            })
        } else {
            RanchoService.create(rancho).then(response => {
                navigate('/rancho');
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

    const handleNombreRanchoChange = (e) => {
        const inputValue = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setNombreRancho(inputValue);
            setNombreRanchoWarning(false);
        } else {
            setNombreRanchoWarning(true);
        }
    };

    const handleUbicacionChange = (e) => {
        const inputValue = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setUbicacionRancho(inputValue);
            setUbicacionRanchoWarning(false);
        } else {
            setUbicacionRanchoWarning(true);
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
                            {emptyFieldsWarning && (
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
                                        className={`form-control ${nombreRanchoWarning ? 'is-invalid' : ''}`}
                                        value={nombre_Rancho}
                                        onChange={handleNombreRanchoChange}>
                                    </input>
                                    {nombreRanchoWarning && (
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
                                        className={`form-control ${ubicacionRanchoWarning ? 'is-invalid' : ''}`}
                                        value={ubicacion_Rancho}
                                        onChange={handleUbicacionChange}>
                                    </input>
                                    {ubicacionRanchoWarning && (
                                        <div className="alert alert-warning" role="alert">
                                            La ubicacion no debe contener números.
                                        </div>
                                    )}
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