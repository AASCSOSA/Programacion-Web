import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pago_TrabajadorService from '../Controllers/Pago_TrabajadorService';

export default function Pago_TrabajadorApp() {
    const [pago_Trabajador, setPago_Trabajador] = useState([]);
    const listarCarga = () => {
        Pago_TrabajadorService.findAll().then((response) => {
            setPago_Trabajador(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarCarga();
    }, []);

    useEffect(() => {
        Pago_TrabajadorService.findAll().then((response) => {
            setPago_Trabajador(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    const deletePago_Trabajador = (id_Pago_Trabajador) => {
        Pago_TrabajadorService.delete(id_Pago_Trabajador).then((response) => {
            listarCarga();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <footer className="tittleFrm">Pago de Trabajador</footer>
            <div className='container'>
                <div className="table-container">
                    <table class="table" id="tablePago_Trabajador">
                        <thead class="table-dark">
                            <tr>
                                <th id="id_IdPago_Trabajador">Id Pago Trabajador</th>
                                <th >Monto</th>
                                <th >Fecha de Pago</th>
                                <th >Id Trabajador</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pago_Trabajador.map((pago_Trabajador) => (
                                <tr key={pago_Trabajador.id_Pago_Trabajador}>
                                    <td>{pago_Trabajador.id_Pago_Trabajador}</td>
                                    <td>{pago_Trabajador.monto}</td>
                                    <td>{pago_Trabajador.fecha_Pago}</td>
                                    <td>{pago_Trabajador.id_Trabajador}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-pago_trabajador/${pago_Trabajador.id_Pago_Trabajador}`}>Editar</Link>
                                        <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deletePago_Trabajador(pago_Trabajador.id_Pago_Trabajador)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/form-pago_trabajador'><button type="button" class="btn btn-success" >Insertar</button></Link>
            </div>
        </div>
    )
}