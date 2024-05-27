import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import HerramientaService from '../../Controllers/HerramientaService';

export const FormularioHerramientaComponent = () => {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [cantidad, setCantidad] = useState('');
    // const [color, setColor] = useState('');
    const [costo, setCosto] = useState('');
    const [fecha_Adquisicion, setFecha_Adquisicion] = useState('');

    //VALIDACIONES
    const [modeloError, setModeloError] = useState(false);
    const [marcaError, setMarcaError] = useState(false);
    const [cantidadError, setCantidadError] = useState(false);
    const [costoError, setCostoError] = useState(false);

    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso se suma 1
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;

    const [camposVaciosWarning, setCamposVaciosWarning] = useState(false); //VALIDAR EL LLENADO DE DATOS



    const navigate = useNavigate();
    const { id_Herramienta } = useParams();

    useEffect(() => {
        HerramientaService.findById(id_Herramienta).then(response => {
            const herramienta = response.data;
            setModelo(herramienta.modelo);
            setMarca(herramienta.marca);
            setCantidad(String(herramienta.cantidad));
            setCosto(String(herramienta.costo));
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
            !costo ||
            !fecha_Adquisicion
        ) {
            setCamposVaciosWarning(true);
            return;
        }

        const herramienta = { modelo,marca, cantidad, costo, fecha_Adquisicion };
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
        const valor = e.target.value.toUpperCase();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]*$/; //LETRAS, ACENTOS Y Ñ
        if (regex.test(valor)) {
            setModelo(valor);
            setModeloError(false);// DESACTIVA ADVERTENCIA 
        } else {
            setModeloError(true);//ACTIVA ADVERTENCIA
        }
    };

      //VALIDAR MODELO 
      const validarMarca = (e) => {
        const valor = e.target.value.toUpperCase();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9.,\s]*$/; //LETRAS,NUMEROS, ACENTOS, Ñ, PUNTOS Y COMAS
        if (regex.test(valor)) {
            setMarca(valor);
            setMarcaError(false);// DESACTIVA ADVERTENCIA 
        } else {
            setMarcaError(true);//ACTIVA ADVERTENCIA
        }
    };

    //VALIDAR CANTIDAD
    const validarCantidad = (e) => {
        const inputValue = e.target.value;
        const regex = /^[0-9]*$/; //NUMEROS
        if (regex.test(inputValue)) {
            setCantidad(inputValue);
            setCantidadError(false);
        } else {
            setCantidadError(true);
        }
    };

    //VALIDAR COSTO
    const validarCosto = (e) => {
        const inputValue = e.target.value;
        const regex = /^\d*(\.\d{0,2})?$/; //NUMEROS Y DOS NUMEROS DESPUES DEL PUNTO
        if (regex.test(inputValue)) {
            setCosto(inputValue);
            setCostoError(false);
        } else {
            setCostoError(true);
        }
    };

    //Validar fecha
    const validarFecha = (e) => {
        const selectedDate = e.target.value;
        if (selectedDate <= maxDate) {
            setFecha_Adquisicion(selectedDate);
        } else {
            alert("No puedes seleccionar una fecha futura");
        }
    };

    //LIMITE DE CARACTERES
    const maxModelo = 30;
    const maxMarca = 20;
    const maxCantidad = 3;
    const maxCosto = 8;

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
                                        onChange={validarModelo}
                                        maxLength={maxModelo}
                                    />
                                    <div className="form-text">
                                        {modelo.length}/{maxModelo} caracteres ingresados
                                    </div>
                                    {modeloError && (
                                        <div className="alert alert-warning" role="alert">
                                            El modelo solo debe contener letras.
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
                                        onChange={(e) => setMarca(e.target.value)}
                                        maxLength={maxMarca}
                                        />
                                        <div className="form-text">
                                            {marca.length}/{maxModelo} caracteres ingresados
                                        </div>
                                        {modeloError && (
                                            <div className="alert alert-warning" role="alert">
                                                El modelo solo debe contener letras.
                                            </div>
                                        )}
                                    </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Cantidad</label>
                                    <input type='text'
                                        placeholder='Ingrese la cantidad de la herramienta'
                                        name='cantidadHerramienta'
                                        className={`form-control ${cantidadError ? 'is-invalid' : ''}`}
                                        value={cantidad}
                                        onChange={validarCantidad}
                                        maxLength={maxCantidad}
                                        />
                                        <div className="form-text">
                                            {cantidad.length}/{maxCantidad} caracteres ingresados
                                        </div>
                                    {cantidadError && (
                                        <div className="alert alert-warning" role="alert">
                                            La cantidad solo debe contener numeros.
                                        </div>
                                    )}
                                </div>

                                {/* <div className='form-group mb-2'>
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
                                </div> */}

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Costo</label>
                                    <input type='text'
                                        placeholder='Ingrese el costo de la herramienta'
                                        name='costoHerramienta'
                                        className={`form-control ${costoError ? 'is-invalid' : ''}`}
                                        value={costo}
                                        onChange={validarCosto}
                                        maxLength={maxCosto}
                                        />
                                        <div className="form-text">
                                            {costo.length}/{maxCosto} caracteres ingresados
                                        </div>
                                    {costoError && (
                                        <div className="alert alert-warning" role="alert">
                                            El costo solo debe contener numeros.
                                        </div>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Fecha de Adquisición</label>
                                    <input type='date'
                                        placeholder='Ingrese la fecha de adquisición de la herramienta'
                                        name='fecha_AdquisicionHerramienta'
                                        className="form-control"
                                        value={fecha_Adquisicion}
                                        max={maxDate} // Establecer el atributo max
                                        onChange={validarFecha}
                                    ></input>
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
