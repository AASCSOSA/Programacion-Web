import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrabajadorService from '../Controllers/TrabajadorService';
import HerramientaService from '../Controllers/HerramientaService';

export default function TrabajadorApp() {
    const [trabajador, setTrabajador] = useState([]);
    const [herramientas, setHerramientas] = useState([]);

    const listarTrabajador = () => {
        TrabajadorService.findAll().then((response) => {
            setTrabajador(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarTrabajador();
    }, []);

    useEffect(() => {
        const obtenerModelosHerramientas = async () => {
          try {
            const modelosHerramientas = await Promise.all(
              trabajador.map(async (trabajadorItem) => {
                const response = await HerramientaService.getModeloHerramienta(trabajadorItem.id_Trabajador);
                return response.data;
              })
            );
            setHerramientas(modelosHerramientas);
            console.log("Modelos de herramientas obtenidos:", modelosHerramientas);
          } catch (error) {
            console.log("Error al obtener los modleos de las herramientas:", error);
          }
        };
      
        if (trabajador.length > 0) {
          obtenerModelosHerramientas();
        }
      }, [trabajador]);
      
    const deleteTrabajador = (id_Trabajador) => {
        TrabajadorService.delete(id_Trabajador).then((response) => {
            listarTrabajador();
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
                                <th >Modelo de la herramienta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trabajador.map((trabajadorItem, index) => (
                                <tr key={trabajadorItem.id_Trabajador}>
                                    <td>{trabajadorItem.id_Trabajador}</td>
                                    <td>{trabajadorItem.nombre}</td>
                                    <td>{trabajadorItem.apellido_Pat}</td>
                                    <td>{trabajadorItem.apellido_Mat}</td>
                                    <td>{trabajadorItem.telefono}</td>
                                    <td>{trabajadorItem.direccion}</td>
                                    <td>{herramientas[index]}</td>
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