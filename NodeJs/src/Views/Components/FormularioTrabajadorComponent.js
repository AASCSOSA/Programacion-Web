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
    

    const navigate = useNavigate();
    const { id_Trabajador } = useParams();

    

    const saveTrabajador = (e) => {
        e.preventDefault();
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
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre</label>
                                    <input type='text'
                                        placeholder='Ingrese el nombre del trabajador'
                                        name='nombreTrabajador'
                                        className='form-control'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Apellido Paterno</label>
                                    <input type='text'
                                        placeholder='Ingrese el apellido paterno del trabajador'
                                        name='apellido_PatTrabajador'
                                        className='form-control'
                                        value={apellido_Pat}
                                        onChange={(e) => setApellido_Pat(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Apellido Materno</label>
                                    <input type='text'
                                        placeholder='Ingrese el apellido materno del trabajador'
                                        name='apellido_MatTrabajador'
                                        className='form-control'
                                        value={apellido_Mat}
                                        onChange={(e) => setApellido_Mat(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Teléfono</label>
                                    <input type='text'
                                        placeholder='Ingrese el teléfono del trabajador'
                                        name='telefonoTrabajador'
                                        className='form-control'
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}>
                                    </input>
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
