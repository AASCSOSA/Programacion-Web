import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import HerramientaService from '../../Controllers/HerramientaService';

export const FormularioHerramientaComponent = () => {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [color, setColor] = useState('');
    const [costo, setCosto] = useState('');
    const [fecha_Adquisicion, setFecha_Adquisicion] = useState('');


    const navigate = useNavigate();
    const { id_Herramienta } = useParams();

    useEffect(() => {
        HerramientaService.findById(id_Herramienta).then(response => {
            const herramienta = response.data;
            setModelo(herramienta.modelo);
            setMarca(herramienta.marca);
            setCantidad(herramienta.cantidad);
            setColor(herramienta.color);
            setCosto(herramienta.costo);
            setFecha_Adquisicion(herramienta.fecha_Adquisicion)
        }).catch(e => {
            console.log(e);
        })
    }, []);

    const saveHerramienta = (e) => {
        e.preventDefault();
        const herramienta = { modelo, marca, cantidad, color, costo, fecha_Adquisicion };
        if (id_Herramienta) {
            HerramientaService.update(id_Herramienta, herramienta).then(response => {
                navigate("/herramienta");
            }).catch(e => {
                console.log(e);
            })
        } else {
            HerramientaService.create(herramienta).then(response => {
                navigate("/herramienta");
            }).catch(e => {
                console.log(e);
            })
        }
    }

    const titulo = () => {
        if (id_Herramienta) {
            return <h2 className="text-center">Editar Herramienta</h2>
        } else {
            return <h2 className="text-center">Agregar Herramienta</h2>
        }
    }
    return (
        <div>
            <div className='container' id="formHerramienta">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className="text-center">
                            {titulo()}
                        </h2>
                        <h2 className='text-center'>Gestión de Herramientas</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Modelo</label>
                                    <input type='text'
                                        placeholder='Ingrese el modelo de la herramienta'
                                        name='ModeloHerramienta'
                                        className='form-control'
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Marca</label>
                                    <input type='text'
                                        placeholder='Ingrese la marca de la herramienta'
                                        name='marcaHerramienta'
                                        className='form-control'
                                        value={marca}
                                        onChange={(e) => setMarca(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Cantidad</label>
                                    <input type='number'
                                        placeholder='Ingrese la cantidad de la herramienta'
                                        name='cantidadHerramienta'
                                        className='form-control'
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Color</label>
                                    <input type='text'
                                        placeholder='Ingrese el color de la herramienta'
                                        name='colorHerramienta'
                                        className='form-control'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}>
                                    </input>

                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Costo</label>
                                    <input type='number' step="0.01"
                                        placeholder='Ingrese el costo de la herramienta'
                                        name='costoHerramienta'
                                        className='form-control'
                                        value={costo}
                                        onChange={(e) => setCosto(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Fecha de Adquisición</label>
                                    <input type='date'
                                        placeholder='Ingrese la fecha de adquisición de la herramienta'
                                        name='fecha_AdquisicionHerramienta'
                                        className='form-control'
                                        value={fecha_Adquisicion}
                                        onChange={(e) => setFecha_Adquisicion(e.target.value)}>
                                    </input>
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveHerramienta(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/herramienta' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormularioHerramientaComponent;
