import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pago_TrabajadorService from '../Controllers/Pago_TrabajadorService';
import TrabajadorService from '../Controllers/TrabajadorService';

export default function Pago_TrabajadorApp() {
    const [pago_Trabajador, setPago_Trabajador] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);

    const listarPago = () => {
        Pago_TrabajadorService.findAll().then((response) => {
            setPago_Trabajador(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarPago();
    }, []);

    useEffect(() => {
        const obtenerNombresTrabajadores = async () => {
          try {
            const nombresTrabajadores = await Promise.all(
              pago_Trabajador.map(async (pago_TrabajadorItem) => {
                const response = await TrabajadorService.getNameTrabajador(pago_TrabajadorItem.id_Pago_Trabajador);
                return response.data;
              })
            );
            setTrabajadores(nombresTrabajadores);
            console.log("Nombres de trabajadores obtenidos:", nombresTrabajadores);
          } catch (error) {
            console.log("Error al obtener los nombres de los trabajadores:", error);
          }
        };
      
        if (pago_Trabajador.length > 0) {
            obtenerNombresTrabajadores();
        }
      }, [pago_Trabajador]);
    

    const deletePago_Trabajador = (id_Pago_Trabajador) => {
        Pago_TrabajadorService.delete(id_Pago_Trabajador).then((response) => {
            listarPago();
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
                                <th >Nombre del trabajador</th>
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