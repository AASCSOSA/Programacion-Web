import React, { useState, useEffect } from 'react';
import CompradorService from '../Controllers/CompradorService';
import { Link } from 'react-router-dom';
export default function CompradorApp() {
    const [comprador, setComprador] = useState([]);
    const listarComprador= () => {
        CompradorService.findAll().then((response) => {
            setComprador(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarComprador();
    }, []);

    useEffect(() => {
        CompradorService.findAll().then((response) => {
            setComprador(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    const deleteComprador = (id) => {
        CompradorService.delete(id).then((response) => {
            listarComprador();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <div>
            <footer className="tittleFrm">Comprador</footer>
            <div className='container'>
                <div className="table-container">
                    <table class="table" id="tableComprador">
                        <thead class="table-dark">
                            <tr>
                                <th>Id Comprador</th>
                                <th >Nombre del comprador</th>
                                <th >Telefono</th>
                                <th >Nombre de la empresa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comprador.map((comprador) => (
                                <tr key={comprador.id_Comprador}>
                                    <td>{comprador.id_Comprador}</td>
                                    <td>{comprador.nombre}{' '}{comprador.apellido_Pat}{' '}{comprador.apellido_Mat}</td>
                                    <td>{comprador.telefono}</td>
                                    <td>{comprador.nombre_Empresa}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-comprador/${comprador.id_Comprador}`}>Editar</Link>
                                        <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteComprador(comprador.id_Comprador)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/form-comprador'><button type="button" class="btn btn-success" >Insertar</button></Link>
                <Link to='/form-comprador'><button type="button" class="btn btn-success" >Consular</button></Link>
            </div>
        </div>
    );
}