import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pago_TrabajadorService from '../../Controllers/Pago_TrabajadorService';
import TrabajadorService from '../../Controllers/TrabajadorService';


export const FormularioPago_TrabajadorComponent = () => {
    const [monto, setMonto] = useState('');
    const [fecha_Pago, setfecha_Pago] = useState('');
    const [id_Trabajador, setId_Trabajador] = useState('');
    const [trabajadores, setTrabajadores] = useState([]); // Lista de trabajadores

    const navigate = useNavigate();
    const { id_Pago_Trabajador } = useParams();


    useEffect(() => {
        TrabajadorService.findAll()
            .then((response) => {
                setTrabajadores(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (id_Pago_Trabajador) {
            Pago_TrabajadorService.findById(id_Pago_Trabajador).then(response => {
                setMonto(response.data.monto);
                setfecha_Pago(response.data.fecha_Pago);
                // Buscar el ID del trabajador asociado a este pago de trabajador
                Pago_TrabajadorService.findByIdTrabajador(id_Pago_Trabajador)
                    .then((response2) => {
                        const trabajador = response2.data;
                        setId_Trabajador(trabajador.id_Trabajador); // Actualiza el estado id_Trabajador con el ID del trabajador encontrado
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
                .catch((error) => {
                    console.error("Error al obtener el pago de trabajador:", error);
                });
        }
    }, [id_Pago_Trabajador]);

    const savePago_Trabajador = (e) => {
        e.preventDefault();

        const trabajador = { id_Trabajador };
        const pago_trabajador = { monto, fecha_Pago, trabajador };
        if (id_Pago_Trabajador) {
            Pago_TrabajadorService.update(id_Pago_Trabajador, pago_trabajador).then(response => {
                navigate('/pago_trabajador');
            }).catch(e => {
                console.log(e);
            })
        } else {
            Pago_TrabajadorService.create(pago_trabajador).then(response => {
                navigate('/pago_trabajador');
            }).catch(e => {
                console.log(e);
            })
        }
    }

    const titulo = () => {
        if (id_Pago_Trabajador) {
            return <h2 className="text-center">Editar Pago de Trabajador</h2>
        } else {
            return <h2 className="text-center">Agregar Pago de Trabajador</h2>
        }
    }
    return (
        <div>
            <div className='container' id="formPago_Trabajador">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 classsName="text-center">
                            {titulo()}
                        </h2>
                        <h2 className='text-center'>Gestión de Pagos</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Monto</label>
                                    <input type='number' step="0.01"
                                        placeholder='Ingrese el monto del pago a trabajador'
                                        name='montoPago_Trabajador'
                                        className='form-control'
                                        value={monto}
                                        onChange={(e) => setMonto(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Fecha de Pago</label>
                                    <input type='date'
                                        placeholder='Ingrese la fecha del pago a trabajador'
                                        name='fecha_PagoPago_Trabajador'
                                        className='form-control'
                                        value={fecha_Pago}
                                        onChange={(e) => setfecha_Pago(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Seleccione al Trabajador</label>
                                    <select
                                        className="form-select"
                                        value={id_Trabajador}
                                        onChange={(e) => setId_Trabajador(e.target.value)}
                                    >
                                        <option value="">Seleccionar Trabajador</option>
                                        {trabajadores.map((trabajador) => (
                                            <option key={trabajador.id_Trabajador} value={trabajador.id_Trabajador}>
                                                {trabajador.nombre_Trabajador}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button className='btn btn-success' onClick={(e) => savePago_Trabajador(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/pago_trabajador' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormularioPago_TrabajadorComponent;
