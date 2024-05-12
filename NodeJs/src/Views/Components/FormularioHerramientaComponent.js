import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HerramientaService from '../../Controllers/HerramientaService';

export const FormularioHerramientaComponent = () => {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [color, setColor] = useState('');
    const [costo, setCosto] = useState('');
    const [fecha_Adquisicion, setFecha_Adquisicion] = useState('');
    const [emptyFieldsWarning, setEmptyFieldsWarning] = useState(false); //Validar que se llenen todos los datos
    const [warning, setWarning] = useState(false);
    const [negativoWarning, setNegativoWarning] = useState({
        cantidad: false,
        costo: false,
    });

    const navigate = useNavigate();
    const { id_Herramienta } = useParams();

    useEffect(() => {
        HerramientaService.findById(id_Herramienta).then(response => {
            setModelo(response.data.modelo);
            setMarca(response.data.marca);
            setCantidad(response.data.cantidad);
            setColor(response.data.color);
            setCosto(response.data.costo);
            setFecha_Adquisicion(response.data.fecha_Adquisicion)
        }).catch(e => {
            console.log(e);
        })
    }, []);

    const saveHerramienta = (e) => {
        e.preventDefault();

        // Validar que el campo de costo no sea negativo
        if (
            cantidad < 0 ||
            costo < 0
        ) {
            setNegativoWarning({
                cantidad: cantidad < 0,
                costo: costo < 0,
            });
            return;
        }
        // Validar que todos los campos estén llenos
        if (
            !modelo ||
            !marca ||
            !cantidad ||
            !color ||
            !costo ||
            !fecha_Adquisicion
        ) {
            setEmptyFieldsWarning(true);
            return;
        }

        const herramienta = { modelo, marca, cantidad, color, costo, fecha_Adquisicion };
        if (id_Herramienta) {
            HerramientaService.update(id_Herramienta, herramienta).then(response => {
                navigate('/herramienta');
            }).catch(e => {
                console.log(e);
            })
        } else {
            HerramientaService.create(herramienta).then(response => {
                navigate('/herramienta');
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

    const handleColorChange = (e) => {
        const inputValue = e.target.value;
        if (/^[a-zA-Z]*$/.test(inputValue)) {
            setColor(inputValue);
            setWarning(false); // Desactiva la advertencia si el valor es solo letras
        } else {
            setWarning(true); // Activa la advertencia si el valor contiene números o caracteres especiales
        }
    };

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
                            {emptyFieldsWarning && (
                                <div className="alert alert-warning" role="alert">
                                    Por favor, complete todos los campos.
                                </div>
                            )}
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
                                        className={`form-control ${negativoWarning.cantidad ? "is-invalid" : ""
                                            }`}
                                        value={cantidad}
                                        onChange={(e) => {
                                            setCantidad(e.target.value);
                                            setNegativoWarning({
                                                ...negativoWarning,
                                                cantidad: e.target.value < 0,
                                            });
                                        }}
                                    ></input>
                                    {negativoWarning.cantidad && (
                                        <div className="invalid-feedback">
                                            No se permiten valores negativos
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Color</label>
                                    <input type='text'
                                        placeholder='Ingrese el color de la herramienta'
                                        name='colorHerramienta'
                                        className='form-control'
                                        value={color}
                                        onChange={handleColorChange}>
                                    </input>
                                    {warning && (
                                        <div className="alert alert-warning" role="alert">
                                            El color no debe contener números ni caracteres especiales.
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Costo</label>
                                    <input type='number' step="0.01"
                                        placeholder='Ingrese el costo de la herramienta'
                                        name='costoHerramienta'
                                        className={`form-control ${negativoWarning.costo ? "is-invalid" : ""
                                            }`}
                                        value={costo}
                                        onChange={(e) => {
                                            setCosto(e.target.value);
                                            setNegativoWarning({
                                                ...negativoWarning,
                                                costo: e.target.value < 0,
                                            });
                                        }}
                                    ></input>
                                    {negativoWarning.costo && (
                                        <div className="invalid-feedback">
                                            No se permiten valores negativos
                                        </div>
                                    )}
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
