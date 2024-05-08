import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrabajadorService from '../Controllers/TrabajadorService';

export default function TrabajadorApp() {
    const [trabajador, setTrabajador] = useState([]);
    const listarCarga = () => {
        TrabajadorService.findAll().then((response) => {
            setTrabajador(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarCarga();
    }, []);

    useEffect(() => {
        TrabajadorService.findAll().then((response) => {
            setTrabajador(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    const deleteTrabajador = (id_Trabajador) => {
        TrabajadorService.delete(id_Trabajador).then((response) => {
            listarCarga();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <footer className="tittleFrm">Trabajador</footer>
            <div className='container'>
                <div className="table-container">
                    <table class="table" id="tableTrabajador">
                        <thead class="table-dark">
                            <tr>
                                <th id="id_IdTrabajador">Id Trabajador</th>
                                <th >Nombre</th>
                                <th >Apellido Paterno</th>
                                <th >Apellido Materno</th>
                                <th >Teléfono</th>
                                <th >Dirección</th>
                                <th >Sueldo</th>
                                <th >Id Herramienta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trabajador.map((trabajador) => (
                                <tr key={trabajador.id_Trabajador}>
                                    <td>{trabajador.id_Trabajador}</td>
                                    <td>{trabajador.nombre}</td>
                                    <td>{trabajador.apellido_Pat}</td>
                                    <td>{trabajador.apellido_Mat}</td>
                                    <td>{trabajador.telefono}</td>
                                    <td>{trabajador.direccion}</td>
                                    <td>{trabajador.sueldo}</td>
                                    <td>{trabajador.id_Herramienta}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-trabajador/${trabajador.id_Trabajador}`}>Editar</Link>
                                        <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteTrabajador(trabajador.id_Trabajador)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/form-trabajador'><button type="button" class="btn btn-success" >Insertar</button></Link>
            </div>
        </div>
    )
}