import React, { useState, useEffect } from 'react';
import RanchoService from '../Controllers/RanchoService';
import { Link } from 'react-router-dom';
export default function RanchoApp() {
    const [rancho, setRancho] = useState([]);
    const listarCarga = () => {
        RanchoService.findAll().then((response) => {
            setRancho(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarCarga();
    }, []);

    useEffect(() => {
        RanchoService.findAll().then((response) => {
            setRancho(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    const deleteRancho = (id) => {
        RanchoService.delete(id).then((response) => {
            listarCarga();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <footer className="tittleFrm">Rancho</footer>
            <div className='container'>
                <div className="table-container">
                    <table class="table" id="tableRancho">
                        <thead class="table-dark">
                            <tr>
                                <th id="id_IdRancho">Id Rancho</th>
                                <th >Nombre del Rancho</th>
                                <th >Ubicación del rancho</th>
                                <th >Extensión del rancho</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rancho.map((rancho) => (
                                <tr key={rancho.id_Rancho}>
                                    <td>{rancho.id_Rancho}</td>
                                    <td>{rancho.nombre_Rancho}</td>
                                    <td>{rancho.ubicacion_Rancho}</td>
                                    <td>{rancho.extension_Rancho}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-rancho/${rancho.id_Rancho}`}>Editar</Link>
                                        <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteRancho(rancho.id_Rancho)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/form-rancho'><button type="button" class="btn btn-success" >Insertar</button></Link>
                <Link to='/form-rancho'><button type="button" class="btn btn-success" >Consular</button></Link>
            </div>
        </div>
    )
}