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

    //VALIDACIONES
    const [modeloError, setModeloError] = useState(false);
    const [cantidadError, setCantidadError] = useState(false);
    const [colorError, setColorError] = useState(false);
    const [costoError, setCostoError] = useState(false);
    const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDAR EL LLENADO DE DATOS



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
    }, [id_Herramienta]);

    const saveHerramienta = (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (
            !modelo ||
            !marca ||
            !cantidad ||
            !color ||
            !costo ||
            !fecha_Adquisicion
        ) {
            setCamposVaciosWarning(true);
            return;
        }


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

    //VALIDAR MODELO 
    const validarModelo = (e) => {
        const inputValue = e.target.value;

        //MAYUSCULAS, MINUSCULAS Y ESPACIOS
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setModelo(inputValue);
            setModeloError(false);// DESACTIVA ADVERTENCIA 
        } else {
            setModeloError(true);//ACTIVA ADVERTENCIA
        }
    };

    //VALIDAR CANTIDAD
    const validarCantidad = (e) => {
        const inputValue = e.target.value;

        // SOLO NUMEROS Y NO CARACTERES ESPECIALES
        if (/^\d*\.?\d*$/.test(inputValue) && parseFloat(inputValue) >= 0) {
            setCantidad(inputValue);
            setCantidadError(false);
        } else {
            setCantidad(inputValue);
            setCantidadError(true);
        }
    };

    //VALIDAR COLOR
    const validarColor = (e) => {
        const inputValue = e.target.value;

        //MAYUSCULAS, MINUSCULAS Y ESPACIOS
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setColor(inputValue);
            setColorError(false);
        } else {
            setColorError(true);
        }
    };

    //VALIDAR COSTO
    const validarCosto = (e) => {
        const inputValue = e.target.value;

        // SOLO NUMEROS Y NO CARACTERES ESPECIALES
        if (/^\d*\.?\d*$/.test(inputValue) && parseFloat(inputValue) >= 0) {
            setCosto(inputValue);
            setCostoError(false);
        } else {
            setCosto(inputValue);
            setCostoError(true);
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
                            {camposVaciosWarning && (
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
                                        className={`form-control ${modeloError ? 'is-invalid' : ''}`}//RESALTAR EL CAMPO EN EL FORMULARIO CON BORDES ROJOS Y DESPLEGAR ADVERTENCIA
                                        value={modelo}
                                        onChange={validarModelo}>
                                    </input>
                                    {modeloError && (
                                        <div className="alert alert-warning" role="alert"> 
                                            El modelo no debe contener números ni carácteres especiales.
                                        </div>
                                    )}
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
                                        className={`form-control ${cantidadError ? 'is-invalid' : ''}`}
                                        value={cantidad}
                                        onChange={validarCantidad}>
                                    </input>
                                    {cantidadError && (
                                        <div className="alert alert-warning" role="alert"> 
                                            La cantidad no debe de contener letras ni números negativos.
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Color</label>
                                    <input type='text'
                                        placeholder='Ingrese el color de la herramienta'
                                        name='colorHerramienta'
                                        className={`form-control ${colorError ? 'is-invalid' : ''}`}
                                        value={color}
                                        onChange={validarColor}>
                                    </input>
                                    {colorError && (
                                        <div className="alert alert-warning" role="alert"> 
                                            El color no debe contener números ni carácteres especiales.
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Costo</label>
                                    <input type='number' step="0.01"
                                        placeholder='Ingrese el costo de la herramienta'
                                        name='costoHerramienta'
                                        className={`form-control ${costoError ? 'is-invalid' : ''}`}
                                        value={costo}
                                        onChange={validarCosto}>
                                    </input>
                                    {costoError && (
                                        <div className="alert alert-warning" role="alert"> 
                                            El costo no debe de contener letras ni números negativos.
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
